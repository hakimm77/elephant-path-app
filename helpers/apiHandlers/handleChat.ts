import axios from "axios";
import { api } from "../../utils/constants";

export const handleChat = async (
  messages: any,
  setConversation: any,
  setLoadingResponse: any
) => {
  let conversation = [...messages];

  try {
    await axios
      .post(`${api}/api/chat`, { conversation: conversation })
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
