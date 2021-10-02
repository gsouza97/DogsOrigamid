import React from "react";
import { COMMENT_POST } from "../../api";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({ id, setComentarios }) => {
  const [comment, setComment] = React.useState("");
  const fetchHooke = useFetch();

  function handleChange(event) {
    setComment(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const api = COMMENT_POST(id, { comment });
    const response = (await fetchHooke.request(api.url, api.options)).response;
    const json = (await fetchHooke.request(api.url, api.options)).json;
    if (response.ok) {
      setComment("");
      setComentarios((comments) => [...comments, json]);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente aqui!"
        value={comment}
        onChange={handleChange}
      ></textarea>
      <button className={styles.button}>
        <Enviar />
      </button>
      {fetchHooke.error && <Error error={fetchHooke.error} />}
    </form>
  );
};

export default PhotoCommentsForm;
