// returns JSON containing users
export default async function GetUsersHandler(event: {
  preventDefault: () => void;
}) {
  let message = [];

  event.preventDefault();

  var obj = {};
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
  // try {
  const response = fetch("https://www.compositiontoday.net/api/getUsers", {
    method: "GET",
    // body: js,
    headers: headers,
  });

  var txt = (await response).text();
  var res = JSON.parse(await txt);

  // if (res.error.length > 0) {
  // message = "API Error:" + res.error;
  // } else {
  message = await res;
  // }
  // } catch (e: any) {
  //     message = (e?.toString());
  // }

  return message;
}
