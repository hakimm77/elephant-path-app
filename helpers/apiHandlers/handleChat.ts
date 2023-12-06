import axios from "axios";
import { api } from "../../utils/constants";
import { IConversation } from "../../utils/types";

export const handleChat = async (
  messages: IConversation[],
  setConversation: any,
  setLoadingResponse: any,
  setErrorResponse: any,
) => {


  const conversation = messages.map((conv) => {
    const { id, ...rest } = conv;
    return rest;
  });

  setErrorResponse(false);


  console.log("submit: ", conversation)
  try {
    const response = await axios.post(`${api}/api/chat`, {
      conversation,
    });
    
    setConversation((prevMessages: IConversation[]) => {
      let updatedMessagesArr = [...prevMessages];
      updatedMessagesArr[updatedMessagesArr.length -1 ].content = response.data.message; 
      return updatedMessagesArr;
    });
    
    
  } catch (error) { 
    setConversation((prevMessages: IConversation[]) => {
      let updatedMessagesArr = [...prevMessages];
      updatedMessagesArr[updatedMessagesArr.length -1 ].content = "An error occurred. Please try again."; 
      return updatedMessagesArr;
    });
    setErrorResponse(true);
    console.error("Axios error:", error);
  }

  setLoadingResponse(false);
};
