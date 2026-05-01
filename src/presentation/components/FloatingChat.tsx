import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { getAuthToken } from "../../utils/auth.tsx";
import { API_BASE_URL } from "../../utils/Constants.ts";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function FloatingChat() {
  const token = getAuthToken();
  const isUserLogged = token !== "" && token !== undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) textareaRef.current?.focus();
  }, [isOpen]);

  if (!isUserLogged) return null;

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
      const response = await fetch(`${API_BASE_URL}/default/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
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
          break;
        }
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line === "") {
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

      if (blockEvent && blockData) dispatch(blockEvent, blockData);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId && m.isStreaming ? { ...m, isStreaming: false } : m
        )
      );
    } catch {
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              <span className="font-semibold text-white">Ask Flix</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-500">
                  Get movie recommendations, check what's streaming, or discover something new.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        <Markdown
                          components={{
                            a: ({ href, children }) => {
                              if (!href) return <>{children}</>;
                              try {
                                const url = new URL(href);
                                if (url.hostname === window.location.hostname) {
                                  return (
                                    <Link to={url.pathname + url.search + url.hash} className="underline opacity-90 hover:opacity-100">
                                      {children}
                                    </Link>
                                  );
                                }
                              } catch {
                                // relative path like "/title/details/1"
                                if (href.startsWith("/")) {
                                  return (
                                    <Link to={href} className="underline opacity-90 hover:opacity-100">
                                      {children}
                                    </Link>
                                  );
                                }
                              }
                              return (
                                <a href={href} target="_blank" rel="noreferrer" className="underline opacity-90 hover:opacity-100">
                                  {children}
                                </a>
                              );
                            },
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                          }}
                        >
                          {msg.content}
                        </Markdown>
                      </div>
                      {msg.isStreaming && (
                        <span className="ml-1 inline-block h-[12px] w-[2px] animate-pulse bg-gray-400 align-middle" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-3 py-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Flix..."
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="shrink-0 rounded-xl bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-40"
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition hover:bg-gray-700"
      >
        {isOpen ? (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
