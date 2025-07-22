export const signupUserAPI = async (userInfo) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiUrl}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        UserID: userInfo.uid,
        username: userInfo.displayName,
        email: userInfo.email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Signup API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("New user created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
};

export const loginUserAPI = async (userInfo) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiUrl}/users/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        uid: userInfo.uid,
        displayName: userInfo.displayName,
        email: userInfo.email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("User login successful:", data);
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
