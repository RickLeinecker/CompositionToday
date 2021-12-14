import { GenericHandlerObject } from "../ObjectInterface";

// returns JSON containing users 
export default async function GetContentByTypeHandler(obj: GenericHandlerObject){

    let message = []

    try {
        const response = fetch(("http://137.184.149.145:5000/api/" + obj.path), {
        method: obj.methodType,
        body: obj.data,
        headers: { "Content-Type": "application/json" },
        });

        var retResponse = (await response);
        var txt = retResponse.text();
        var res = JSON.parse(await txt);
        
        let status = retResponse.status;
        if(status !== 200 && status !== 201){
            throw status;
        }

        message = (await res);
    } catch (e: any) {
        console.error("Handler Error: " + e)
    }

    return message;
}
