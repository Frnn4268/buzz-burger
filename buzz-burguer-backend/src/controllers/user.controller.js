'use strict';

const User = require('../db/models/user.model');

/**
 * @controller Edit User Status
 * @description Updates only the 'status' field of a user.
 * Validates that no additional fields are modified and that the status is either 'active' or 'inactive'.
 * @route PATCH /api/users/:id/status
 * @param {Object} req - Express request object with:
 *   - params: { id: string } specifying the user id.
 *   - body: { status: string } where status must be either 'active' or 'inactive'.
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the updated user data (excluding the password)
 * @throws {400} Bad request if more than the 'status' field is provided or if the provided status is invalid.
 * @throws {404} Not found if the user does not exist.
 * @throws {500} Internal server error if an unexpected error occurs.
 */
exports.editUserStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate that only the 'status' field is provided for modification
      if (Object.keys(req.body).length !== 1 || !('status' in req.body)) {
        return res.status(400).json({ error: 'Solo se permite modificar el estado' });
      }
  
      // Validate that status has a valid value
      if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({ error: 'Estado inválido' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


/**
 * @controller Delete User
 * @description Deletes a user from the database based on the provided id.
 * @route DELETE /api/users/:id
 * @param {Object} req - Express request object with user id in req.params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the deleted user's data
 * @throws {404} Not found if the user does not exist.
 * @throws {500} Internal server error if an error occurs during deletion.
 */
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user)
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        return res.status(200).json(user);
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
}

/**
 * @controller Get Users
 * @description Retrieves a list of users with optional filtering by name, email, role, and status.
 * Also supports sorting by name, email, role, or createdAt.
 * @route GET /api/users
 * @param {Object} req - Express request object with query parameters:
 *   - name {string}: partial name for case-insensitive search.
 *   - email {string}: partial email for case-insensitive search.
 *   - role {string}: filter by role ('admin' or 'user').
 *   - status {string}: filter by user status ('active' or 'inactive').
 *   - orderBy {string}: field for sorting (allowed: 'name', 'email', 'role', 'createdAt').
 *   - orderDirection {string}: sort direction ('asc' or 'desc'; default is ascending).
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with an array of users (excluding passwords)
 * @throws {400} Bad request if an invalid sort field is provided.
 * @throws {500} Internal server error if an error occurs while fetching users.
 */
exports.getUsers = async (req, res) => {
  try {
    const { name, email, role, status, orderBy, orderDirection } = req.query;
    const filter = {};

    // Filters
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (role && ['admin', 'user'].includes(role)) filter.role = role;
    if (status && ['active', 'inactive'].includes(status)) filter.status = status;

    // Sorting options
    const sort = {};
    if (orderBy) {
      const validSortFields = ['name', 'email', 'role', 'createdAt'];
      if (!validSortFields.includes(orderBy)) {
        return res.status(400).json({ error: 'Campo de ordenamiento inválido' });
      }
      const direction = orderDirection?.toLowerCase() === 'desc' ? -1 : 1;
      sort[orderBy] = direction;
    }

    const users = await User.find(filter)
      .select('-password') // Exclude password field
      .sort(sort);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @controller Get User
 * @description Retrieves a single user by id, excluding the password field.
 * @route GET /api/users/:id
 * @param {Object} req - Express request object with user id in req.params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the user's data (excluding the password)
 * @throws {404} Not found if the user does not exist.
 * @throws {500} Internal server error if an error occurs during retrieval.
 */
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
