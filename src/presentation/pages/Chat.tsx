import { useEffect, useRef, useState } from "react";
import { checkAuthLoader } from "../../utils/auth.tsx";
import { getAuthToken } from "../../utils/auth.tsx";
import { API_BASE_URL } from "../../utils/Constants.ts";

export { checkAuthLoader as chatLoader };

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    const assistantId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: text },
      { id: assistantId, role: "assistant", content: "", isStreaming: true },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/default/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok || !response.body) throw new Error("Request failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let blockData = "";
      let blockEvent = "";

      const dispatch = (event: string, rawData: string) => {
        if (event === "token") {
          try {
            const parsed = JSON.parse(rawData) as { content: string };
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + parsed.content }
                  : m
              )
            );
          } catch {
            // ignore malformed chunks
          }
        } else if (event === "done") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, isStreaming: false } : m
            )
          );
        } else if (event === "error") {
          try {
            const parsed = JSON.parse(rawData) as { message: string };
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: parsed.message, isStreaming: false }
                  : m
              )
            );
          } catch {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: "An error occurred.", isStreaming: false }
                  : m
              )
            );
          }
        }
      };

      while (true) {
        let done: boolean;
        let value: Uint8Array | undefined;
        try {
          ({ done, value } = await reader.read());
        } catch {
          // connection closed by server — treat as end of stream
          break;
        }
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line === "") {
            // blank line = end of SSE event block
            if (blockEvent && blockData) dispatch(blockEvent, blockData);
            blockEvent = "";
            blockData = "";
          } else if (line.startsWith("event:")) {
            blockEvent = line.substring(6).trim();
          } else if (line.startsWith("data:")) {
            blockData = line.substring(5).trim();
          }
        }
      }

      // flush any trailing block not followed by a blank line
      if (blockEvent && blockData) dispatch(blockEvent, blockData);

      // ensure streaming cursor is cleared
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId && m.isStreaming ? { ...m, isStreaming: false } : m
        )
      );
    } catch {
      // only replace content if nothing was received yet
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== assistantId) return m;
          return m.content
            ? { ...m, isStreaming: false }
            : { ...m, content: "Failed to get a response. Please try again.", isStreaming: false };
        })
      );
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col bg-white">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <h2 className="text-3xl font-bold text-gray-800">Ask Flix</h2>
              <p className="mt-3 max-w-sm text-gray-500">
                Get movie recommendations, check what's streaming, or discover
                something new.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.isStreaming && (
                      <span className="ml-1 inline-block h-[14px] w-[2px] animate-pulse bg-gray-500 align-middle" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Flix..."
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm leading-relaxed focus:border-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="shrink-0 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-gray-400">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
