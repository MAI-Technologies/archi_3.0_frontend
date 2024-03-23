import axios from "axios";

export async function metricsPasswordRequest(password) {
    try {
        await axios.post("http://localhost:4000/metrics/password", { password });
    } catch (err) {
        throw err;
    }
}