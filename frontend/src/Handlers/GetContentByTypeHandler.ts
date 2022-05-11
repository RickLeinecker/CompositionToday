// returns JSON containing users
export default async function GetContentByTypeHandler(contentType: string) {
  let message = [];

  var obj = { contentType: contentType };
  var js = JSON.stringify(obj);

  try {
    const response = fetch(
      "https://www.compositiontoday.net/api/getContentByType",
      {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
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
