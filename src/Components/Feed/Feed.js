import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

const Feed = ({ userId }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    function infiniteScroll() {
      if (infinite === true) {
        const scroll = window.scrollY;
        const pageHeight = document.body.offsetHeight - window.innerHeight;
        if (scroll > pageHeight * 0.85) {
          setPages((pages) => [...pages, pages.length + 1]);
          setTimeout(() => {}, 800);
        }
      }
    }

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
          page={page}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default Feed;
