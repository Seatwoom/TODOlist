import { API_BASE_URL } from '../config';

export const fetchTasks = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
export const saveTasks = async (tasks, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ tasks: tasks }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from server:', errorText);
      throw new Error('Failed to save tasks');
    }
  } catch (error) {
    console.error('Failed to save tasks:', error);
    throw error;
  }
};
