import axios from "axios";
import { api } from "../utils/constants";
import { storeData } from "./auth/storeData";

export const handleStageIdentification = async (userEmail: string) => {
  await axios
    .post(`${api}/api/stageIdentification`, { userEmail })
    .then(async (res) => {
      await storeData("stage", String(res.data.message));
    })
    .catch((err) => {
      console.log(err);
    });
};
