import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { API_BASE_URL } from "../../utils/Constants.ts";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function FloatingChat() {
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
        headers: { "Content-Type": "application/json" },
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
            : {
                ...m,
                content: "Failed to get a response. Please try again.",
                isStreaming: false,
              };
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
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {/* Chat panel */}
      {isOpen && (
        <div
          className="panel"
          style={{
            width: 360,
            height: 480,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <div className="channel-strip">
            <span className="font-crt" style={{ color: "var(--amber)" }}>CH 88</span>
            <span>ASK FLIX · AI ASSISTANT</span>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-ghost"
              style={{ padding: "2px 6px" }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {messages.length === 0 ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: 8,
                }}
              >
                <div className="font-crt" style={{ fontSize: 32, color: "var(--amber)" }}>
                  ▶ FLIX
                </div>
                <p className="muted" style={{ fontSize: 12, lineHeight: 1.6 }}>
                  Ask me about movies, recommendations,<br />or what's streaming.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "8px 12px",
                        fontSize: 13,
                        lineHeight: 1.5,
                        background:
                          msg.role === "user" ? "var(--amber)" : "var(--bg-3)",
                        color:
                          msg.role === "user" ? "var(--ink)" : "var(--label)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      <div style={{ whiteSpace: "pre-wrap" }}>
                        <Markdown
                          components={{
                            a: ({ href, children }) => {
                              if (!href) return <>{children}</>;
                              try {
                                const url = new URL(href);
                                if (url.hostname === window.location.hostname) {
                                  return (
                                    <Link to={url.pathname + url.search + url.hash} className="link">
                                      {children}
                                    </Link>
                                  );
                                }
                              } catch {
                                if (href.startsWith("/")) {
                                  return (
                                    <Link to={href} className="link">
                                      {children}
                                    </Link>
                                  );
                                }
                              }
                              return (
                                <a href={href} target="_blank" rel="noreferrer" className="link">
                                  {children}
                                </a>
                              );
                            },
                            p: ({ children }) => (
                              <p style={{ marginBottom: 4 }}>
                                {children}
                              </p>
                            ),
                          }}
                        >
                          {msg.content}
                        </Markdown>
                      </div>
                      {msg.isStreaming && (
                        <span
                          className="blink"
                          style={{
                            display: "inline-block",
                            width: 6,
                            height: 12,
                            background: "var(--amber)",
                            marginLeft: 4,
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              borderTop: "1px solid var(--line-strong)",
              padding: 12,
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Flix…"
              rows={1}
              disabled={isLoading}
              className="input"
              style={{
                flex: 1,
                resize: "none",
                padding: "8px 10px",
                fontSize: 13,
                opacity: isLoading ? 0.5 : 1,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="btn btn-primary btn-sm"
              style={{ whiteSpace: "nowrap", opacity: isLoading || !input.trim() ? 0.4 : 1 }}
            >
              {isLoading ? "…" : "Send"}
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn"
        style={{
          width: 54,
          height: 54,
          padding: 0,
          justifyContent: "center",
          background: isOpen ? "var(--amber)" : "var(--bg-2)",
          borderColor: isOpen ? "var(--amber)" : "var(--label)",
          color: isOpen ? "var(--ink)" : "var(--label)",
          fontSize: 20,
          boxShadow: "3px 3px 0 rgba(0,0,0,0.4)",
        }}
        title="Ask Flix"
      >
        {isOpen ? "✕" : "▶"}
      </button>
    </div>
  );
}
