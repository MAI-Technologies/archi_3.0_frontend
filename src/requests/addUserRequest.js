import axios from "axios";

export async function addUserRequest(userId, firstName, lastName, dob, email, password, signupType) {
    try {
        const res = await axios.post("https://archi-3-backend-fabe5cbde85f.herokuapp.com/user/add-user", {
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