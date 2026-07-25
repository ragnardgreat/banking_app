const configuredApiUrl = import.meta.env.VITE_API_URL || 'https://banking-backend-3-sw35.onrender.com'

export const apiUrl = configuredApiUrl.replace(/\/$/, '')
