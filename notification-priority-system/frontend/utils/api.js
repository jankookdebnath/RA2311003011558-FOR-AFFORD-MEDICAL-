/**
 * API Service Utility
 * Handles all API calls with proper headers and error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://20.207.122.201/evaluation-service';

/**
 * Get authorization token from localStorage
 * @returns {string} Bearer token
 */
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token') || '';
  }
  return '';
};

/**
 * Set authorization token in localStorage
 * @param {string} token Bearer token
 */
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
};

/**
 * Create headers with authorization
 * @returns {Object} Headers object
 */
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`,
});

/**
 * Fetch notifications from API
 * @returns {Promise<Array>} Array of notifications
 */
export const fetchNotifications = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Please re-authenticate');
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.notifications || data || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

/**
 * Authenticate and get token
 * @param {Object} credentials Auth credentials
 * @returns {Promise<string>} Access token
 */
export const authenticate = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    const token = data.access_token;
    setToken(token);
    return token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

/**
 * Test API connectivity
 * @returns {Promise<boolean>} True if connected
 */
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return response.ok;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};
