import React from "react";
import { useParams } from "react-router";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "./PhotoContent";

const Photo = () => {
  const params = useParams();
  const id = params.id;
  const fetchHook = useFetch();

  React.useEffect(() => {
    const api = PHOTO_GET(id);
    fetchHook.request(api.url, api.options);
  }, [fetchHook.request, id]);

  if (fetchHook.error) return <Error error={fetchHook.error} />;
  if (fetchHook.loading) return <Loading />;
  if (fetchHook.data) {
    return (
      <section className="container mainContainer">
        <PhotoContent showPostComments={false} data={fetchHook.data} />
      </section>
    );
  } else {
    return null;
  }
};

export default Photo;
