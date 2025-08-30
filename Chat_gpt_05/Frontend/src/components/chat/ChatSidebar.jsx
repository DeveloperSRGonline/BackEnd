import React, { useEffect, useState } from "react";
import "./ChatSidebar.css";
import { SearchIcon, SquarePen } from "lucide-react";
import axios from "axios";

const ChatSidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
  open,
  onDeleteChat,
}) => {
  const [filteredChats, setFilteredChats] = React.useState(chats);
  const [editingChatId, setEditingChatId] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  const [deletingId, setDeletingId] = React.useState(null);

  const searchChats = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredChats = chats.filter((chat) =>
      chat.title.toLowerCase().includes(query)
    );
    setFilteredChats(filteredChats);
  };

  const deleteHandler = async (e, chatId) => {
    e.stopPropagation(); // Prevent chat selection when clicking delete
    
    try {
      // Update filtered chats immediately for smoother UX
      setFilteredChats(prev => prev.filter(chat => chat._id !== chatId));
      
      // Update parent component
      await onDeleteChat(chatId);
      
    } catch (error) {
      console.error("Failed to delete chat:", error);
      // Restore filtered chats if deletion failed
      setFilteredChats(chats);
    }
  };

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  return (
    <aside
      className={"chat-sidebar " + (open ? "open" : "")}
      aria-label="Previous chats"
    >
      <div className="sidebar-header">
        <h2>SRG</h2>
        <div className="new">
          <SquarePen className="pen" />
          <button className="small-btn" onClick={onNewChat}>
            new chat
          </button>
        </div>
      </div>
      <div className="search-container">
        <SearchIcon className="search-input" />
        <input
          type="text"
          placeholder="Search chats..."
          onChange={searchChats}
        />
      </div>
      <nav className="chat-list" aria-live="polite">
        {filteredChats.map((c) => (
          <div key={c._id} className={"chat-list-item-wrapper"}>
            {editingChatId === c._id ? (
              <input
                className="chat-rename-input"
                value={editValue}
                autoFocus
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => {
                  if (editValue.trim()) {
                    onRenameChat(c._id, editValue.trim());
                  }
                  setEditingChatId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (editValue.trim()) {
                      onRenameChat(c._id, editValue.trim());
                    }
                    setEditingChatId(null);
                  }
                }}
              />
            ) : (
              <div
                className={
                  "chat-list-item " + (c._id === activeChatId ? "active" : "")
                }
              >
                <div 
                  className="chat-item-content"
                  onClick={() => onSelectChat(c._id)}
                  onDoubleClick={() => {
                    setEditingChatId(c._id);
                    setEditValue(c.title);
                  }}
                >
                  <span className="title-line">{c.title}</span>
                </div>
                {deletingId === c._id ? (
                  <div className="loading-spinner" />
                ) : (
                  <button
                    className="delete-chat-btn"
                    onClick={(e) => deleteHandler(e, c._id)}
                    aria-label="Delete chat"
                    title="Delete chat"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {filteredChats.length === 0 && (
          <p className="empty-hint">No chats yet.</p>
        )}
      </nav>
    </aside>
  );
};

export default ChatSidebar;
