"use client";

import { useEffect, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
};

type Chat = {
  id: number;
  title: string;
  messages: Message[];
};

const STORAGE_KEY = "astra-ai-chats";

const welcomeMessage = (): Message => ({
  id: Date.now(),
  role: "assistant",
  content:
    "👋 Hello! I'm ASTRA AI. How can I help you today?",
  time: "Now",
});

const initialChats: Chat[] = [
  {
    id: 1,
    title: "AI Research",
    messages: [welcomeMessage()],
  },
  {
    id: 2,
    title: "Project Discussion",
    messages: [welcomeMessage()],
  },
  {
    id: 3,
    title: "Code Review",
    messages: [welcomeMessage()],
  },
  {
    id: 4,
    title: "Meeting Notes",
    messages: [welcomeMessage()],
  },
];

export default function ChatPage() {
  const [chats, setChats] =
    useState<Chat[]>(initialChats);

  const [activeChat, setActiveChat] =
    useState(1);

  const [input, setInput] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const [loaded, setLoaded] =
    useState(false);

  // ============================================================
  // LOAD CHATS FROM BROWSER
  // ============================================================

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setChats(parsed);
        }
      }
    } catch (error) {
      console.error(
        "Could not load ASTRA chats:",
        error
      );
    }

    setLoaded(true);
  }, []);

  // ============================================================
  // SAVE CHATS
  // ============================================================

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(chats)
      );
    } catch (error) {
      console.error(
        "Could not save ASTRA chats:",
        error
      );
    }
  }, [chats, loaded]);

  // ============================================================
  // CURRENT CHAT
  // ============================================================

  const activeChatData =
    chats.find(
      (chat) => chat.id === activeChat
    );

  const messages =
    activeChatData?.messages || [];

  // ============================================================
  // UPDATE CURRENT CHAT MESSAGES
  // ============================================================

  const updateMessages = (
    updater:
      | Message[]
      | ((previous: Message[]) => Message[])
  ) => {
    setChats((previousChats) =>
      previousChats.map((chat) => {
        if (chat.id !== activeChat) {
          return chat;
        }

        const newMessages =
          typeof updater === "function"
            ? updater(chat.messages)
            : updater;

        return {
          ...chat,
          messages: newMessages,
        };
      })
    );
  };

  // ============================================================
  // SEND MESSAGE
  // ============================================================

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || isTyping) {
      return;
    }

    // ========================================================
    // IMPORTANT:
    // Capture the existing conversation BEFORE adding
    // the current message.
    // ========================================================

    const existingHistory = messages.map(
      (message) => ({
        role: message.role,
        content: message.content,
      })
    );

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
      time: "Now",
    };

    // ========================================================
    // COMPLETE HISTORY SENT TO BACKEND
    //
    // We include the current user message as well.
    // This guarantees the backend receives everything.
    // ========================================================

    const completeHistory = [
      ...existingHistory,
      {
        role: "user" as const,
        content: text,
      },
    ];

    // ========================================================
    // DEBUG
    // ========================================================

    console.log(
      "======================================"
    );

    console.log(
      "ASTRA FRONTEND MEMORY"
    );

    console.log(
      "Current question:",
      text
    );

    console.log(
      "Messages currently stored:",
      messages.length
    );

    console.log(
      "History being sent:",
      completeHistory
    );

    console.log(
      "History count:",
      completeHistory.length
    );

    console.log(
      "======================================"
    );

    // ========================================================
    // SHOW USER MESSAGE
    // ========================================================

    updateMessages(
      (previous) => [
        ...previous,
        userMessage,
      ]
    );

    setInput("");
    setIsTyping(true);

    try {
      // ======================================================
      // CALL BACKEND
      // ======================================================

      const response = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: text,

            // Send COMPLETE conversation
            history: completeHistory,
          }),
        }
      );

      // ======================================================
      // READ RESPONSE
      // ======================================================

      const data =
        await response.json();

      console.log(
        "ASTRA BACKEND RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.error ||
            "ASTRA AI request failed"
        );
      }

      // ======================================================
      // CREATE AI MESSAGE
      // ======================================================

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          data.message ||
          "ASTRA AI did not return a response.",
        time: "Now",
      };

      // ======================================================
      // ADD AI MESSAGE
      // ======================================================

      updateMessages(
        (previous) => [
          ...previous,
          assistantMessage,
        ]
      );

    } catch (error) {
      console.error(
        "ASTRA AI Chat Error:",
        error
      );

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "❌ Sorry, I couldn't connect to ASTRA AI. Please try again.",
        time: "Now",
      };

      updateMessages(
        (previous) => [
          ...previous,
          errorMessage,
        ]
      );
    } finally {
      setIsTyping(false);
    }
  };

  // ============================================================
  // NEW CHAT
  // ============================================================

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: "New Conversation",
      messages: [
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "👋 New conversation started. How can I help you?",
          time: "Now",
        },
      ],
    };

    setChats((previous) => [
      newChat,
      ...previous,
    ]);

    setActiveChat(newChat.id);

    setInput("");
  };

  // ============================================================
  // SELECT CHAT
  // ============================================================

  const selectChat = (chatId: number) => {
    setActiveChat(chatId);
    setInput("");
  };

  // ============================================================
  // CLEAR CHAT
  // ============================================================

  const clearChat = () => {
    updateMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Conversation cleared. How can I help you?",
        time: "Now",
      },
    ]);

    setInput("");
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* ====================================================
          SIDEBAR
      ==================================================== */}

      <aside className="hidden md:flex flex-col w-[280px] flex-shrink-0 bg-[#0f172a] border-r border-slate-800">

        {/* BRAND */}

        <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-800">

          <div className="flex items-center justify-center w-9 h-9 text-sm font-bold text-white rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
            A
          </div>

          <div>
            <h1 className="text-sm font-bold text-white">
              ASTRA AI
            </h1>

            <p className="text-[10px] text-slate-500">
              AI Workspace
            </p>
          </div>

        </div>

        {/* NEW CHAT */}

        <div className="p-4">

          <button
            onClick={createNewChat}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            <span className="text-lg">
              +
            </span>

            New Chat
          </button>

        </div>

        {/* CHAT HISTORY */}

        <div className="flex-1 px-3 overflow-y-auto">

          <p className="px-2 mb-3 text-[10px] font-bold tracking-widest uppercase text-slate-500">
            Conversations
          </p>

          {chats.map((chat) => {

            const isActive =
              activeChat === chat.id;

            return (
              <button
                key={chat.id}
                onClick={() =>
                  selectChat(chat.id)
                }
                className={`flex items-center w-full gap-3 px-3 py-3 mb-1 text-sm text-left rounded-xl transition-colors ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >

                <span className="text-base">
                  💬
                </span>

                <span className="flex-1 truncate">
                  {chat.title}
                </span>

              </button>
            );
          })}

        </div>

        {/* USER */}

        <div className="p-4 border-t border-slate-800">

          <div className="flex items-center gap-3 p-2">

            <div className="flex items-center justify-center w-9 h-9 text-sm font-bold text-white bg-blue-600 rounded-full">
              M
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-xs font-semibold text-white">
                Maruti
              </p>

              <p className="text-[10px] text-slate-500">
                AI Developer
              </p>

            </div>

          </div>

        </div>

      </aside>

      {/* ====================================================
          MAIN CHAT
      ==================================================== */}

      <main className="flex flex-col flex-1 min-w-0">

        {/* HEADER */}

        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-slate-200">

          <div>

            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {activeChatData?.title ||
                "New Chat"}
            </h2>

            <p className="text-[10px] sm:text-xs text-green-600">
              ● ASTRA AI Online
            </p>

          </div>

          <button
            onClick={clearChat}
            className="px-3 py-2 text-xs font-medium text-slate-500 rounded-lg hover:bg-slate-100 hover:text-slate-900"
          >
            Clear
          </button>

        </header>

        {/* ==================================================
            MESSAGES
        ================================================== */}

        <div className="flex-1 overflow-y-auto">

          <div className="max-w-4xl px-4 py-6 mx-auto sm:px-6">

            {messages.map(
              (message) => {

                const isUser =
                  message.role ===
                  "user";

                return (
                  <div
                    key={message.id}
                    className={`flex mb-6 ${
                      isUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`flex gap-3 max-w-[90%] sm:max-w-[75%] ${
                        isUser
                          ? "flex-row-reverse"
                          : ""
                      }`}
                    >

                      {/* AVATAR */}

                      <div
                        className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${
                          isUser
                            ? "bg-blue-600 text-white"
                            : "bg-slate-900 text-white"
                        }`}
                      >
                        {isUser
                          ? "M"
                          : "A"}
                      </div>

                      {/* MESSAGE */}

                      <div>

                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            isUser
                              ? "bg-blue-600 text-white rounded-tr-sm"
                              : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                          }`}
                        >

                          <p className="text-sm leading-6 whitespace-pre-wrap">
                            {message.content}
                          </p>

                        </div>

                        <p
                          className={`mt-1 text-[10px] text-slate-400 ${
                            isUser
                              ? "text-right"
                              : ""
                          }`}
                        >
                          {message.time}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

            {/* ==================================================
                TYPING INDICATOR
            ================================================== */}

            {isTyping && (

              <div className="flex gap-3 mb-6">

                <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 text-white bg-slate-900 rounded-full">
                  A
                </div>

                <div className="flex items-center gap-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl">

                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />

                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />

                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />

                </div>

              </div>
            )}

          </div>

        </div>

        {/* ==================================================
            INPUT
        ================================================== */}

        <div className="p-3 sm:p-5 bg-white border-t border-slate-200">

          <div className="max-w-4xl mx-auto">

            <div className="flex items-end gap-2 p-2 bg-slate-100 border border-slate-200 rounded-2xl focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">

              <textarea
                value={input}
                disabled={isTyping}
                onChange={(event) =>
                  setInput(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {

                  if (
                    event.key ===
                      "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();

                    sendMessage();
                  }

                }}
                placeholder="Ask ASTRA AI anything..."
                rows={1}
                className="flex-1 px-3 py-3 text-sm bg-transparent outline-none resize-none text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
              />

              <button
                onClick={sendMessage}
                disabled={
                  !input.trim() ||
                  isTyping
                }
                className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isTyping
                  ? "..."
                  : "↑"}
              </button>

            </div>

            <p className="mt-2 text-[10px] text-center text-slate-400">
              ASTRA AI can make mistakes.
              Verify important information.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}