import Cookies from 'js-cookie';

const TokenKey = 'userToken';
const IdKey = 'userId';
const RoleKey = 'userRoles';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getId() {
  return Cookies.get(IdKey);
}

export function setId(id) {
  return Cookies.set(IdKey, id);
}

export function removeId() {
  return Cookies.remove(IdKey);
}

export function getRoles() {
  return localStorage.getItem(RoleKey).split(',');
}

export function setRoles(roles) {
  return localStorage.setItem(RoleKey, roles);
}

export function removeRoles() {
  return localStorage.removeItem(RoleKey);
}
