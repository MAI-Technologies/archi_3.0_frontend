import axios from "axios";

export async function metricsRequest(startDate, endDate) {
    try {
        const res = await axios.post("https://archi3-backend-v2-56ae6c696951.herokuapp.com/metrics/dates", {
            startDate, endDate
        });

        return res.data?.data;
    } catch (err) {
        throw err;
    }


}