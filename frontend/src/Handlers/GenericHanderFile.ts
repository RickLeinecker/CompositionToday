import { GenericHandlerType } from "../ObjectInterface";

// returns JSON containing users
export default async function GetContentByTypeHandlerFile(
  obj: GenericHandlerType
) {
  let message = [];
  // request headers
  let headers = new Headers();
  // api key
  let key =
    process.env.REACT_APP_COMP_TODAY_API_KEY === undefined
      ? "no_key"
      : process.env.REACT_APP_COMP_TODAY_API_KEY;
  headers.append("X-API-Key", key);
  // make call
  try {
    const response = fetch("https://www.compositiontoday.net/api/" + obj.path, {
      method: obj.methodType,
      body: obj.data,
      headers: headers,
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
