import React from "react";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import styles from "./FeedModal.module.css";

const FeedModal = ({ photo, setModalPhoto }) => {
  const fetchHook = useFetch();

  React.useEffect(() => {
    const api = PHOTO_GET(photo.id);
    fetchHook.request(api.url, api.options);
  }, [photo, fetchHook.request]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {fetchHook.error && <Error error={fetchHook.error} />}
      {fetchHook.loading && <Loading />}
      {fetchHook.data && <PhotoContent data={fetchHook.data} />}
    </div>
  );
};

export default FeedModal;
