import API from "../API/apiCalls";

const url = 'http://localhost:8088/users';

const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const saveUserToJsonServer = (user) => {
    API.post("users", user)
    .then(res => res.json())
    .then(newUser => {
      setUserInLocalStorage(newUser);
      return newUser;
    });
}

export const getUser = (userId) => {
    API.get("users", userId)
    .then(res => res.json());
}

export const login = (email) => {
  return fetch(`${url}?email=${email}`)
    .then(res => res.json())
    .then(matchingUsers => {
      if (!matchingUsers.length) {
        alert('No user exists with that email address');
        return;
      }
      const user = matchingUsers[0];
      setUserInLocalStorage(user);
      return user;
    });
}

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');

  if (!user) return null;

  return JSON.parse(user);
}

export const logout = () => {
  localStorage.removeItem('user');
}