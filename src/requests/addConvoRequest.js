import axios from "axios";

export async function addConvoRequest(sessionId, userId, summary, conversations, tutorName) {
    try {
        const res = await axios.post("https://archi3-backend-v2-56ae6c696951.herokuapp.com/user/add-convo", {
            sessionId,
            userId,
            summary,
            conversations,
            tutorName
        });

        console.log(res);
    } catch (err) {
        throw err;
    }
}