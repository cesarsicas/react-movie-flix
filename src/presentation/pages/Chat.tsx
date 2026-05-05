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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 84px)",
        background: "var(--bg)",
      }}
    >
      {/* Channel header */}
      <div className="channel-strip" style={{ borderLeft: "none", borderRight: "none" }}>
        <span className="font-crt" style={{ color: "var(--amber)" }}>CH 88</span>
        <span>ASK FLIX · AI MOVIE ASSISTANT</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="rec-dot" />
          <span className="font-crt" style={{ fontSize: 13, color: "var(--red)" }}>ONLINE</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px" }}>
          {messages.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 80,
                gap: 20,
                textAlign: "center",
              }}
            >
              <div
                className="font-display"
                style={{ fontSize: "clamp(40px, 5vw, 64px)", color: "var(--amber)", lineHeight: 0.9 }}
              >
                ASK FLIX
              </div>
              <p className="font-crt muted" style={{ fontSize: 18, letterSpacing: "0.08em" }}>
                CH 88 · AI MOVIE ASSISTANT
              </p>
              <p className="muted" style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 420 }}>
                Ask me for movie recommendations, check what's streaming,<br />
                discover something new, or find out about cast and crew.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
                {[
                  "What's a good horror film?",
                  "Recommend a 90s comedy",
                  "Movies like Blade Runner",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    className="chip"
                    onClick={() => {
                      setInput(suggestion);
                      setTimeout(() => textareaRef.current?.focus(), 0);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="font-crt"
                      style={{
                        width: 32,
                        height: 32,
                        flexShrink: 0,
                        background: "var(--amber)",
                        color: "var(--ink)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        marginRight: 10,
                        alignSelf: "flex-end",
                      }}
                    >
                      ▶
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "10px 14px",
                      fontSize: 13,
                      lineHeight: 1.6,
                      background: msg.role === "user" ? "var(--amber)" : "var(--bg-2)",
                      color: msg.role === "user" ? "var(--ink)" : "var(--label)",
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
                          p: ({ children }) => <p style={{ marginBottom: 4 }}>{children}</p>,
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
      </div>

      {/* Input bar */}
      <div
        className="panel"
        style={{
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "none",
          padding: "12px 24px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end" }}>
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
              padding: "10px 12px",
              opacity: isLoading ? 0.5 : 1,
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="btn btn-primary"
            style={{ opacity: isLoading || !input.trim() ? 0.4 : 1, whiteSpace: "nowrap" }}
          >
            {isLoading ? "…" : "Send ▶"}
          </button>
        </div>
        <p className="muted" style={{ textAlign: "center", fontSize: 11, marginTop: 8, letterSpacing: "0.1em" }}>
          ENTER TO SEND · SHIFT+ENTER FOR NEW LINE
        </p>
      </div>
    </div>
  );
}

export async function chatLoader() {
  return null;
}
