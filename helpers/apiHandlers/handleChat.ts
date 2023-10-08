import axios from "axios";

export const handleChat = async (
  messages: any,
  setConversation: any,
  setLoadingResponse: any
) => {
  let conversation = [...messages];

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  };

  try {
    await axios
      .post(
        `/api/chat`,
        { conversation: conversation },
        {
          headers,
        }
      )
      .then(async (response) => {
        conversation[conversation.length - 1] = await response.data.message;
        setLoadingResponse(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoadingResponse(false);
      });

    setConversation(conversation);
  } catch (error) {
    console.log(error);
    setLoadingResponse(false);
  }
};
