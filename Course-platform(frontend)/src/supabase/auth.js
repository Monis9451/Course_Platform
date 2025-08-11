import { supabase } from '../supabase/supabase';

export const createNewUser = async (email, password, displayName = null) => {
    const signUpData = {
        email: email,
        password: password,
    };

    // Add user metadata if display name is provided
    if (displayName) {
        signUpData.options = {
            data: {
                display_name: displayName,
                full_name: displayName
            }
        };
    }

    const { data, error } = await supabase.auth.signUp(signUpData);
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
    try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            return { success: true, message: 'Already signed out' };
        }

        const { error } = await supabase.auth.signOut();
        
        if (error) {
            if (error.message?.includes('session_not_found') || 
                error.message?.includes('Invalid session') ||
                error.message?.includes('Session not found')) {
                return { success: true, message: 'Session was already invalid' };
            }
            throw error;
        }
        
        return { success: true, message: 'Signed out successfully' };
    } catch (error) {
        console.error('Sign out error:', error);
        throw error;
    }
}

export const clearLocalSession = () => {
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('sb-') || key.includes('supabase')) {
                localStorage.removeItem(key);
            }
        });
        return true;
    } catch (error) {
        console.warn('Error clearing local session:', error);
        return false;
    }
}

export const validateSession = async () => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
            console.warn('Session validation error:', error);
            return null;
        }
        return session;
    } catch (error) {
        console.warn('Error validating session:', error);
        return null;
    }
}

export const updateUserMetadata = async (metadata) => {
    try {
        const { data, error } = await supabase.auth.updateUser({
            data: metadata
        });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating user metadata:', error);
        throw error;
    }
}