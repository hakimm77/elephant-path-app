import { api } from "../../utils/constants";

export const handleChat = async (
  messages: any,
  setConversation: any,
  setLoadingResponse: any
) => {
  let conversation = [...messages];
  
  fetch(`${api}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({conversation}),
  },
  )
  .then(response => {
    console.log(response)
    if (!response.body) {
      throw new Error('ReadableStream not yet supported in this browser.');
    }
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    } 

    const reader = response.body.getReader();
    let charsReceived = 0;
    let result = '';
    let decoder = new TextDecoder('utf-8');
    // Read the stream
    const read = () => {
      reader.read().then(({ done, value }) => {
        if (done) {
          console.log('Stream complete');
          return;
        }    
        // console.log("----")
        // Assuming the server is sending text data
        // console.log(`len ${typeof value} }`)
        if (typeof value === "number") {
          result +=  String.fromCharCode(value)
        }
        console.log(result)
        // charsReceived += value.length;
        // console.log(`Received ${charsReceived} characters so far. Current chunk:`, result);
        conversation[conversation.length - 1] = {
          role: "assistant",
          content: result
        }
        // console.log(conversation);
        setConversation(conversation);
        
        // Read the next chunk
        read();
      });
    };
  
    read();
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
  
  setLoadingResponse(false);
};
