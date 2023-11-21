import axios from "axios";
import { api } from "../../utils/constants";

export const handleChat = async (
  messages: any,
  setConversation: any,
  setLoadingResponse: any
) => {
  let conversation = [...messages];

  try {
    const response = await axios.post(`${api}/api/chat`, {
      conversation,
    });

    setConversation((prevMessages: any) => {
      let updatedMessagesArr = [...prevMessages];
      updatedMessagesArr[prevMessages.length - 1].content =
        response.data.message;
      return updatedMessagesArr;
    });
  } catch (error) {
    console.error("Axios error:", error);
  }

  setLoadingResponse(false);
};
