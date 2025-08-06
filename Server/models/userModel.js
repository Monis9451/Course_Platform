// This file is deprecated as we're now using Supabase auth system
// User management is handled by Supabase auth tables directly
// No need for custom user table operations

const supabase = require("../config/supabase");

// These functions are kept for backwards compatibility but are deprecated
const createUser = async () => {
  console.warn('createUser is deprecated - using Supabase auth directly');
  return { message: 'Using Supabase auth' };
};

const getAllUsers = async () => {
  console.warn('getAllUsers is deprecated - using Supabase auth admin API');
  return [];
};

const getUserById = async () => {
  console.warn('getUserById is deprecated - using Supabase auth');
  return null;
};

const getUserByEmail = async () => {
  console.warn('getUserByEmail is deprecated - using Supabase auth admin API');
  return null;
};

const updateUser = async () => {
  console.warn('updateUser is deprecated - using Supabase auth');
  return null;
};

const deleteUser = async () => {
  console.warn('deleteUser is deprecated - using Supabase auth admin API');
  return null;
};

module.exports = { createUser, getAllUsers, getUserById, getUserByEmail, updateUser, deleteUser };