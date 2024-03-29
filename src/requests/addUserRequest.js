import axios from "axios";

export async function addUserRequest(userId, firstName, lastName, dob, email, password, signupType) {
    try {
        const res = await axios.post("https://ebg5arj53no65jmdwx6srlesxm0vxljl.lambda-url.us-east-1.on.aws/user/add-user", {
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