/* eslint-disable no-useless-catch */
import axios from "axios";

export async function openAIRequest(prompt, sessionId) {
    if (!prompt) throw new Error("No prompt was given");
    if (!sessionId) throw new Error("No sessionId was given");
    if (!tutor) throw new Error("No tutor was given");
    if (!userId) throw new Error("No userId was given");

    try {
        const res = await axios.post("https://archi3-backend-v2-56ae6c696951.herokuapp.com/openai", {
            prompt, sessionId, tutor, userId
        });

        console.log(res);

    } catch (err) {
        throw err;
    }
}