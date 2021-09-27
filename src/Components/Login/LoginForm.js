import React from "react";
import { Link } from "react-router-dom";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import { TOKEN_POST, USER_GET } from "../../api";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);

  async function getUser(token) {
    const api = USER_GET(token);
    const response = await fetch(api.url, api.options);
    const json = await response.json();
    console.log(json);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const api = TOKEN_POST({
        username: username.value,
        password: password.value,
      });
      const response = await fetch(api.url, api.options);
      const json = await response.json();
      window.localStorage.setItem("token", json.token);
      getUser(json.token);

      console.log(json);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          value={username.value}
          onChange={username.onChange}
          error={username.error}
          onBlur={username.onBlur}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          value={password.value}
          onChange={password.onChange}
          error={password.error}
          onBlur={password.onBlur}
        />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
