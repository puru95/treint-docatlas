
export const setAccessTokenCookie = (accessToken: string) => {
    // Implement logic to set the access token as an HTTP-only cookie
    document.cookie = `accessToken=${accessToken}; path=/; secure; SameSite=Strict`;
};

export const setUserIdCookie = (userId: string) => {
    // Implement logic to set the access token as an HTTP-only cookie
    document.cookie = `userId=${userId}; path=/; secure; SameSite=Strict`;
};

export const getAccessTokenFromCookie = (): string | null => {
    // Implement logic to get the access token from the cookie
    const tokenMatch = document.cookie.match(/(^|;) ?accessToken=([^;]*)(;|$)/);
    return tokenMatch ? tokenMatch[2] : null;
};
export const getUserIdFromCookie = (): string | null => {
    // Implement logic to get the access token from the cookie
    const tokenMatch = document.cookie.match(/(^|;) ?userId=([^;]*)(;|$)/);
    return tokenMatch ? tokenMatch[2] : null;
};

export const removeCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; SameSite=Strict";
    }
};

export const setCheckSubscription = (checkSubscription: string) => {
    // Implement logic to set the access token as an HTTP-only cookie
    document.cookie = `checkSubscription=${checkSubscription}; path=/; secure; SameSite=Strict`;
};

export const getCheckSubscription = (): boolean => {
    // Check if the 'checkSubscription' cookie exists
    const tokenMatch = document.cookie.match(/(^|;) ?checkSubscription=([^;]*)(;|$)/);
    return tokenMatch ? tokenMatch[2] === 'true' : false;
};
