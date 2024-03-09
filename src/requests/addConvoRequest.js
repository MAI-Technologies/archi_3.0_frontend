import axios from "axios";

export async function addConvoRequest(sessionId, userId, summary, conversations, tutorName) {
    try {
        const res = await axios.post("http://localhost:4000/user/add-convo", {
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