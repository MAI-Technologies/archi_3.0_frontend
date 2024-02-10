import axios from "axios";

export async function addUserRequest(firstName, lastName, dob, email, password, signupType) {
    try {
        const res = await axios.post("http://localhost:4000/user/add-user", {
            userId: "abc123",
            firstName,
            lastName,
            dob,
            email,
            password,
            signupType,
        });

        console.log(res);
    } catch (err) {
        throw err;
    }
}