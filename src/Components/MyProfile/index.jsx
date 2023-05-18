import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function MyProfile() {
  const [monprofil, setMonprofil] = useState("");
  useEffect(() => {
    if (Cookies.get("token")) {
      fetch("http://localhost:1337/api/users/me", {
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setMonprofil(`email : ${responseData.email}
                        id : ${responseData.id}
                        username : ${responseData.username}
                        créé le : ${responseData.createdAt} `);
        });
    } else {
      setMonprofil(`Vous n'êtes pas connecté. Vous n'avez donc pas de profil`);
    }
  }, []);

  return (
    <>
      <h1>Coucou de Mon profil !</h1>
      <p>{monprofil}</p>
    </>
  );
}
