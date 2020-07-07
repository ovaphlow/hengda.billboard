export default function useAuth() {
  const auth = JSON.parse(sessionStorage.getItem('mis-auth'));
  return auth;
}
