import axios from "axios";

export async function metricsRequest(startDate, endDate) {
    try {
        const res = await axios.post("https://archi2-backend-d33aae681e67.herokuapp.com/metrics/dates", {
            startDate, endDate
        });

        return res.data?.data;
    } catch (err) {
        throw err;
    }


}