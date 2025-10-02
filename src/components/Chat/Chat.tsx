"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { useUserStore } from "@/store/userStore";
import { useVideoStore } from "@/store/videoStore";
import Homechat from "../Chatcard/homeChat";
import { useChatHistory } from "@/hooks/chatHistory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoaderOne } from "../ui/loader";

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
                  <div className=" p-3 rounded-2xl rounded-br-lg bg-gray-700 text-white shadow-lg">
                    <div className="flex items-start gap-2.5">
                      <p className="break-words quicksand-font">{ele.question}</p>
                     
                    </div>
                  </div>
                </div>
                {/* AI Message */}
                <div className="flex justify-start ">
                  <div className=" p-3 rounded-2xl rounded-bl-lg  text-neutral-50 shadow-lg">
                    <div className="flex items-start gap-2.5">
                      <div className="prose prose-invert prose-sm max-w-none
                          prose-headings:text-white prose-headings:font-bold prose-headings:mb-2 prose-headings:quicksand-bold
                          prose-h1:text-lg prose-h1:mb-3 prose-h1:font-bold prose-h1:text-white
                          prose-h2:text-base prose-h2:mb-2 prose-h2:font-bold prose-h2:text-white
                          prose-h3:text-sm prose-h3:mb-2 prose-h3:font-bold prose-h3:text-white
                          prose-h4:text-sm prose-h4:mb-2 prose-h4:font-bold prose-h4:text-white
                          prose-h5:text-xs prose-h5:mb-1 prose-h5:font-bold prose-h5:text-white
                          prose-h6:text-xs prose-h6:mb-1 prose-h6:font-semibold prose-h6:text-gray-200
                          prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-2 prose-p:quicksand-regular
                          prose-strong:text-white prose-strong:font-bold prose-strong:quicksand-bold
                          prose-em:text-gray-300 prose-em:italic prose-em:quicksand-medium
                          prose-ul:text-neutral-300 prose-ul:mb-2 prose-ol:text-neutral-300 prose-ol:mb-2
                          prose-li:text-neutral-300 prose-li:marker:text-gray-400 prose-li:mb-1 prose-li:quicksand-regular
                          prose-blockquote:border-l-gray-600 prose-blockquote:text-gray-300 prose-blockquote:mb-2 prose-blockquote:pl-4 prose-blockquote:italic
                          prose-code:text-green-400 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
                          prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:mb-2 prose-pre:text-xs prose-pre:p-3 prose-pre:rounded-lg
                          prose-a:text-blue-400 prose-a:hover:text-blue-300 prose-a:underline prose-a:underline-offset-2
                          prose-hr:border-gray-600 prose-hr:my-4
                          prose-table:text-neutral-300 prose-table:border-gray-600
                          prose-thead:border-gray-500 prose-th:text-white prose-th:font-semibold
                          prose-td:border-gray-600 prose-td:text-neutral-300
                          prose-img:rounded-lg prose-img:shadow-md
                          prose-video:rounded-lg prose-video:shadow-md
                          prose-figure:text-center prose-figcaption:text-gray-400 prose-figcaption:text-xs prose-figcaption:mt-2">
                        <ReactMarkdown>
                          {ele.answer}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {askQuestion.isPending && (
            <div className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] md:max-w-[70%] p-3 rounded-2xl rounded-br-lg bg-gray-700 text-white shadow-lg">
                  <div className="flex items-start gap-2.5">
                    <p className="break-words">{askQuestion.variables}</p>
                  </div>
                </div>
              </div>
              {/* AI Loading */}
              <div className="flex justify-start">
                <div className="max-w-lg p-3 rounded-2xl rounded-bl-lg  text-white shadow-lg flex items-center gap-2">
                  <LoaderOne/>
                </div>
              </div>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#09090B]   pb-2 rounded-lg shadow-lg">
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
