"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatlog, setChatlog] = useState([]);
  const [error, setError] = useState(false);

  console.log("API Key:", process.env.OPENAI_API_KEY);
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };
    const data = {
      model: "gpt-4",
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

      if (response.data) {
        setError(false);
      }
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

      {/* Display chat history */}
      {chatlog.map((message, index) => (
        <div key={index}>
          {message.type}: {message.message}
        </div>
      ))}
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center ">
          <Input
            type={"text"}
            onChange={handleChange}
            placeholder="Enter your request"
            value={data}
            className="mx-4 sm:min-w-96  md:min-w-[600px] border-spacing-6 rounded-sm  border"
          />
          <Button>Send</Button>
        </div>
      </form>
    </main>
  );
}
