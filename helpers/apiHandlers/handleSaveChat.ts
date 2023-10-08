import axios from "axios";

export const handleSaveChat = async (email: string, conversation: any) => {
  await axios
    .post("/api/saveChat", { email, conversation })
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((err) => {
      console.error(err);
    });
};
