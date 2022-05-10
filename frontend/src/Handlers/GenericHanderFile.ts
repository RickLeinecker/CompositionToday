import { GenericHandlerType } from "../ObjectInterface";

// returns JSON containing users
export default async function GetContentByTypeHandlerFile(
  obj: GenericHandlerType
) {
  let message = [];

  try {
    const response = fetch("https://compositiontoday.net/api/" + obj.path, {
      method: obj.methodType,
      body: obj.data,
      // headers: { "Content-Type": "multipart/form-data" },
    });

    var retResponse = await response;
    var txt = retResponse.text();
    var res = JSON.parse(await txt);

    message = await res;
  } catch (e: any) {
    console.error("Handler Error: " + e);
  }

  return message;
}
