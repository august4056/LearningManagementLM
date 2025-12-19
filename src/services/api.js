const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api';

async function handleResponse(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API request failed with status ${response.status}`);
  }
  return response.json();
}

export async function fetchTrainings() {
  const response = await fetch(`${API_BASE_URL}/trainings`);
  return handleResponse(response);
}

export async function fetchTrainingById(id) {
  const response = await fetch(`${API_BASE_URL}/trainings/${id}`);
  return handleResponse(response);
}

export async function fetchParticipants() {
  const response = await fetch(`${API_BASE_URL}/participants`);
  return handleResponse(response);
}

export async function fetchParticipantById(id) {
  const response = await fetch(`${API_BASE_URL}/participants/${id}`);
  return handleResponse(response);
}
