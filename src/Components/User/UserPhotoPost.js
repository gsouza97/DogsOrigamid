import React from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import { useNavigate } from "react-router";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("positiveNumber");
  const idade = useForm("positiveNumber");
  const [img, setImg] = React.useState({});
  const fetchHook = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (fetchHook.data) {
      navigate("/conta");
    }
  }, [fetchHook.data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);
    const token = window.localStorage.getItem("token");
    const api = PHOTO_POST(formData, token);
    fetchHook.request(api.url, api.options);
  }

  function handleImgChange(event) {
    setImg({
      preview: URL.createObjectURL(event.target.files[0]),
      raw: event.target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          type="text"
          name="nome"
          value={nome.value}
          onChange={nome.onChange}
          error={nome.error}
          onBlur={nome.onBlur}
        />
        <Input
          label="Peso"
          type="number"
          name="peso"
          value={peso.value}
          onChange={peso.onChange}
          error={peso.error}
          onBlur={peso.onBlur}
        />
        <Input
          label="Idade"
          type="number"
          name="idade"
          value={idade.value}
          onChange={idade.onChange}
          error={idade.error}
          onBlur={idade.onBlur}
        />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {fetchHook.loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        {fetchHook.error && <Error error={fetchHook.error} />}
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
