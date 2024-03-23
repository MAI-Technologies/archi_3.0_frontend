import axios from "axios";

export async function increaseCalculatorClicksRequest() {
    try {
        await axios.get("http://localhost:4000/metrics/updateTotalCalculatorClicks");
    } catch (err) {
        throw err;
    }
}