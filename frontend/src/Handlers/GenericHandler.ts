import { GenericHandlerType } from "../ObjectInterface";

// returns JSON containing users
export default async function GetContentByTypeHandler(obj: GenericHandlerType) {
  let message = [];
  // request headers
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
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
    });

    let retResponse = await response;
    let txt = await retResponse.text();
    let res = JSON.parse(txt);
    message = await res;
  } catch (e: any) {
    console.error("Handler Error: " + e);
  }

  return message;
}
