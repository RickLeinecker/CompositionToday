// returns JSON containing users
export default async function GenericGetHandler(url: string) {
  let message = [];

  try {
    const response = fetch("https://compositiontoday.net/api/" + url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

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
