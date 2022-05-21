export const BASE_API_HOST = import.meta.env.VITE_BASE_API_HOST || 'http://localhost:8000';
export const FINTOC_PUBLIC_KEY = import.meta.env.VITE_FINTOC_PUBLIC_KEY || '';

export const PING_PATH = '/health-check';
export const LINK_CREATED_WEBHOOK_PATH = '/links';

export const POLLING_INTERVAL_IN_SECONDS = 10;
