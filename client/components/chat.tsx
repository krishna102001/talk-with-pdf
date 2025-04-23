"use client";
import { SendHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type Message = {
  role: string;
  content: string;
};

const botMessage = [
  {
    role: "user",
    content: "hello baby",
  },
  {
    role: "admin",
    content: "hello admin",
  },
];

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setMessages(botMessage);
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClick = async () => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    try {
      const { data } = await axios.post("http://localhost:8080/resume/chat", {
        query: message,
      });
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "admin", content: data.message },
        ]);
        setMessage("");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "admin", content: "Something wrong happen try again" },
      ]);
      console.log(error);
    }
  };
  return (
    <div>
      <motion.div
        className='h-full flex flex-col justify-end p-4 space-y-2 overflow-y-auto mb-20'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        {messages.map((mess, index) => (
          <div
            key={index}
            className={`flex ${
              mess.role === "user" ? "justify-end" : "justify-start"
            } items-center`}
          >
            {mess.role === "admin" && (
              <span
                className={`bg-gray-400 h-10 w-10 flex justify-center items-center text-white rounded-full mr-1 `}
              >
                🤖
              </span>
            )}
            <div className='bg-gray-200 p-2 rounded-md max-w-xs whitespace-pre-wrap w-full'>
              {mess.content}
            </div>
            {mess.role === "user" && (
              <span
                className={`bg-blue-400 h-10 w-10 flex justify-center items-center text-white rounded-full ml-1`}
              >
                U
              </span>
            )}
          </div>
        ))}
        <div ref={scrollRef} />
      </motion.div>

      <div className='fixed bottom-0 w-180 flex gap-4 items-center mx-4 mb-2'>
        <Input
          value={message}
          placeholder='type your query...'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className='bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700'
          disabled={!message.trim()}
          onClick={handleClick}
        >
          <SendHorizontal size={20} className='cursor-pointer' color='white' />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
