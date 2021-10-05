import React from "react";
import { PASSWORD_LOST } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginPasswordLost = () => {
  const email = useForm();
  const fetchHook = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (email.validate()) {
      const api = PASSWORD_LOST({
        login: email.value,
        url: window.location.href.replace("perdeu", "resetar"),
      });
      await fetchHook.request(api.url, api.options);
    }
  }

  return (
    <section>
      <Head title="Perdeu a Senha" />
      <h1 className="title">Perdeu a senha?</h1>
      {fetchHook.data ? (
        <p style={{ color: "#4c1" }}>{fetchHook.data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="Email / Usuário"
            type="text"
            name="email"
            value={email.value}
            onChange={email.onChange}
            error={email.error}
            onBlur={email.onBlur}
          />
          {fetchHook.loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}

      {fetchHook.error && <Error error={fetchHook.error} />}
    </section>
  );
};

export default LoginPasswordLost;
