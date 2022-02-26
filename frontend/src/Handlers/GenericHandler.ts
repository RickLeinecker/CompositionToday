import { GenericHandlerType } from "../ObjectInterface";

// returns JSON containing users 
export default async function GetContentByTypeHandler(obj: GenericHandlerType){

    let message = []

    try {
        const response = fetch(("http://137.184.149.145:5000/api/" + obj.path), {
        method: obj.methodType,
        body: obj.data,
        headers: { "Content-Type": "application/json" },
        });

        let retResponse = (await response);
        let txt = await retResponse.text();
        let res = JSON.parse(txt);
        message = (await res);
    } catch (e: any) {
        console.error("Handler Error: " + e)
    }

    return message;
}
