"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";

interface ChatsProps {
  group: GroupChatType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}

export default function Chats({ group, oldMessages, chatUser }: ChatsProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const socket = useMemo(() => {
    const s = getSocket();
    s.auth = { room: group.id };
    return s.connect();
  }, [group.id]);

  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === data.id)) return prev;
        return [...prev, data];
      });
      scrollToBottom();
    });

    return () => {
      socket.off("message");
      socket.close();
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };

    socket.emit("message", payload);
    setMessage("");
    setMessages((prev) => [...prev, payload]);
  };

  return (
    <div className="flex flex-col h-[94vh] p-4">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-sm rounded-lg p-2 ${
              msg.name === chatUser?.name
                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white self-end"
                : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
            }`}
          >
            <p className="text-xs font-semibold opacity-75 mb-1">{msg.name}</p>
            <p>{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
