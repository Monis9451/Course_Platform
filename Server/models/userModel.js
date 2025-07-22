const supabase = require("../config/supabase");

const createUser = async ({ userID, username, email }) => {
  const { data, error } = await supabase.from("user").insert([
    {
      userID,
      username,
      email,
      createdAt: new Date().toISOString()
    },
  ]).select();

  if (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
  return data;
};

const getAllUsers = async () => {
    const {data, error} = await supabase.from("user").select("*");

    if(error){
        throw new Error(`Error in fetching all users: ${error.message}`);
    }
    return data;
};

const getUserById = async (userID) => {
    const {data, error} = await supabase.from("user").select("*").eq("userID", userID).single();
    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
    return data;
};

const getUserByEmail = async (email) => {
    const {data, error} = await supabase.from("user").select("*").eq("email", email).single();
    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        throw new Error(`Error fetching user by email: ${error.message}`);
    }
    return data;
}

const updateUser = async (userID, updates) => {
    const {data, error} = await supabase.from("user").update(updates).eq("userID", userID);
    if (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
    return data;
};

const deleteUser = async (userID) => {
    const {data, error} = await supabase.from("user").delete().eq("userID", userID);
    if (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
    return data;
};

module.exports = { createUser, getAllUsers, getUserById, getUserByEmail, updateUser, deleteUser };