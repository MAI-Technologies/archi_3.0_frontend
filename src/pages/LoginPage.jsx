import { useEffect, useRef } from "react"
import { loginWithEmailAndPassword, authenticateUser } from "../utils/auth";

export default function LoginPage() {
    const formRefs = {
        emailRef: useRef(),
        passwordRef: useRef(),
    }

    useEffect(() => {
        const auth = async () => {
            const user = await authenticateUser();
            console.log(user);
        }

        auth();
    }, [])
    async function submitHandler(e) {
        e.preventDefault();

        const email = formRefs.emailRef.current.value || null;
        const password = formRefs.passwordRef.current.value || null;

        if (!email || !password) return;

        console.log({ email, password });
        try {
            const user = await loginWithEmailAndPassword(email, password);
            console.log(user);

        } catch (err) {
            console.log(err);
        }
    }

    return <div>
        Login Page

        <form onSubmit={submitHandler} style={{ marginTop: "100px" }}>
            <input type="email" ref={formRefs.emailRef} />
            <input type="password" ref={formRefs.passwordRef} />
            <button type="submit">login</button>
        </form>

    </div>
}