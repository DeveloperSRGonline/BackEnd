import { createSlice, nanoid } from "@reduxjs/toolkit";

// helpers
const createEmptyChat = (title) => ({
  id: nanoid(),
  title: title || "New Chat",
  messages: [],
});

// Initial state definition
const initialState = {
  chats: [],
  activeChatId: null,
  isSending: false,
  input: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  extraReducers: (builder) => {
    builder.addCase('chat/reset', (state) => {
      // Reset to initial state
      return initialState;
    });
  },
  reducers: {
    ensureInitialChat(state) {
      if (state.chats.length === 0) {
        const chat = createEmptyChat();
        state.chats.unshift(chat);
        state.activeChatId = chat.id;
      }
    },
    startNewChat: {
      reducer(state, action) {
        const { _id, title } = action.payload;
        // Ensure we have a valid array to work with
        if (!Array.isArray(state.chats)) {
          state.chats = [];
        }
        state.chats.unshift({ _id, title: title || "New Chat", messages: [] });
        state.activeChatId = _id;
        state.input = ""; // Clear any existing input
        state.isSending = false; // Reset sending state
      },
    },
    selectChat(state, action) {
      state.activeChatId = action.payload;
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    sendingStarted(state) {
      state.isSending = true;
    },
    sendingFinished(state) {
      state.isSending = false;
    },
    setChats(state, action) {
      state.chats = Array.isArray(action.payload) 
        ? action.payload.map((c) => ({
            _id: c._id,
            title: c.title || "New Chat",
            messages: c.messages || [], // ensure messages array always exist
          }))
        : [];
      
      // Reset active chat if no chats exist
      if (state.chats.length === 0) {
        state.activeChatId = null;
      }
    },
    addUserMessage: {
      reducer(state, action) {
        const { chatId, message } = action.payload;
        const chat = state.chats.find((c) => c.id === chatId);
        if (!chat) return;
        if (chat.messages.length === 0) {
          chat.title =
            message.content.slice(0, 40) +
            (message.content.length > 40 ? "…" : "");
        }
        chat.messages.push(message);
      },
      prepare(chatId, content) {
        return {
          payload: {
            chatId,
            message: { id: nanoid(), role: "user", content, ts: Date.now() },
          },
        };
      },
    },
    addAIMessage: {
      reducer(state, action) {
        const { chatId, message } = action.payload;
        const chat = state.chats.find((c) => c.id === chatId);
        if (!chat) return;
        chat.messages.push(message);
      },
      prepare(chatId, content, error = false) {
        return {
          payload: {
            chatId,
            message: {
              id: nanoid(),
              role: "ai",
              content,
              ts: Date.now(),
              ...(error ? { error: true } : {}),
            },
          },
        };
      },
    },
    renameChat: {
      reducer(state, action) {
        const { chatId, newTitle } = action.payload;
        const chat = state.chats.find((c) => c._id === chatId);
        if (chat) {
          chat.title = newTitle;
        }
      },
    },
    setMessagesForChat: {
      reducer(state, action) {
        const { chatId, messages } = action.payload;
        const chat = state.chats.find((c) => c._id === chatId);
        if (chat) {
          chat.messages = messages;
        }
      },
    },
    onDeleteChat: {
      reducer(state, action) {
        const { chatId } = action.payload;
        state.chats = state.chats.filter((c) => c._id !== chatId);
        if (state.activeChatId === chatId) {
          state.activeChatId = null;
        }
      },
    },
  },
});

export const {
  ensureInitialChat,
  startNewChat,
  selectChat,
  setInput,
  sendingStarted,
  sendingFinished,
  addUserMessage,
  addAIMessage,
  setChats,
  renameChat,
  setMessagesForChat,
  onDeleteChat,
} = chatSlice.actions;

export default chatSlice.reducer;
