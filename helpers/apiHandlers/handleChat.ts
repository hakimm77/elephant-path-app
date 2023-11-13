import { api } from "../../utils/constants";

export const handleChat = async (
  messages: any,
  setConversation: any,
  setLoadingResponse: any
) => {
  let conversation = [...messages];
  fetch(`${api}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversation }),
  })
    .then(async (response) => {
      console.log(response);
      if (!response.body) {
        throw new Error("ReadableStream not yet supported in this browser.");
      }
      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const reader = response.body.getReader();
      let result = "";
      let done = false;

      const messageInterval = setInterval(async () => {
        setConversation((prevMessages: any) => {
          let updatedMessagesArr = [...prevMessages];
          updatedMessagesArr[prevMessages.length - 1].content = result;
          return updatedMessagesArr;
        });

        if (done) {
          if (response.status !== 403) {
            console.log("Finished downloading messages");
            clearInterval(messageInterval);
          } else {
            clearInterval(messageInterval);
            return;
          }
        }
      }, 100);

      while (!done) {
        const { value, done: doneReading }: any = await reader?.read();
        done = doneReading;
        let chunkValue: string = String.fromCharCode(value);
        console.log("68, 999999999", chunkValue);
        result += chunkValue;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  setLoadingResponse(false);
};
