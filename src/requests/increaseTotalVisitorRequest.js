import axios from "axios";

export async function increaseTotalVisitorRequest() {
    try {
        await axios.get("http://localhost:4000/metrics/updateVisitorCount");
    } catch (e) {

    }
}