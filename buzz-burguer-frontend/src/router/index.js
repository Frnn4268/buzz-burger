import { createRouter, createWebHistory } from 'vue-router';

import LandingPageView from '@/views/LandingPageView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import MenuView from '@/views/MenuView.vue';
import ProductView from '@/views/ProductView.vue';
import UserView from '@/views/UserView.vue';
import TermsView from '@/views/TermsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPageView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { 
      requiresAuth: true,
      requiredRole: 'admin'
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView,
    meta: { 
      requiresAuth: true,
      requiredRole: 'user'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductView,
    meta: { 
      requiresAuth: true,
      requiredRole: 'admin'
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: UserView,
    meta: { 
      requiresAuth: true,
      requiredRole: 'admin'
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role || 'user';

  // Redirect authenticated users attempting to access unauthorized routes
  if (to.meta.requiresAuth && token) {
    const requiredRole = to.meta.requiredRole;
    
    // Check if the route requires a specific role
    if (requiredRole && userRole !== requiredRole) {
      const redirectPath = userRole === 'admin' ? '/dashboard' : '/menu';
      return next(redirectPath);
    }
    
    // Redirect from admin routes to user and vice versa
    if (!requiredRole && userRole === 'user' && to.path !== '/menu') {
      return next('/menu');
    }
  }

  // Redirect unauthenticated users
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  // Redirect from root based on role
  if (to.path === '/' && token) {
    const redirectPath = userRole === 'admin' ? '/dashboard' : '/menu';
    return next(redirectPath);
  }

  next();
});

export default router;