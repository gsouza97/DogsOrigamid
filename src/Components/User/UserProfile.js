import React from "react";
import { useParams } from "react-router";
import Feed from "../Feed/Feed";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const params = useParams();
  const user = params.user;

  return (
    <section className="container mainContainer">
      <h1 className="title">{user}</h1>
      <Feed user={user} />
    </section>
  );
};

export default UserProfile;
