import React from "react";
import { Link } from "react-router-dom";
import PhotoComments from "./PhotoComments";
import styles from "./PhotoContent.module.css";

const PhotoContent = ({ data }) => {
  return (
    <div className={styles.photo}>
      <div>
        <img
          className={styles.img}
          src={data.photo.src}
          alt={data.photo.title}
        />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            <Link to={`/perfil/${data.photo.author}`}>
              @{data.photo.author}
            </Link>
            <span className={styles.visualizacoes}>{data.photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${data.photo.id}`}>{data.photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{data.photo.peso} kg</li>
            <li>{data.photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={data.photo.id} comments={data.photo.comments} />
    </div>
  );
};

export default PhotoContent;
