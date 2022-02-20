import GenericGetHandler from "../../Handlers/GenericGetHandler";

export async function fetchTags() {

    try {
        let answer = (await GenericGetHandler("getTags"));
        if (answer.error.length > 0) {
            // setError(answer.error);
            return;
        }

        // setError("");
        return await answer.result;

        // setLoading(false);


    } catch (e: any) {
        console.error("Frontend Error: " + e);
        // setError(DefaultValues.apiErrorMessage);
    }
}