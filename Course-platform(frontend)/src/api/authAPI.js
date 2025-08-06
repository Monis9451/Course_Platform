// This file is deprecated - using Supabase auth directly
// All auth operations are now handled in src/supabase/auth.js

export const signupUserAPI = async () => {
  console.warn('signupUserAPI is deprecated - using Supabase auth directly');
  return { success: true, message: 'Using Supabase auth' };
};

export const loginUserAPI = async () => {
  console.warn('loginUserAPI is deprecated - using Supabase auth directly');
  return { success: true, message: 'Using Supabase auth' };
};
