"use server";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { getAuthCookie } from "../auth-cookie";

export default async function login(_prevState: any, formData: FormData) {
    const res = await fetch(
        `${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),

    });
    if (!res.ok) {
        return { error: "Invalid credentials" };
    }
    const cookie = getAuthCookie(res);
    if (cookie?.accessToken) {
        (cookies()).set(cookie.accessToken);
    }
    if (cookie?.refreshToken) {
        (cookies()).set(cookie.refreshToken);
    }
    redirect("/");
}