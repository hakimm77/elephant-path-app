import axios from "axios";
import { api } from "../../utils/constants";

export const handleIntroText = async (setUpperBarText: any) => {
  await axios
    .get(`${api}/api/introText`)
    .then((res) => {
      setUpperBarText(res.data.text);
    })
    .catch((error) => {
      console.error("Error getting upper bar text:", error);
      return { error: "An error occurred while getting the upper bar text." };
    });
};
