// api.js
const BASE_URL = 'http://127.0.0.1:8080'; // API base URL (assuming it's running locally on this port)

export const fetchMenuItems = async () => {
  try {
    // Placeholder for the actual API call
    const response = await fetch(`${BASE_URL}/menu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }

    const data = await response.json();
    return data; // Return the list of menu items from the API
  } catch (error) {
    console.error(error);
    alert('Error fetching menu items');
    return []; // Return an empty array in case of error
  }
};

export const addMenuItem = async (item) => {
  try {
    // Placeholder for the actual API call
    const response = await fetch(`${BASE_URL}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error('Failed to add menu item');
    }

    const data = await response.json();
    return data; // Return the newly added menu item
  } catch (error) {
    console.error(error);
    alert('Error adding menu item');
    return null; // Return null in case of error
  }
};

export const removeMenuItem = async (id) => {
  try {
    // Placeholder for the actual API call
    const response = await fetch(`${BASE_URL}/menu/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove menu item');
    }

    return true; // Return true if the item was successfully removed
  } catch (error) {
    console.error(error);
    alert('Error removing menu item');
    return false; // Return false in case of error
  }
};
