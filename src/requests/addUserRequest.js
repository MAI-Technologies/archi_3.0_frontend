import axios from "axios";

export async function addUserRequest(userId, firstName, lastName, dob, email, password, signupType) {
    try {
        const res = await axios.post("http://localhost:4000/user/add-user", {
            userId,
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