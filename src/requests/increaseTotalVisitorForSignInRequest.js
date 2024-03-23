import axios from "axios";

export async function increaseTotalVisitorForSignInRequest() {
    try {
        await axios.get("http://localhost:4000/metrics/updateVisitorCountForSignIn");
    } catch (err) {

    }
}