import axios from "axios";
import { api } from "../utils/constants";

export const handleStageIdentification = async (setStage: any) => {
  const userEmail = "hakimboum406@gmail.com";

  await axios
    .post(`${api}/api/stageIdentification`, { userEmail })
    .then((res) => {
      setStage(res.data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};
