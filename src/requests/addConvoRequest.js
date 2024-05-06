import axios from "axios";

export async function addConvoRequest(sessionId, userId, summary, conversations, tutorName) {
    try {
        const res = await axios.post("https://ebg5arj53no65jmdwx6srlesxm0vxljl.lambda-url.us-east-1.on.aws/user/add-convo", {
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