const defaultOrigins = ['http://localhost:8080'];

function getAllowedOrigins() {
  const raw = process.env.CORS_ALLOWED_ORIGINS || '';
  const list = raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  return list.length > 0 ? list : defaultOrigins;
}

export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, 'origin');
  const allowedOrigins = getAllowedOrigins();
  if (origin && allowedOrigins.includes(origin)) {
    setHeader(event, 'Access-Control-Allow-Origin', origin);
  }
  setHeader(event, 'Access-Control-Allow-Credentials', 'true');
  setHeader(event, 'Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (getMethod(event) === 'OPTIONS') {
    event.node.res.statusCode = 204;
    return '';
  }
});
