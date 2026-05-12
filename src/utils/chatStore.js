// utils/chatStore.js

const MESSAGES_KEY = "chat_messages";
const UNREAD_KEY = "chat_unread";
const RECENT_KEY = "recentChats";

// ---------------- MESSAGES ----------------

export const getMessages = (chatId) => {
  const all = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || {};
  return all[chatId] || [];
};

export const saveMessage = (chatId, message) => {
  const all = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || {};

  if (!all[chatId]) all[chatId] = [];

  all[chatId].push(message);

  localStorage.setItem(MESSAGES_KEY, JSON.stringify(all));
};

// ---------------- UNREAD ----------------

export const getUnread = (userId) => {
  const all = JSON.parse(localStorage.getItem(UNREAD_KEY)) || {};
  return all[userId] || 0;
};

export const addUnread = (senderId, receiverId) => {
  const all = JSON.parse(localStorage.getItem(UNREAD_KEY)) || {};

  all[receiverId] = (all[receiverId] || 0) + 1;

  localStorage.setItem(UNREAD_KEY, JSON.stringify(all));
};

export const clearUnread = (userId) => {
  const all = JSON.parse(localStorage.getItem(UNREAD_KEY)) || {};
  all[userId] = 0;
  localStorage.setItem(UNREAD_KEY, JSON.stringify(all));
};

// ---------------- RECENT CHATS ----------------

export const addRecentChat = (user) => {
  const recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];

  const exists = recent.find((u) => u._id === user._id);

  if (!exists) {
    recent.unshift({
      _id: user._id,
      name: user.name
    });

    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  }
};

export const getRecentChats = () => {
  return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
};