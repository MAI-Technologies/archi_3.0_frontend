import axios from "axios";

export async function metricsRequest(startDate, endDate) {
    try {
        const res = await axios.post("https://ebg5arj53no65jmdwx6srlesxm0vxljl.lambda-url.us-east-1.on.aws/metrics/dates", {
            startDate, endDate
        });

        return res.data?.data;
    } catch (err) {
        throw err;
    }


}