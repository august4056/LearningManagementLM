// Allow frontend at http://localhost:8080
export default defineEventHandler((event) => {
  setHeader(event, 'Access-Control-Allow-Origin', 'http://localhost:8080');
  setHeader(event, 'Access-Control-Allow-Credentials', 'true');
  setHeader(event, 'Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (getMethod(event) === 'OPTIONS') {
    event.node.res.statusCode = 204;
    return '';
  }
});
