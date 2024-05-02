import axios from "axios";

export async function addConvoRequest(sessionId, userId, summary, conversations, tutorName) {
    try {
        const res = await axios.post("https://archi-3-backend-fabe5cbde85f.herokuapp.com/user/add-convo", {
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