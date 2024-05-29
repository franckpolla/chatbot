
import Configuration from "openai"; 
import OpenAIApi from "openai";
const configuration: any = new Configuration({
  apiKey: `${process.env.OPENAI_API_KEY}`,
});
const openai = new OpenAIApi(configuration);


const OpenAI =async (message:any) => {
    
    try {
        const res = await openai.createChatCompletion({
          model: "text-davinci-003",
          prompt: message,
          max_tokens: 1000,
          temperature: 0.9,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
     //   setLoading(false);
        return res.data.choices[0].text;
      } catch (error:any) {
        console.log(error.message);
      }
    };

export default OpenAI
