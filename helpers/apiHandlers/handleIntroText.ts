import axios from "axios";

export const handleIntroText = async (setUpperBarText: any) => {
  await axios
    .get("/api/introText")
    .then((res) => {
      setUpperBarText(res.data.text);
    })
    .catch((error) => {
      console.error("Error getting upper bar text:", error);
      return { error: "An error occurred while getting the upper bar text." };
    });
};
