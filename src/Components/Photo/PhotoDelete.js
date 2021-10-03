import React from "react";
import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({ id }) => {
  const fetchHook = useFetch();

  async function handleClick() {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm === true) {
      const api = PHOTO_DELETE(id);
      const response = (await fetchHook.request(api.url, api.options)).response;
      if (response.ok) {
        window.location.reload();
      }
    }
  }

  return (
    <>
      {fetchHook.loading ? (
        <button disabled className={styles.delete}>
          Deletando
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
