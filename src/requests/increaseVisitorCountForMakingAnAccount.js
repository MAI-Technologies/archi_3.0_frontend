import axios from "axios";

export async function increaseVisitorCountForMakingAnAccountRequest() {
    try {
        await axios.get("http://localhost:4000/metrics/updateVisitorCountForMakingAnAccount");
    } catch (err) {

    }
}