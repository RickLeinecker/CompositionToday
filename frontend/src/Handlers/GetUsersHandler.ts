// returns JSON containing users
export default async function GetUsersHandler(event: {
  preventDefault: () => void;
}) {
  let message = [];

  event.preventDefault();

  var obj = {};
  var js = JSON.stringify(obj);

  // try {
  const response = fetch("https://www.compositiontoday.net/api/getUsers", {
    method: "GET",
    // body: js,
    headers: { "Content-Type": "application/json" },
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
