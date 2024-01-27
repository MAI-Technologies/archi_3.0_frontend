import { useRef } from "react"
import { registerUserWithEmailAndPassword } from "../utils/auth";

export default function RegisterPage() {
    const formRefs = {
        emailRef: useRef(),
        passwordRef: useRef(),
    }

    async function submitHandler(e) {
        e.preventDefault();

        const email = formRefs.emailRef.current.value || null;
        const password = formRefs.passwordRef.current.value || null;

        if (!email || !password) return;

        console.log({ email, password });
        try {
            const user = await registerUserWithEmailAndPassword(email, password);
            console.log(user);

        } catch (err) {
            console.log(err);
        }
    }

    return <div>
        Register Page

        <form onSubmit={submitHandler} style={{ marginTop: "100px" }}>
            <input type="email" ref={formRefs.emailRef} />
            <input type="password" ref={formRefs.passwordRef} />
            <button type="submit">Register</button>
        </form>

    </div>
}