import React from "react";
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from "./api";
import { useNavigate } from "react-router";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  async function getUser(token) {
    const api = USER_GET(token);
    const response = await fetch(api.url, api.options);
    const json = await response.json();
    setData(json);
    setLogin(true);
    console.log(json);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const api = TOKEN_POST({
        username: username,
        password: password,
      });
      const tokenRes = await fetch(api.url, api.options);
      if (!tokenRes.ok) {
        throw new Error(`Error: ${tokenRes.statusText}`);
      }
      const json = await tokenRes.json();
      window.localStorage.setItem("token", json.token);
      await getUser(json.token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const api = TOKEN_VALIDATE_POST(token);
          const response = await fetch(api.url, api.options);
          if (!response.ok) {
            throw new Error("Token inválido.");
          }
          console.log("Token válido");
          await getUser(token);
        } catch (err) {
          await userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, login, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserStorage;
