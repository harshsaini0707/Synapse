"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useVideoStore } from "@/store/videoStore";
import Homechat from "../Chatcard/homeChat";
import { useChatHistory } from "@/hooks/chatHistory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Chat = {
  answer: string;
  created_at: string;
  id: string;
  question: string;
};

// Skeleton Loader Component
const ChatSkeleton = () => (
  <div className="space-y-4 animate-pulse p-4">
    <div className="flex items-center justify-end">
      <div className="w-2/3 h-12 bg-gray-700 rounded-2xl"></div>
    </div>
    <div className="flex items-center justify-start">
      <div className="w-3/4 h-16 bg-gray-800 rounded-2xl"></div>
    </div>
  </div>
);

const Chat = () => {
  const userId = useUserStore((state) => state.user?.id);
  const videoId = useVideoStore((state) => state.videoId);

  const { isLoading, isError, data } = useChatHistory();
  const queryClient = useQueryClient();

  const [query, setQuery] = useState("");

  // scroll ref
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data, isLoading, isError]);

  const askQuestion = useMutation({
    mutationFn: async (question: string) => {
      const res = await axios.post(
        "/api/chatbot",
        { query: question, videoId },
        {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
      setTimeout(scrollToBottom, 100);
    },
  });

  const handleSend = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    askQuestion.mutate(trimmedQuery);
    setQuery("");
    setTimeout(scrollToBottom, 50);
  };

  return (
    <div className="relative h-full flex flex-col bg-[#09090B]">
      {/* Chat Messages Container with Custom Scrollbar */}
      <div className="flex-1 w-full max-w-4xl mx-auto p-4 pb-20 overflow-y-auto overflow-x-hidden chat-scrollable">
        <div className="space-y-4">
          {isLoading && <ChatSkeleton />}

          {isError && !isLoading && (
            <div className="text-red-400 text-center p-4">
              Failed to load chat history.
            </div>
          )}

          {(!data || data.length === 0) &&
            !askQuestion.isPending &&
            !isLoading &&
            !isError && <Homechat />}

          {!isLoading &&
            !isError &&
            data?.map((ele: Chat) => (
              <div key={ele.id} className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] md:max-w-[70%] p-3 rounded-2xl rounded-br-lg bg-blue-600 text-white shadow-lg">
                    <div className="flex items-start gap-2.5">
                      <p className="break-words">{ele.question}</p>
                      <User className="h-4 w-4 mt-1 flex-shrink-0" />
                    </div>
                  </div>
                </div>
                {/* AI Message */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] md:max-w-[70%] p-3 rounded-2xl rounded-bl-lg bg-gray-800 text-white shadow-lg">
                    <div className="flex items-start gap-2.5">
                      <Bot className="h-5 w-5 mt-0.5 text-green-400 flex-shrink-0" />
                      <p className="break-words">{ele.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {askQuestion.isPending && (
            <div className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] md:max-w-[70%] p-3 rounded-2xl rounded-br-lg bg-blue-600 text-white shadow-lg">
                  <div className="flex items-start gap-2.5">
                    <p className="break-words">{askQuestion.variables}</p>
                    <User className="h-4 w-4 mt-1 flex-shrink-0" />
                  </div>
                </div>
              </div>
              {/* AI Loading */}
              <div className="flex justify-start">
                <div className="max-w-lg p-3 rounded-2xl rounded-bl-lg bg-gray-800 text-white shadow-lg flex items-center gap-2">
                  <Bot className="h-5 w-5 text-green-400" />
                  <span className="animate-pulse text-gray-300">
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#09090B] p-4 border-t border-gray-700 shadow-lg">
        <div className="flex items-center w-full max-w-4xl mx-auto p-3 rounded-2xl border border-gray-700 bg-[#121010] shadow-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-transparent outline-none px-3 placeholder-gray-500 text-white"
            placeholder="Ask and learn anything..."
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleSend())
            }
            disabled={askQuestion.isPending}
          />
          <button
            title="query"
            onClick={handleSend}
            disabled={!query.trim() || askQuestion.isPending}
            className="p-2 ml-2 flex-shrink-0 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:bg-white enabled:text-black enabled:hover:bg-gray-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
