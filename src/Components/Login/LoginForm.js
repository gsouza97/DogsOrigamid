import React from "react";
import { Link } from "react-router-dom";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const context = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      context.userLogin(username.value, password.value);
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
        {context.loading ? (
          <Button disabled>Carregando</Button>
        ) : (
          <Button>Entrar</Button>
        )}

        {context.error && <p>{context.error}</p>}
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
