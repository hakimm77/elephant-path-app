import axios from "axios";
import { api } from "../../utils/constants";

export const handleGuidedMeditation = async () => {
  const prompt = `
  Based on stage 4 you will generate a guided meditation script designed to be used with text-to-speech software. The output should be formatted as an array of objects, where each object has two properties:

"type": Indicates if the object is either "text" or "silence."
"value": For "text," this holds a segment of the guided meditation script. For "silence," this should indicate the duration of the silence in milliseconds.
The script durations is 20 minutes. Always begin with a 6-point prep followed by a 4-stage transition.
In the 6-point prep, include intervals of silence lasting 20000 milliseconds between points. The points should cover motivation, goals, dropping expectations, distractions, and posture.
In the 4-stage transition, lead with "open awareness" and include intervals of silence lasting 90000 milliseconds. The phrase "Prioritize physical sensations or the world as it is known through the senses over mind-generated content" should be included.
During the full-body awareness stage, incorporate the text: "Narrow the scope of attention to encompass full-body sensations while remaining aware of sounds. We are not blocking them out; rather, they slip into the background of experience."
In the breathing sensations stage, include the text: "Narrow the scope of attention to include breathing sensations at the chest and abdomen without excluding anything from your awareness. Notice the rise and fall of the chest and abdomen."
For the stage focusing on the tip of the nostrils, include the text: "Bring your attention to the imaginary point at the tip of the nostrils. You are just remaining mindful of what is occurring there without trying to manipulate anything."
The script should continue with techniques from the TMI book through its 10 stages. Make sure to format this script according to the specific array of objects, alternating between "text" and "silence," along with their respective durations in milliseconds.
Respond with the array of objects only (no other text).`;

  await axios
    .post(`${api}/api/chat`, {
      conversation: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })
    .then((res) => {
      console.log(res.data.message.content);
    })
    .catch((err) => {
      console.log(err);
    });
};
