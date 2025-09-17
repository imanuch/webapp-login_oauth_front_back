"use client";
import { useActionState } from "react"
import login from "./login"
import { useEffect } from "react";

export default function Login() {

    useEffect(() => {
        console.log('Use effect ran');
    }, []);
    const [state, formAction] = useActionState(login, { error: "" })
    return (
        <form action={formAction}>
            <div className="h-screen flex items-center justify-center flex-col gap-4">
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                <input type="password" name="password" placeholder="Password" className={`input input-bordered w-full max-w-xs${state?.error && "input-error"}`} />
                {state?.error}
                <button type="submit" className="btn btn-primary w-full max-w-xs">
                    Login
                </button>
            </div>
        </form>
    )
}