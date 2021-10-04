import React from "react";
import { UserContext } from "../../UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = ({ id, comments, showPostComments }) => {
  const [comentarios, setComentarios] = React.useState(() => comments);
  const { login } = React.useContext(UserContext);

  return (
    <>
      <ul className={styles.comments}>
        {comentarios.map((comentario) => (
          <li key={comentario.comment_ID}>
            <b>
              {comentario.comment_author}:{" "}
              <span>{comentario.comment_content}</span>
            </b>
          </li>
        ))}
      </ul>
      {login === true && showPostComments === true && (
        <PhotoCommentsForm id={id} setComentarios={setComentarios} />
      )}
    </>
  );
};

export default PhotoComments;
