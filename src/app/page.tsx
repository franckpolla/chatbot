// "use client";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [data, setData] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [chatlog, setChatlog] = useState([]);
//   const [error, setError] = useState("");

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     setChatlog((prev) => [...prev, { type: "user", message: data }]);
//     setData("");
//   };
//   const handleChange = (e: any) => {
//     setData(e.target.value);
//   };

//   const sendMessage = ({ message }: any) => {
//     // these are the details necessary for the  bot to respond
//     const url = "https://api.openai.com/v1/chat/completions";
//     const Header = {
//       "content-type": "application/json",
//       Authorization: `Bearer ${process.env.API_CHATBOT_KEY}`,
//     };
//     const data = {
//       model: "gpt-4-turbo",
//       message: [
//         {
//           role: "system",
//           content: "You are a helpful assistant.",
//         },
//       ],
//     };
//     setLoading(true);
//     // here we are  making the API call to OpenAI and getting the  response back in JSON format
//     try {
//       const fetchData = async () => {
//         const response = await axios.post(url, data, Header);
//         console.log(response.data);
//         setChatlog({prev} =>[...prev, {type:"bot" , message:response.data.choices[0].message.content}])
//      setLoading(false)
//       };
//       fetchData();
//     } catch (error: any) {
//       setError(`Error! ${error.message}`);
//     }
//   };

//   useEffect(() => {}, []);
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1> CHATGPT </h1>
//       {error && <div>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           onChange={handleChange}
//           placeholder="Enter your request"
//           value={data}
//         />

//         <Button>Submit </Button>
//       </form>
//     </main>
//   );
// }

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatlog, setChatlog] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setChatlog((prevChatlog) => [
      ...prevChatlog,
      { type: "user", message: data },
    ]);
    sendMessage(data);
    setData("");
  };

  const handleChange = (e: any) => {
    setData(e.target.value);
  };

  const sendMessage = async (message: any) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.API_CHATBOT_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo-0125",
      message: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
      ],
    };

    setLoading(true);
    try {
      const response = await axios.post(url, data, headers);
      setChatlog((prevChatlog) => [
        ...prevChatlog,
        { type: "bot", message: response.data.choices[0].message.content },
      ]);
    } catch (error: any) {
      setError(`Error! ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Call sendMessage after the initial render
  useEffect(() => {
    sendMessage({ message: "" }); // Pass an empty message for initial bot greeting
  }, []);

  useEffect(() => {
    if (data) {
      sendMessage({ message: data });
    }
  }, [data]); // Call sendMessage whenever data changes

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>CHATGPT</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          onChange={handleChange}
          placeholder="Enter your request"
          value={data}
        />
        <Button>Submit</Button>
      </form>
      {/* Display chat history */}
      {chatlog.map((message, index) => (
        <div key={index}>
          {message.type}: {message.message}
        </div>
      ))}
    </main>
  );
}
