import axios from "axios";
import { api } from "../../utils/constants";

export const handleGetChat = async (email: string, setConversation: any) => {
  await axios
    .post(`${api}/api/getChat`, { email })
    .then((res) => {
      setConversation(res.data.chat);
    })
    .catch((err) => {
      console.error("Error getting conversation:", err);
    });
};
