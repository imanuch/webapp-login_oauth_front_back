import { access } from "fs";
import { jwtDecode } from "jwt-decode";

export const AUTH_COOKIE = "Authentication";
export const REFRESH_COOKIE = "Refresh";



export const getAuthCookie = (response: Response) => {
    const setCookieHeader = response.headers.get('set-cookie');
    if (!setCookieHeader) {
        throw new Error('No set-cookie header found in the response');
    }
    const accessToken = setCookieHeader.split(';').find((cookieHeader) => cookieHeader.includes(AUTH_COOKIE))?.split('=')[1];
    const refreshToken = setCookieHeader.split(';').find((cookieHeader) => cookieHeader.includes(AUTH_COOKIE))?.split('=')[1];

    return {
        accessToken: accessToken && {
            name: AUTH_COOKIE,
            value: accessToken,
            secure: true,
            httpOnly: true,
            expires: new Date(jwtDecode(accessToken).exp!*1000), // 1 hour
        },
        refreshToken: refreshToken && {
            name: REFRESH_COOKIE,
            value: refreshToken,
            secure: true,
            httpOnly: true,
            expires: new Date(jwtDecode(refreshToken).exp!*1000), // 7 days
        }
    }
}