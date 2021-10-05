import React from "react";
import { useNavigate } from "react-router";
import { PASSWORD_RESET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
  const [email, setEmail] = React.useState("");
  const [key, setKey] = React.useState("");
  const password = useForm();
  const fetchHook = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const email = params.get("login");
    if (key) {
      setKey(key);
    }
    if (email) {
      setEmail(email);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const api = PASSWORD_RESET({
        login: email,
        key: key,
        password: password.value,
      });
      const { response } = await fetchHook.request(api.url, api.options);
      if (response.ok) {
        navigate("/login");
      }
    }
  }

  return (
    <div>
      <Head title="Resetar a senha" />
      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          value={password.value}
          onChange={password.onChange}
          error={password.error}
          onBlur={password.onBlur}
        />
        {fetchHook.loading ? (
          <Button disabled>Resetando</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      {fetchHook.error && <Error error={fetchHook.error} />}
    </div>
  );
};

export default LoginPasswordReset;
