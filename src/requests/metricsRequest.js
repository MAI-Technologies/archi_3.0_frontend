import axios from "axios";

export async function metricsRequest(startDate, endDate) {
    try {
        const res = await axios.post("http://localhost:4000/metrics/dates", {
            startDate, endDate
        });

        return res.data;
    } catch (err) {
        throw err;
    }


}