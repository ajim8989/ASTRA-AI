import { NextRequest, NextResponse } from "next/server";

const OLLAMA_URL =
  "http://127.0.0.1:11434/api/chat";

const MODEL_NAME = "qwen3:1.7b";

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

// ============================================================
// MEMORY EXTRACTION
// ============================================================

function extractUserMemory(
  history: HistoryMessage[]
) {
  let userName: string | null = null;
  let projectName: string | null = null;

  for (const message of history) {
    if (message.role !== "user") {
      continue;
    }

    const text = message.content.trim();

    // --------------------------------------------------------
    // NAME
    // Examples:
    // "my name is Ajim"
    // "My name is Maruti"
    // "I am Ajim"
    // "I'm Ajim"
    // "call me Ajim"
    // --------------------------------------------------------

    const namePatterns = [
      /\bmy\s+name\s+is\s+([a-zA-Z][a-zA-Z\s'-]{0,30})/i,
      /\bcall\s+me\s+([a-zA-Z][a-zA-Z\s'-]{0,30})/i,
      /^\s*i\s+am\s+([a-zA-Z][a-zA-Z'-]{1,30})\s*$/i,
      /^\s*i'm\s+([a-zA-Z][a-zA-Z'-]{1,30})\s*$/i,
    ];

    for (const pattern of namePatterns) {
      const match = text.match(pattern);

      if (match) {
        userName = match[1]
          .trim()
          .replace(/[.!?,]+$/, "");

        break;
      }
    }

    // --------------------------------------------------------
    // PROJECT
    // Examples:
    // "I am working on ASTRA AI"
    // "I am working on the ASTRA AI project"
    // "my project is ASTRA AI"
    // "project is called ASTRA AI"
    // --------------------------------------------------------

    const projectPatterns = [
      /\bi\s+am\s+working\s+on\s+(?:the\s+)?(.+?)(?:\s+project)?[.!?]*$/i,

      /\bi'm\s+working\s+on\s+(?:the\s+)?(.+?)(?:\s+project)?[.!?]*$/i,

      /\bmy\s+project\s+is\s+(?:called\s+)?(.+?)[.!?]*$/i,

      /\bproject\s+is\s+called\s+(.+?)[.!?]*$/i,

      /\bworking\s+on\s+project\s+(.+?)[.!?]*$/i,
    ];

    for (const pattern of projectPatterns) {
      const match = text.match(pattern);

      if (match) {
        let project = match[1].trim();

        project = project
          .replace(/^the\s+/i, "")
          .replace(/\s+project$/i, "")
          .replace(/[.!?,]+$/, "")
          .trim();

        if (project.length > 1) {
          projectName = project;
          break;
        }
      }
    }
  }

  return {
    userName,
    projectName,
  };
}

// ============================================================
// CHECK WHAT USER IS ASKING
// ============================================================

function isAskingName(text: string) {
  const value = text
    .toLowerCase()
    .trim();

  return (
    value.includes("what is my name") ||
    value.includes("what's my name") ||
    value.includes("whats my name") ||
    value.includes("do you know my name") ||
    value.includes("tell me my name")
  );
}

function isAskingProject(text: string) {
  const value = text
    .toLowerCase()
    .trim();

  return (
    value.includes("what project am i working on") ||
    value.includes("which project am i working on") ||
    value.includes("what project i'm working on") ||
    value.includes("which project i'm working on") ||
    value.includes("what project i work on") ||
    value.includes("which project i work on") ||
    value.includes("tell me my project")
  );
}

// ============================================================
// MAIN API
// ============================================================

export async function POST(
  request: NextRequest
) {
  try {
    // ========================================================
    // READ REQUEST
    // ========================================================

    const body = await request.json();

    const currentMessage = body.message;

    const history = body.history;

    if (
      !currentMessage ||
      typeof currentMessage !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // VALIDATE HISTORY
    // ========================================================

    const validHistory: HistoryMessage[] =
      Array.isArray(history)
        ? history.filter(
            (item: unknown): item is HistoryMessage => {
              if (
                !item ||
                typeof item !== "object"
              ) {
                return false;
              }

              const msg =
                item as HistoryMessage;

              return (
                (
                  msg.role === "user" ||
                  msg.role === "assistant"
                ) &&
                typeof msg.content === "string"
              );
            }
          )
        : [];

    // ========================================================
    // EXTRACT MEMORY
    // ========================================================

    const memory =
      extractUserMemory(validHistory);

    console.log(
      "\n========================================"
    );

    console.log(
      "ASTRA MEMORY"
    );

    console.log(
      "History count:",
      validHistory.length
    );

    console.log(
      "User name:",
      memory.userName
    );

    console.log(
      "Project:",
      memory.projectName
    );

    console.log(
      "Current question:",
      currentMessage
    );

    console.log(
      "========================================\n"
    );

    // ========================================================
    // DIRECT NAME MEMORY
    // ========================================================

    if (isAskingName(currentMessage)) {
      if (memory.userName) {
        return NextResponse.json({
          success: true,
          message:
            `Your name is ${memory.userName}.`,
        });
      }

      return NextResponse.json({
        success: true,
        message:
          "You haven't told me your name yet.",
      });
    }

    // ========================================================
    // DIRECT PROJECT MEMORY
    // ========================================================

    if (isAskingProject(currentMessage)) {
      if (memory.projectName) {
        return NextResponse.json({
          success: true,
          message:
            `You are working on the ${memory.projectName} project.`,
        });
      }

      return NextResponse.json({
        success: true,
        message:
          "You haven't told me which project you are working on yet.",
      });
    }

    // ========================================================
    // BUILD NORMAL CONVERSATION
    // ========================================================

    const conversationHistory =
      validHistory
        .map((message) => {
          return `${
            message.role === "user"
              ? "USER"
              : "ASTRA AI"
          }: ${message.content}`;
        })
        .join("\n");

    // ========================================================
    // SEND NORMAL QUESTION TO QWEN
    // ========================================================

    const prompt = `
You are ASTRA AI, a helpful AI assistant.

Known user information:

User name:
${memory.userName || "Unknown"}

Current project:
${memory.projectName || "Unknown"}

Previous conversation:

${conversationHistory || "No previous conversation."}

Current user question:

${currentMessage}

Use the available information when answering.

Do not invent information.

Give a concise and helpful answer.
`.trim();

    // ========================================================
    // OLLAMA
    // ========================================================

    const ollamaResponse =
      await fetch(
        OLLAMA_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            model: MODEL_NAME,

            messages: [
              {
                role: "system",
                content:
                  "You are ASTRA AI, a helpful conversational assistant.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],

            stream: false,

            options: {
              temperature: 0.2,
            },
          }),
        }
      );

    // ========================================================
    // OLLAMA ERROR
    // ========================================================

    if (!ollamaResponse.ok) {
      const errorText =
        await ollamaResponse.text();

      console.error(
        "Ollama error:",
        errorText
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Ollama returned an error.",
        },
        {
          status: 500,
        }
      );
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    const data =
      await ollamaResponse.json();

    const aiMessage =
      data?.message?.content;

    if (
      !aiMessage ||
      typeof aiMessage !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "ASTRA AI returned an empty response.",
        },
        {
          status: 500,
        }
      );
    }

    console.log(
      "ASTRA AI:",
      aiMessage
    );

    return NextResponse.json({
      success: true,
      message: aiMessage,
    });

  } catch (error) {
    console.error(
      "ASTRA API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Could not connect to ASTRA AI.",
      },
      {
        status: 500,
      }
    );
  }
}