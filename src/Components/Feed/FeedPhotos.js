import React from "react";
import styles from "./FeedPhotos.module.css";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";

const FeedPhotos = ({ setModalPhoto }) => {
  const fetchHook = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const api = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      const response = await (
        await fetchHook.request(api.url, api.options)
      ).json;
      console.log(response);
    }
    fetchPhotos();
  }, [fetchHook.request]);

  if (fetchHook.error) {
    return <Error error={fetchHook.error} />;
  }
  if (fetchHook.loading) {
    return <Loading />;
  }
  if (fetchHook.data) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {fetchHook.data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default FeedPhotos;
