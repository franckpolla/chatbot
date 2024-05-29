"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatlog, setChatlog] = useState<{ type: string; message: string }[]>(
    []
  );
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

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/openai", { prompt: message });
      setLoading(false);
      setChatlog((prevChatlog) => [
        ...prevChatlog,
        { type: "bot", message: res.data },
      ]);
    } catch (error: any) {
      setLoading(false);
      setError(`Error! ${error.message}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>CHATGPT</h1>

      {/* Display chat history */}
      {chatlog.map((entry, index) => (
        <div
          key={index}
          className={entry.type === "user" ? "text-right" : "text-left"}
        >
          <strong>{entry.type === "user" ? "You: " : "Bot: "}</strong>
          {entry.message}
        </div>
      ))}
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <Input
            type="text"
            onChange={handleChange}
            placeholder="Enter your request"
            value={data}
            className="mx-4 sm:min-w-96 md:min-w-[600px] border-spacing-6 rounded-sm border"
          />
          <Button>Send</Button>
        </div>
      </form>
    </main>
  );
}
