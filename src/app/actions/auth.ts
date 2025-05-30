"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Registration failed",
      };
    }

    return {
      success: true,
      data: data.user,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
}

export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }

    // Don't set cookies manually - let NextAuth handle this
    return {
      success: true,
      data: data.user,
      token: data.token,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
}

// ... rest of your functions remain the same

export async function verifyEmail(verificationData: {
  code: string;
  email: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verificationData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Verification failed",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Verification error:", error);
    return {
      success: false,
      message: "An error occurred during verification",
    };
  }
}

export async function forgotPassword(email: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to send reset email",
      };
    }

    return {
      success: true,
      message: "Password reset instructions sent to your email",
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      success: false,
      message: "An error occurred while processing your request",
    };
  }
}

export async function resetPassword(resetData: {
  token: string;
  password: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Password reset failed",
      };
    }

    return {
      success: true,
      message: "Password has been reset successfully",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      message: "An error occurred while resetting your password",
    };
  }
}

// Update logout to use NextAuth signOut
export async function logout() {
  // This should be handled by NextAuth signOut on the client side
  return {
    success: true,
    message: "Logged out successfully",
  };
}
