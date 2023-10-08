import axios from "axios";
import { api } from "../../utils/constants";

export const handleSaveChat = async (email: string, conversation: any) => {
  await axios
    .post(`${api}/api/saveChat`, { email, conversation })
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((err) => {
      console.error(err);
    });
};
