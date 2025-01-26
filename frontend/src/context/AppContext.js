import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Provide the context to components
export const AppProvider = ({ children }) => {
  // State to hold the current logged-in user
  const [user, setUser] = useState(null);

  // State to hold the menu items (initially empty, can be fetched from API)
  const [menuItems, setMenuItems] = useState([]);

  // Simulate fetching user info or checking auth status on mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // Function to log the user in
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user info
  };

  // Function to log the user out
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user info from localStorage
  };

  // Function to set the menu items
  const setItems = (items) => {
    setMenuItems(items);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        menuItems,
        setItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context in other components
export const useAppContext = () => {
  return useContext(AppContext);
};
