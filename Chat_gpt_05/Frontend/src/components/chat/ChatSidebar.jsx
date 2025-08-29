import React from 'react';
import './ChatSidebar.css';


const ChatSidebar = ({ chats, activeChatId, onSelectChat, onNewChat, open }) => {
  const [filteredChats, setFilteredChats] = React.useState(chats);

  const searchChats = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredChats = chats.filter(chat => chat.title.toLowerCase().includes(query));
    setFilteredChats(filteredChats);
  };

  return (
    <aside className={"chat-sidebar " + (open ? 'open' : '')} aria-label="Previous chats">
      <div className="sidebar-header">
        <h2>Chats</h2>
        <button className="small-btn" onClick={onNewChat}>
            new chat
        </button>
      </div>
      <div className='search-container'>
        <input type="text" placeholder="Search chats..." onChange={searchChats} />
      </div>
      <nav className="chat-list" aria-live="polite">
        {filteredChats.map(c => (
          <button
            key={c._id}
            className={"chat-list-item " + (c._id === activeChatId ? 'active' : '')}
            onClick={() => onSelectChat(c._id)}
          >
            <span className="title-line">{c.title}</span>
          </button>
        ))}
        {filteredChats.length === 0 && <p className="empty-hint">No chats yet.</p>}
      </nav>
    </aside>
  );
};

export default ChatSidebar;