import { supabase } from '../supabase/supabase';

export const createNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) throw error;
    return data;
}

export const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) throw error;
    return data;
}

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/login`
        }
    });
    if (error) throw error;
    return data;
}

export const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}