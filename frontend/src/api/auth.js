const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.message || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return payload;
};

export const loginWithPassword = (data) =>
  request('/auth/tokens', {
    method: 'POST',
    body: JSON.stringify(data)
  });

export const signUp = (data) =>
  request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  });

export const loginWithGoogle = (googleIdToken) =>
  request('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ googleIdToken })
  });
