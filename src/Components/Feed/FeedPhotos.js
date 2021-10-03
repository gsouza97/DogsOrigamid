import React from "react";
import styles from "./FeedPhotos.module.css";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";

const FeedPhotos = ({ userId, setModalPhoto, setInfinite, page }) => {
  const fetchHook = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const api = PHOTOS_GET({ page: page, total: 6, user: userId });
      const { response, json } = await fetchHook.request(api.url, api.options);
      if (response && response.ok && json.length < 6) {
        setInfinite(false);
        console.log(json);
      }
    }
    fetchPhotos();
  }, [fetchHook.request, userId, page, setInfinite]);

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
