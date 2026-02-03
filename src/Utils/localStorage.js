// utils/localStorage.js

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("bookingsState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Load state error:", err);
    return undefined;
  }
  
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("bookingsState", serializedState);
  } catch (err) {
    console.warn("Save state error:", err);
  }
};
