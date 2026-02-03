// utils/localStorageUtil.js

export const setToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error setting localStorage:", err);
  }
};

export const getFromLocalStorage = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error("Error getting localStorage:", err);
    return fallback;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Error removing from localStorage:", err);
  }
};
