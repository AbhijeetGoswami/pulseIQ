import api from "./api";

/**
 * Login using email & password.
 * Backend sends OTP if credentials are valid.
 */
export async function login(email, password) {

    const response = await api.post(
        "/auth/login",
        {
            email,
            password
        }
    );

    return response.data;
}


/**
 * Verify OTP.
 * Returns JWT + User.
 */
export async function verifyOtp(email, otp) {

    const response = await api.post(
        "/auth/verify",
        {
            email,
            otp
        }
    );

    return response.data;
}


/**
 * Current logged in user.
 */
export async function getCurrentUser() {

    const response =
        await api.get("/auth/me");

    return response.data;
}


/**
 * Logout.
 */
export async function logout() {

    const response =
        await api.post("/auth/logout");

    return response.data;
}


/**
 * Authentication health.
 */
export async function health() {

    const response =
        await api.get("/auth/health");

    return response.data;
}