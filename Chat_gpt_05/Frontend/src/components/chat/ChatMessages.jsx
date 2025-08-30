import React, { useEffect, useRef, useState } from "react";
import { Copy, Check, Edit2, RefreshCw, Volume2, VolumeX, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import "./ChatMessages.css";

const ChatMessages = ({ messages, isSending, onRegenerate, onEditMessage }) => {
  const [speaking, setSpeaking] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const speechRef = useRef(null);

  const handleCopy = async (content, index) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(index);
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isSending]);
  return (
    <div className="messages" aria-live="polite">
      <div className="share">Something here  we will write</div>
      {messages.map((m, index) => (
        <div key={index} className={`msg msg-${m.role === "user" ? "user" : "ai"}`}>
          <div className="msg-role" aria-hidden="true">
            {m.role === "user" ? "You" : "AI"}
          </div>
          {editingMessageId === index ? (
            <div className="msg-edit">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onEditMessage(index, editContent, true); // Send to AI on Enter
                    setEditingMessageId(null);
                  } else if (e.key === 'Escape') {
                    setEditingMessageId(null);
                  }
                }}
                autoFocus
              />
              <div className="edit-actions">
                <button onClick={() => setEditingMessageId(null)}>Cancel</button>
                <button 
                  className="send-btn"
                  onClick={() => {
                    onEditMessage(index, editContent, true); // true indicates resend to AI
                    setEditingMessageId(null);
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className={`msg-bubble ${m.role === "ai" ? "markdown-body" : ""}`}>
              {m.role === "ai" ? (
                <ReactMarkdown>{m.content}</ReactMarkdown>
              ) : (
                m.content
              )}
            </div>
          )}
          <div
            className="msg-actions"
            role="group"
            aria-label="Message actions"
          >
            <button
              type="button"
              className={`action-btn tooltip ${copiedMessageId === index ? 'copied' : ''}`}
              aria-label="Copy message"
              onClick={() => handleCopy(m.content, index)}
            >
              <span className="tooltip-text">{copiedMessageId === index ? 'Copied!' : 'Copy'}</span>
              {copiedMessageId === index ? <Check size={18} /> : <Copy size={18} />}
            </button>
            
            {m.role === "user" && (
              <button
                type="button"
                className="action-btn tooltip"
                aria-label="Edit message"
                onClick={() => {
                  setEditingMessageId(index);
                  setEditContent(m.content);
                }}
              >
                <span className="tooltip-text">Edit</span>
                <Pencil size={18} />
              </button>
            )}

            {m.role === "ai" && (
              <>
                <button
                  type="button"
                  className={`action-btn tooltip ${speaking ? 'active' : ''}`}
                  aria-label={speaking ? "Stop speaking" : "Speak message"}
                  onClick={() => {
                    if (speaking) {
                      speechSynthesis.cancel();
                      setSpeaking(false);
                    } else {
                      const utterance = new SpeechSynthesisUtterance(m.content);
                      utterance.onend = () => setSpeaking(false);
                      utterance.onerror = () => setSpeaking(false);
                      speechRef.current = utterance;
                      setSpeaking(true);
                      speechSynthesis.speak(utterance);
                    }
                  }}
                >
                  <span className="tooltip-text">{speaking ? "Stop" : "Speak"}</span>
                  {speaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <button
                  type="button"
                  className="action-btn tooltip"
                  aria-label="Regenerate response"
                  onClick={() => onRegenerate(index)}
                >
                  <span className="tooltip-text">Regenerate</span>
                  <RefreshCw size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      {isSending && (
        <div className="msg msg-ai pending">
          <div className="msg-role" aria-hidden="true">
            AI
          </div>
          <div className="msg-bubble typing-dots" aria-label="AI is typing">
            <span />
            <span />
            <span />   
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
