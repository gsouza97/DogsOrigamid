import React from "react";
import { TOKEN_POST, USER_GET } from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function getUser(token) {
    const api = USER_GET(token);
    const response = await fetch(api.url, api.options);
    const json = await response.json();
    setData(json);
    setLogin(true);
    console.log(json);
  }

  async function userLogin(username, password) {
    const api = TOKEN_POST({
      username: username,
      password: password,
    });
    const tokenRes = await fetch(api.url, api.options);
    const json = await tokenRes.json();
    window.localStorage.setItem("token", json.token);
    getUser(json.token);
  }

  return (
    <UserContext.Provider value={{ userLogin, data, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserStorage;
