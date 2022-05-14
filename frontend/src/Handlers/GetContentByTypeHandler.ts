// returns JSON containing users
export default async function GetContentByTypeHandler(contentType: string) {
  let message = [];

  var obj = { contentType: contentType };
  var js = JSON.stringify(obj);
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
    const response = fetch(
      "https://www.compositiontoday.net/api/getContentByType",
      {
        method: "POST",
        body: js,
        headers: headers,
      }
    );

    var retResponse = await response;
    var txt = retResponse.text();
    var res = JSON.parse(await txt);

    let status = retResponse.status;
    if (status !== 200 && status !== 201) {
      throw status;
    }

    message = await res;
  } catch (e: any) {
    console.error("Handler Error: " + e);
  }

  return message;
}
