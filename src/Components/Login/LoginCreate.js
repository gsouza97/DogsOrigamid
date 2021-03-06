import React from "react";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");

  const context = React.useContext(UserContext);
  const fetchHook = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    const api = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await fetchHook.request(api.url, api.options);
    if (response.ok) {
      await context.userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Cadastre-se" />
      <h1 className="title">Cadastre-se</h1>
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
          label="Email"
          type="text"
          name="email"
          value={email.value}
          onChange={email.onChange}
          error={email.error}
          onBlur={email.onBlur}
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
        {fetchHook.loading === true ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={fetchHook.error} />
      </form>
    </section>
  );
};

export default LoginCreate;
