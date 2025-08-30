import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatMobileBar from "../components/chat/ChatMobileBar.jsx";
import ChatSidebar from "../components/chat/ChatSidebar.jsx";
import ChatMessages from "../components/chat/ChatMessages.jsx";
import ChatComposer from "../components/chat/ChatComposer.jsx";
import "../components/chat/ChatLayout.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  startNewChat,
  selectChat,
  setInput,
  sendingStarted,
  sendingFinished,
  setChats,
  setMessagesForChat,
  renameChat,
  onDeleteChat,
} from "../store/ChatSlice.js";
import { Dot } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const input = useSelector((state) => state.chat.input);
  const isSending = useSelector((state) => state.chat.isSending);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [socket, setSocket] = useState(null);

  const activeChat = chats.find((c) => c._id === activeChatId) || null;

  // Effect to load messages when active chat changes
  useEffect(() => {
    if (activeChatId) {
      getMessages(activeChatId);
    } else {
      setMessages([]);
    }
  }, [activeChatId]);

  // Store messages for each chat
  const [messagesMap, setMessagesMap] = useState({});
  // Current displayed messages
  const [messages, setMessages] = useState([]);

  const generateUniqueTitle = () => {
    const base = "New Chat";
    let counter = 0;
    let title = base;
    const titles = chats.map((c) => c.title);

    while (titles.includes(title)) {
      counter++;
      title = `${base} (${counter})`;
    }
    return title;
  };

  const handleNewChat = async () => {
    try {
      const title = generateUniqueTitle();

      // Create new chat on the server
      const response = await axios.post(
        "http://localhost:3000/api/chat/",
        { title },
        { withCredentials: true }
      );

      if (!response.data.chat) {
        throw new Error('Failed to create new chat: No chat data received');
      }

      const newChat = response.data.chat;

      // Update Redux state first
      dispatch(startNewChat({ 
        _id: newChat._id,
        title: newChat.title 
      }));

      // Clear any existing messages and set up new chat state
      setMessages([]);
      setMessagesMap(prev => ({
        ...prev,
        [newChat._id]: []
      }));

      // Make sure the new chat is selected
      dispatch(selectChat(newChat._id));

      // Clear any existing input
      dispatch(setInput(""));

      setSidebarOpen(false);

      console.log('New chat created:', newChat); // Debug log
    } catch (error) {
      console.error("Failed to create new chat:", error);
      // Attempt to recover state
      try {
        const chatsResponse = await axios.get("http://localhost:3000/api/chat/", {
          withCredentials: true,
        });
        const serverChats = chatsResponse.data.chats || [];
        dispatch(setChats(serverChats.reverse()));
      } catch (fetchError) {
        console.error("Failed to recover state:", fetchError);
      }
    }
  };

  // Function to fetch all chats
  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/chat/", {
        withCredentials: true,
      });

      const chats = response.data.chats || [];
      const reversedChats = chats.reverse();

      // Update Redux state with the latest chats
      dispatch(setChats(reversedChats));

      // Reset all state if there are no chats
      if (reversedChats.length === 0) {
        dispatch(selectChat(null));
        setMessages([]);
        // Clear any other related state
        dispatch(setInput(""));
        dispatch(sendingFinished());
      }

      return reversedChats;
    } catch (err) {
      console.error("Failed to fetch chats:", err);
      // Reset all state on error
      dispatch(setChats([]));
      dispatch(selectChat(null));
      setMessages([]);
      dispatch(setInput(""));
      dispatch(sendingFinished());
      return [];
    }
  };

  // Initialize the app state and socket connection
  useEffect(() => {
    let mounted = true;

    const initApp = async () => {
      if (!mounted) return;

      try {
        // Reset all state first
        dispatch(setChats([]));
        dispatch(selectChat(null));
        setMessages([]);
        dispatch(setInput(""));
        dispatch(sendingFinished());

        // Fetch initial chats
        const initialChats = await fetchChats();

        // If there are chats, select the first one
        if (initialChats.length > 0) {
          const firstChat = initialChats[0];
          dispatch(selectChat(firstChat._id));

          // Load messages for the first chat
          try {
            const messagesResponse = await axios.get(
              `http://localhost:3000/api/chat/messages/${firstChat._id}`,
              { withCredentials: true }
            );
            if (mounted) {
              setMessages(messagesResponse.data.messages || []);
            }
          } catch (error) {
            console.error("Failed to fetch initial messages:", error);
          }
        }
      } catch (error) {
        console.error("Failed to initialize app:", error);
      }

      // Setup socket connection
      if (!socket) {
        const tempSocket = io("http://localhost:3000", {
          withCredentials: true,
          reconnection: true,
          reconnectionDelay: 1000,
        });

        tempSocket.on("connect", () => {
          console.log("Socket connected");
        });

        tempSocket.on("ai-response", (messagePayload) => {
          if (!mounted) return;

          const newMessage = {
            role: "ai",
            content: messagePayload.content,
            ts: Date.now(),
          };
          
          // Update both the messages map and current messages
          setMessagesMap(prev => ({
            ...prev,
            [activeChatId]: [...(prev[activeChatId] || []), newMessage]
          }));
          setMessages(prev => [...prev, newMessage]);

          dispatch(sendingFinished());
        });

        tempSocket.on("disconnect", () => {
          console.log("Socket disconnected");
        });

        setSocket(tempSocket);
      }
    };

    initApp();

    // Cleanup function
    return () => {
      mounted = false;
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || !activeChatId || isSending) return;
    
    try {
      dispatch(sendingStarted());

      const newMessage = {
        role: "user",
        content: trimmed,
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      dispatch(setInput(""));

      // Update messages map to keep state in sync
      setMessagesMap(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), newMessage]
      }));

      socket.emit("ai-message", {
        chat: activeChatId,
        content: trimmed,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      dispatch(sendingFinished());
    }
  };

  const getMessages = async (chatId) => {
    if (!chatId) return;
    
    try {
      const response = await axios.get(
        `http://localhost:3000/api/chat/messages/${chatId}`,
        { withCredentials: true }
      );

      // Format messages with proper role and content
      const formattedMessages = (response.data.messages || []).map(m => ({
        role: m.role || 'ai',  // default to 'ai' if role is missing
        content: m.content,
        id: m._id,
        ts: m.createdAt || Date.now(),
      }));
      
      // Store messages in the map and update current messages
      setMessagesMap(prev => ({
        ...prev,
        [chatId]: formattedMessages
      }));
      setMessages(formattedMessages);
      
      // Update messages in Redux store
      dispatch(setMessagesForChat({
        chatId,
        messages: formattedMessages
      }));

    } catch (error) {
      console.error('Failed to fetch messages for chat:', chatId, error);
      setMessagesMap(prev => ({
        ...prev,
        [chatId]: []
      }));
      setMessages([]);
    }
  };

  const [deletingChatId, setDeletingChatId] = useState(null);

  const deleteHandler = async (chatId) => {
    if (!chatId) return;

    try {
      // Optimistically update UI first
      const updatedChats = chats.filter(chat => chat._id !== chatId);
      
      // Clear all states related to the deleted chat
      // 1. Clear from messagesMap
      setMessagesMap(prev => {
        const newMap = { ...prev };
        delete newMap[chatId];
        return newMap;
      });

      // 2. Clear current messages if it's the active chat
      if (activeChatId === chatId) {
        setMessages([]);
      }

      // 3. Clear from Redux store
      dispatch(onDeleteChat({ chatId }));

      // Delete from server
      await axios.delete(`http://localhost:3000/api/chat/${chatId}`, {
        withCredentials: true,
      });

      // Handle active chat changes after successful deletion
      if (activeChatId === chatId) {
        if (updatedChats.length > 0) {
          // Switch to next available chat
          const nextChat = updatedChats[0];
          dispatch(selectChat(nextChat._id));
          
          // Load messages for next chat
          if (messagesMap[nextChat._id]) {
            // Use cached messages if available
            setMessages(messagesMap[nextChat._id]);
            dispatch(setMessagesForChat({
              chatId: nextChat._id,
              messages: messagesMap[nextChat._id]
            }));
          } else {
            // Fetch messages for next chat
            try {
              const messagesResponse = await axios.get(
                `http://localhost:3000/api/chat/messages/${nextChat._id}`,
                { withCredentials: true }
              );
              const newMessages = messagesResponse.data.messages || [];
              setMessages(newMessages);
              setMessagesMap(prev => ({
                ...prev,
                [nextChat._id]: newMessages
              }));
              dispatch(setMessagesForChat({
                chatId: nextChat._id,
                messages: newMessages
              }));
            } catch (error) {
              console.error('Failed to load messages for next chat:', error);
              setMessages([]);
            }
          }
        } else {
          // No chats left - clear all states
          dispatch(setChats([])); // Clear chats first
          dispatch(selectChat(null));
          dispatch(setInput(""));
          setMessages([]);
          setMessagesMap({});
          
          // Force a clean slate for the Redux store
          dispatch({ type: 'chat/reset' }); // This will trigger a fresh state
        }
      }
    } catch (err) {
      console.error("Failed to delete chat:", err);
      // Restore the chat in case of error
      try {
        const chatsResponse = await axios.get("http://localhost:3000/api/chat/", {
          withCredentials: true,
        });
        const serverChats = chatsResponse.data.chats || [];
        dispatch(setChats(serverChats.reverse()));
        
        // Restore messages for the active chat if needed
        if (activeChatId) {
          const messagesResponse = await axios.get(
            `http://localhost:3000/api/chat/messages/${activeChatId}`,
            { withCredentials: true }
          );
          const restoredMessages = messagesResponse.data.messages || [];
          setMessages(restoredMessages);
          setMessagesMap(prev => ({
            ...prev,
            [activeChatId]: restoredMessages
          }));
        }
      } catch (error) {
        console.error("Failed to restore state:", error);
      }
    }
  };
  // Handler for regenerating AI responses
  const handleRegenerate = async (messageIndex) => {
    if (!activeChatId) return;

    const messageToRegenerate = messages[messageIndex];
    if (!messageToRegenerate || messageToRegenerate.role !== 'ai') return;

    // Get the user message that prompted this AI response
    let userMessageContent = '';
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        userMessageContent = messages[i].content;
        break;
      }
    }

    if (!userMessageContent) return;

    try {
      // Remove the AI message we're regenerating
      const updatedMessages = messages.filter((_, idx) => idx !== messageIndex);
      setMessages(updatedMessages);
      dispatch(sendingStarted());

      // Re-emit the original user message to get a new response
      socket.emit("ai-message", {
        chat: activeChatId,
        content: userMessageContent,
      });
    } catch (error) {
      console.error("Failed to regenerate response:", error);
      dispatch(sendingFinished());
    }
  };

  // Handler for editing messages
  const handleEditMessage = async (messageIndex, newContent, resend = false) => {
    if (!activeChatId) return;

    const messageToEdit = messages[messageIndex];
    if (!messageToEdit) return;

    try {
      // Update local state optimistically
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = {
        ...messageToEdit,
        content: newContent
      };

      // If resending, remove all messages after this one
      if (resend) {
        updatedMessages.splice(messageIndex + 1);
      }

      setMessages(updatedMessages);
      
      // Update messages map
      setMessagesMap(prev => ({
        ...prev,
        [activeChatId]: updatedMessages
      }));

      // If resend is true, send the edited message to AI
      if (resend) {
        dispatch(sendingStarted());
        socket.emit("ai-message", {
          chat: activeChatId,
          content: newContent,
        });
      }

      // Update in backend (if you have an API endpoint for this)
      // await axios.put(`http://localhost:3000/api/chat/messages/${messageToEdit.id}`, {
      //   content: newContent
      // }, { withCredentials: true });
    } catch (error) {
      console.error("Failed to edit message:", error);
      // Restore original message on error
      setMessages(messages);
      setMessagesMap(prev => ({
        ...prev,
        [activeChatId]: messages
      }));
      if (resend) {
        dispatch(sendingFinished());
      }
    }
  };

  return (
    <div className="chat-layout minimal">
      <ChatMobileBar
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        onNewChat={handleNewChat}
      />
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={async (id) => {
          if (!id) return;
          
          try {
            dispatch(selectChat(id));
            setSidebarOpen(false);
            
            // Set loading state and show cached messages if available
            if (messagesMap[id]) {
              setMessages(messagesMap[id]);
            } else {
              setMessages([]); // Clear current messages while loading
              await getMessages(id);
            }
            
          } catch (error) {
            console.error('Failed to select chat:', error);
            setMessages([]);
          }
        }}
        onDeleteChat={deleteHandler}
        onNewChat={handleNewChat}
        onRenameChat={async (chatId, newTitle) => {
          // Redux update
          dispatch(renameChat({ chatId, newTitle }));

          // Backend sync
          try {
            await axios.put(
              `http://localhost:3000/api/chat/${chatId}`,
              { title: newTitle },
              { withCredentials: true }
            );
          } catch (err) {
            console.error("Failed to rename chat:", err);
          }
        }}
        open={sidebarOpen}
        deletingChatId={deletingChatId}
      />

      <main className="chat-main" role="main">
        {messages.length === 0 && (
          <div className="chat-welcome" aria-hidden="true">
            <div className="chip">Early Preview</div>
            <h1>SRG AI</h1>
            <p>
              Ask anything. Paste text, brainstorm ideas, or get quick
              explanations. Your chats stay in the sidebar so you can pick up
              where you left off.
            </p>
          </div>
        )}
        <ChatMessages 
          messages={messages} 
          isSending={isSending} 
          activeChatId={activeChatId}
          onRegenerate={handleRegenerate}
          onEditMessage={handleEditMessage}
        />
        {activeChatId && 
          <ChatComposer
            input={input}
            setInput={(v) => dispatch(setInput(v))}
            onSend={sendMessage}
            isSending={isSending}
          />
        }
      </main>
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
