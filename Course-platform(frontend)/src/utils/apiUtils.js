import toast from 'react-hot-toast';

export const apiCall = async (url, options = {}, retries = 2) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('Request timeout - please try again');
        }

        if (retries > 0 && (error.message.includes('fetch') || error.message.includes('network'))) {
            console.log(`Retrying API call to ${url}, ${retries} attempts left`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
            return apiCall(url, options, retries - 1);
        }

        throw error;
    }
};

export const handleApiError = (error, operation = 'operation') => {
    console.error(`API Error during ${operation}:`, error);
    
    if (error.message.includes('timeout')) {
        toast.error('Request timed out. Please check your connection and try again.', {
            duration: 6000
        });
    } else if (error.message.includes('500')) {
        toast.error('Server error. Our team has been notified. Please try again in a few minutes.', {
            duration: 8000
        });
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
        toast.error('Network error. Please check your internet connection.', {
            duration: 6000
        });
    } else {
        toast.error(`${operation} failed. Please try again.`, {
            duration: 5000
        });
    }
};

export const isServerError = (status) => status >= 500 && status < 600;
export const isClientError = (status) => status >= 400 && status < 500;
export const isNetworkError = (error) => error.name === 'TypeError' && error.message.includes('fetch');
