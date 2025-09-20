import { supabase } from '../supabase/supabase';

// Helper function to get the appropriate redirect URL based on environment
const getRedirectURL = () => {
    const currentOrigin = window.location.origin;
    
    // Check for environment-specific redirect URLs
    const localRedirectURL = import.meta.env.VITE_LOCAL_REDIRECT_URL;
    const prodRedirectURL = import.meta.env.VITE_PROD_REDIRECT_URL;
    
    let redirectURL;
    
    // If environment variables are set, use them
    if (currentOrigin.includes('localhost') || currentOrigin.includes('127.0.0.1')) {
        redirectURL = localRedirectURL || `${currentOrigin}/login`;
    } else {
        // For production/deployed sites
        redirectURL = prodRedirectURL || `${currentOrigin}/login`;
    }
    
    return redirectURL;
};

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
            redirectTo: getRedirectURL()
        }
    });
    if (error) throw error;
    return data;
}

// Generic OAuth sign-in function for future providers
export const signInWithOAuth = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: getRedirectURL()
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