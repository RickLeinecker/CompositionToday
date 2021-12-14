// returns JSON containing users 
export default async function GetContentByTypeHandler(event: { preventDefault: () => void }, contentType: string){

    let message = []
    
    event.preventDefault();

    var obj = {contentType: contentType};
    var js = JSON.stringify(obj);

    // try {
        const response = fetch("http://137.184.149.145:5000/api/getContentByType", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
        });

        var txt = (await response).text();
        var res = JSON.parse(await txt);

        // if (res.error.length > 0) {
        // message = "API Error:" + res.error;
        // } else {
        message = (await res);
        // }
    // } catch (e: any) {
    //     message = (e?.toString());
    // }

    return message;
}
