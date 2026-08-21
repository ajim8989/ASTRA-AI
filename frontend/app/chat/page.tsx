"use client";

import { useEffect, useState } from "react";

type Message = {
  sender: "user" | "ai";
  text: string;
};

type Chat = {
  id: number;
  title: string;
};

type CurrentUser = {
  id?: number;
  username: string;
  displayName: string;
};

export default function ChatPage() {

  // =========================================================
  // CURRENT USER
  // =========================================================

  const [currentUser, setCurrentUser] =
    useState<CurrentUser | null>(null);

  const [chats, setChats] =
    useState<Chat[]>([]);

  const [activeChat, setActiveChat] =
    useState<number | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================================================
  // LOAD LOGGED-IN USER
  // =========================================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("astra_user");

    if (!storedUser) {

      window.location.href =
        "/login";

      return;
    }

    try {

      const user =
        JSON.parse(storedUser);

      const loggedInUser: CurrentUser = {
        id: user.id,
        username:
          user.username || "",
        displayName:
          user.displayName || "",
      };

      if (
        !loggedInUser.username
      ) {

        throw new Error(
          "Invalid user information."
        );
      }

      setCurrentUser(
        loggedInUser
      );

      loadChats(
        loggedInUser.username
      );

    } catch (error) {

      console.error(
        "Invalid stored user:",
        error
      );

      localStorage.removeItem(
        "astra_user"
      );

      window.location.href =
        "/login";
    }

  }, []);

  // =========================================================
  // LOAD CONVERSATIONS
  // =========================================================

  const loadChats = async (
    username: string
  ) => {

    try {

      const response =
        await fetch(
          `http://localhost:8080/api/chats?username=${encodeURIComponent(
            username
          )}`
        );

      if (!response.ok) {

        throw new Error(
          "Failed to load conversations"
        );
      }

      const data: Chat[] =
        await response.json();

      console.log(
        "Conversations from Java:",
        data
      );

      setChats(data);

      if (data.length > 0) {

        setActiveChat(
          data[0].id
        );

        await loadChatMessages(
          data[0].id
        );

      } else {

        setMessages([
          {
            sender: "ai",
            text:
              "👋 Hello! I'm ASTRA AI. How can I help you today?",
          },
        ]);
      }

    } catch (error) {

      console.error(
        "Failed to load chats:",
        error
      );

      setMessages([
        {
          sender: "ai",
          text:
            "❌ Could not connect to the ASTRA AI backend.",
        },
      ]);
    }
  };

  // =========================================================
  // LOAD CHAT MESSAGES
  // =========================================================

  const loadChatMessages = async (
    chatId: number
  ) => {

    try {

      const response =
        await fetch(
          `http://localhost:8080/api/chats/${chatId}/messages`
        );

      if (!response.ok) {

        throw new Error(
          "Failed to load chat messages"
        );
      }

      const data =
        await response.json();

      console.log(
        "Messages from Java:",
        data
      );

      const convertedMessages: Message[] =
        data.map(
          (message: {
            role: string;
            content: string;
          }) => ({

            sender:
              message.role === "user"
                ? "user"
                : "ai",

            text:
              message.content,
          })
        );

      setMessages(
        convertedMessages
      );

    } catch (error) {

      console.error(
        "Failed to load messages:",
        error
      );

      setMessages([
        {
          sender: "ai",
          text:
            "❌ Could not load this conversation.",
        },
      ]);
    }
  };

  // =========================================================
  // SELECT CHAT
  // =========================================================

  const selectChat = async (
    chatId: number
  ) => {

    setActiveChat(
      chatId
    );

    await loadChatMessages(
      chatId
    );
  };

  // =========================================================
  // SEND MESSAGE
  // =========================================================

  const sendMessage = async () => {

    const text =
      input.trim();

    if (
      !text ||
      loading ||
      !currentUser
    ) {
      return;
    }

    let conversationId =
      activeChat;

    // =======================================================
    // CREATE CONVERSATION IF NONE EXISTS
    // =======================================================

    if (!conversationId) {

      try {

        const createResponse =
          await fetch(
            `http://localhost:8080/api/chats?title=New%20Conversation&username=${encodeURIComponent(
              currentUser.username
            )}&displayName=${encodeURIComponent(
              currentUser.displayName
            )}`,
            {
              method: "POST",
            }
          );

        if (!createResponse.ok) {

          throw new Error(
            "Could not create conversation"
          );
        }

        const newChat: Chat =
          await createResponse.json();

        conversationId =
          newChat.id;

        setChats(
          (prev) => [
            newChat,
            ...prev,
          ]
        );

        setActiveChat(
          newChat.id
        );

      } catch (error) {

        console.error(
          "Create chat error:",
          error
        );

        return;
      }
    }

    // =======================================================
    // CURRENT HISTORY
    // =======================================================

    const previousHistory =
      messages.map(
        (message) => ({

          role:
            message.sender ===
            "user"
              ? ("user" as const)
              : ("assistant" as const),

          content:
            message.text,
        })
      );

    // =======================================================
    // SHOW USER MESSAGE
    // =======================================================

    const userMessage: Message = {
      sender: "user",
      text: text,
    };

    setMessages(
      (prev) => [
        ...prev,
        userMessage,
      ]
    );

    setInput("");

    setLoading(true);

    try {

      const conversationHistory = [
        ...previousHistory,

        {
          role:
            "user" as const,

          content:
            text,
        },
      ];

      console.log(
        "========== ASTRA → JAVA =========="
      );

      console.log(
        "Current user:",
        currentUser
      );

      console.log(
        "Current message:",
        text
      );

      console.log(
        "Conversation ID:",
        conversationId
      );

      console.log(
        "History:",
        conversationHistory
      );

      // =====================================================
      // CALL JAVA BACKEND
      // =====================================================

      const response =
        await fetch(
          "http://localhost:8080/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              conversationId:
                conversationId,

              message:
                text,

              history:
                conversationHistory,

            }),
          }
        );

      const data =
        await response.text();

      if (!response.ok) {

        throw new Error(
          data ||
            "Java backend returned an error."
        );
      }

      // =====================================================
      // SHOW AI RESPONSE
      // =====================================================

      const aiMessage: Message = {

        sender: "ai",

        text:
          data ||
          "ASTRA AI returned an empty response.",
      };

      setMessages(
        (prev) => [
          ...prev,
          aiMessage,
        ]
      );

      // =====================================================
      // UPDATE CONVERSATION TITLE
      // =====================================================

      setChats(
        (prev) =>
          prev.map(
            (chat) =>
              chat.id ===
              conversationId
                ? {

                    ...chat,

                    title:
                      chat.title ===
                      "New Conversation"
                        ? text.length >
                          40
                          ? text.substring(
                              0,
                              40
                            ) +
                            "..."
                          : text
                        : chat.title,

                  }
                : chat
          )
      );

      console.log(
        "Conversation saved by Java."
      );

    } catch (error) {

      console.error(
        "ASTRA Java API Error:",
        error
      );

      const errorMessage: Message = {

        sender: "ai",

        text:
          "❌ Could not connect to the ASTRA AI Java backend. Please make sure Spring Boot and Ollama are running.",
      };

      setMessages(
        (prev) => [
          ...prev,
          errorMessage,
        ]
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================================================
  // NEW CHAT
  // =========================================================

  const newChat = async () => {

    if (!currentUser) {
      return;
    }

    try {

      const response =
        await fetch(
          `http://localhost:8080/api/chats?title=New%20Conversation&username=${encodeURIComponent(
            currentUser.username
          )}&displayName=${encodeURIComponent(
            currentUser.displayName
          )}`,
          {
            method: "POST",
          }
        );

      if (!response.ok) {

        throw new Error(
          "Could not create new chat"
        );
      }

      const newChat: Chat =
        await response.json();

      setChats(
        (prev) => [
          newChat,
          ...prev,
        ]
      );

      setActiveChat(
        newChat.id
      );

      setMessages([]);

      setInput("");

    } catch (error) {

      console.error(
        "New chat error:",
        error
      );
    }
  };

  // =========================================================
  // DELETE CHAT
  // =========================================================

  const deleteChat = async (
    chatId: number
  ) => {

    try {

      const response =
        await fetch(
          `http://localhost:8080/api/chats/${chatId}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {

        throw new Error(
          "Could not delete conversation"
        );
      }

      const remainingChats =
        chats.filter(
          (chat) =>
            chat.id !== chatId
        );

      setChats(
        remainingChats
      );

      if (
        activeChat ===
        chatId
      ) {

        if (
          remainingChats.length >
          0
        ) {

          const nextChat =
            remainingChats[0];

          setActiveChat(
            nextChat.id
          );

          await loadChatMessages(
            nextChat.id
          );

        } else {

          setActiveChat(
            null
          );

          setMessages([
            {
              sender: "ai",
              text:
                "👋 Hello! I'm ASTRA AI. How can I help you today?",
            },
          ]);
        }
      }

    } catch (error) {

      console.error(
        "Delete chat error:",
        error
      );
    }
  };

  // =========================================================
  // CLEAR DISPLAY
  // =========================================================

  const clearConversation =
    () => {

      setMessages([]);
    };

  // =========================================================
  // LOADING USER
  // =========================================================

  if (!currentUser) {

    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7fb",
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        Loading ASTRA AI...
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#f5f7fb",
      }}
    >

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <ChatSidebar
        chats={chats}

        activeChat={
          activeChat
        }

        onNewChat={
          newChat
        }

        onSelectChat={
          selectChat
        }

        onDeleteChat={
          deleteChat
        }

        currentUser={
          currentUser
        }
      />

      {/* ===================================================
          MAIN CHAT
      =================================================== */}

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          style={{
            height: "72px",
            padding: "0 25px",
            background: "#111827",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >

          <div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
              }}
            >
              🤖 ASTRA AI Chat
            </div>

            <div
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "#86efac",
              }}
            >
              ● AI Workspace
            </div>

          </div>

          <button
            onClick={
              clearConversation
            }

            style={{
              padding: "9px 14px",
              background: "#1f2937",
              color: "#d1d5db",
              border: "1px solid #374151",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Clear
          </button>

        </header>

        {/* =================================================
            MESSAGES
        ================================================= */}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "25px",
          }}
        >

          {messages.length ===
            0 && (

            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "#64748b",
              }}
            >

              <div
                style={{
                  fontSize: "45px",
                  marginBottom: "10px",
                }}
              >
                🤖
              </div>

              <h2
                style={{
                  margin: 0,
                  color: "#334155",
                }}
              >
                Start a conversation
              </h2>

              <p>
                Ask ASTRA AI anything.
              </p>

            </div>
          )}

          {messages.map(
            (
              msg,
              index
            ) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender ===
                    "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "18px",
                }}
              >

                <div
                  style={{
                    maxWidth: "65%",
                    display: "flex",
                    flexDirection:
                      msg.sender ===
                      "user"
                        ? "row-reverse"
                        : "row",
                    gap: "10px",
                    alignItems:
                      "flex-start",
                  }}
                >

                  {/* Avatar */}

                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      minWidth: "36px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        msg.sender ===
                        "user"
                          ? "#2563eb"
                          : "#111827",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {msg.sender ===
                    "user"
                      ? currentUser.displayName
                          .charAt(0)
                          .toUpperCase()
                      : "A"}
                  </div>

                  <div>

                    <div
                      style={{
                        background:
                          msg.sender ===
                          "user"
                            ? "#2563eb"
                            : "#ffffff",
                        color:
                          msg.sender ===
                          "user"
                            ? "white"
                            : "#111827",
                        padding:
                          "12px 18px",
                        borderRadius:
                          msg.sender ===
                          "user"
                            ? "14px 4px 14px 14px"
                            : "4px 14px 14px 14px",
                        boxShadow:
                          "0 2px 8px rgba(0,0,0,0.08)",
                        lineHeight: "1.6",
                        fontSize: "14px",
                        whiteSpace:
                          "pre-wrap",
                      }}
                    >
                      {msg.text}
                    </div>

                    <div
                      style={{
                        marginTop: "5px",
                        fontSize: "10px",
                        color: "#94a3b8",
                      }}
                    >
                      {msg.sender ===
                      "user"
                        ? currentUser.displayName
                        : "ASTRA AI"}{" "}
                      • Now
                    </div>

                  </div>

                </div>

              </div>
            )
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-start",
                marginBottom: "18px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >

                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#111827",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                  }}
                >
                  A
                </div>

                <div
                  style={{
                    padding:
                      "12px 18px",
                    background: "white",
                    color: "#64748b",
                    borderRadius:
                      "4px 14px 14px 14px",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  🤖 ASTRA AI is thinking...
                </div>

              </div>

            </div>
          )}

        </div>

        {/* =================================================
            INPUT
        ================================================= */}

        <div
          style={{
            padding:
              "18px 25px",
            background: "white",
            borderTop:
              "1px solid #e2e8f0",
          }}
        >

          <div
            style={{
              display: "flex",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >

            <input
              value={input}
              disabled={loading}
              placeholder="Ask ASTRA AI..."
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {

                  e.preventDefault();

                  sendMessage();
                }

              }}
              style={{
                flex: 1,
                padding:
                  "13px 15px",
                borderRadius: "10px",
                border:
                  "1px solid #cbd5e1",
                outline: "none",
                fontSize: "14px",
                background:
                  loading
                    ? "#f1f5f9"
                    : "white",
              }}
            />

            <button
              onClick={
                sendMessage
              }
              disabled={
                loading ||
                !input.trim()
              }
              style={{
                marginLeft: "10px",
                padding:
                  "12px 22px",
                background:
                  loading ||
                  !input.trim()
                    ? "#93c5fd"
                    : "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor:
                  loading ||
                  !input.trim()
                    ? "not-allowed"
                    : "pointer",
                fontWeight: "600",
              }}
            >
              {loading
                ? "Thinking..."
                : "Send"}
            </button>

          </div>

          <p
            style={{
              textAlign: "center",
              margin:
                "8px 0 0",
              fontSize: "10px",
              color: "#94a3b8",
            }}
          >
            ASTRA AI • Intelligent Workspace Platform
          </p>

        </div>

      </main>
    </div>
  );
}


// ===========================================================
// CHAT SIDEBAR
// ===========================================================

function ChatSidebar({
  chats,
  activeChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  currentUser,
}: {
  chats: Chat[];

  activeChat:
    number | null;

  onNewChat:
    () => void;

  onSelectChat:
    (
      chatId: number
    ) => void;

  onDeleteChat:
    (
      chatId: number
    ) => void;

  currentUser: CurrentUser;
}) {

  return (
    <aside
      style={{
        width: "260px",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >

      {/* =================================================
          BRAND
      ================================================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "25px",
        }}
      >

        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          A
        </div>

        <div>

          <div
            style={{
              fontWeight: "700",
              fontSize: "17px",
            }}
          >
            ASTRA AI
          </div>

          <div
            style={{
              fontSize: "10px",
              color: "#64748b",
            }}
          >
            AI Workspace
          </div>

        </div>

      </div>

      {/* =================================================
          NEW CHAT
      ================================================= */}

      <button
        onClick={
          onNewChat
        }
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
          marginBottom: "25px",
          fontWeight: "bold",
        }}
      >
        + New Chat
      </button>

      {/* =================================================
          CONVERSATIONS
      ================================================= */}

      <p
        style={{
          fontSize: "10px",
          color: "#64748b",
          fontWeight: "700",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Conversations
      </p>

      {chats.length ===
        0 && (

        <p
          style={{
            padding: "10px",
            color: "#64748b",
            fontSize: "12px",
          }}
        >
          No conversations yet.
        </p>
      )}

      {chats.map(
        (chat) => {

          const active =
            activeChat ===
            chat.id;

          return (
            <div
              key={
                chat.id
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "8px",
              }}
            >

              <button
                onClick={() =>
                  onSelectChat(
                    chat.id
                  )
                }
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  background:
                    active
                      ? "#2563eb"
                      : "#1f2937",
                  color:
                    active
                      ? "white"
                      : "#cbd5e1",
                  cursor: "pointer",
                  fontSize: "13px",
                  textAlign: "left",
                  overflow: "hidden",
                  textOverflow:
                    "ellipsis",
                  whiteSpace:
                    "nowrap",
                }}
              >
                💬{" "}
                {chat.title}
              </button>

              <button
                onClick={() =>
                  onDeleteChat(
                    chat.id
                  )
                }
                title=
                  "Delete conversation"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "7px",
                  border:
                    "1px solid #374151",
                  background:
                    "#1f2937",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "13px",
                  flexShrink: 0,
                }}
              >
                🗑
              </button>

            </div>
          );
        }
      )}

      {/* =================================================
          SPACER
      ================================================= */}

      <div
        style={{
          flex: 1,
        }}
      />

      {/* =================================================
          USER PROFILE
      ================================================= */}

      <div
        style={{
          borderTop:
            "1px solid #1f2937",
          paddingTop: "15px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >

        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
          }}
        >
          {currentUser.displayName
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>

          <div
            style={{
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            {
              currentUser.displayName
            }
          </div>

          <div
            style={{
              fontSize: "10px",
              color: "#64748b",
            }}
          >
            {currentUser.username}
          </div>

        </div>

      </div>

    </aside>
  );
}