/* eslint-disable no-useless-catch */
import axios from "axios";

export async function openAIRequest(prompt, sessionId) {
    if (!prompt) throw new Error("No prompt was given");
    if (!sessionId) throw new Error("No sessionId was given");

    try {
        const res = await axios.post("https://archi2-backend-d33aae681e67.herokuapp.com/openai", {
            prompt, sessionId
        });

        console.log(res);

    } catch (err) {
        throw err;
    }
}