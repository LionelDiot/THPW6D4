import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authSlice";

export default function LogIn() {
  const dispatch = useDispatch();
  const authenticate = (event) => {
    event.preventDefault();
    const formUsername = event.target.elements.usernameArea.value;
    const formPassword = event.target.elements.passwordArea.value;
    const data = {
      identifier: formUsername,
      password: formPassword,
    };
    fetch("http://localhost:1337/api/auth/local", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Authentication failed");
        }
      })
      .then((responseData) => {
        const token = responseData.jwt;
        Cookies.set("token", token);
        dispatch(login({ token }));
        console.log(token);
        alert("Connexion réussie");
      })
      .catch((error) => {
        console.log("Authentication error:", error);
        alert("Authentication failed");
      });
  };
  return (
    <>
      <h1>Connecte toi ici</h1>
      <Container>
        <Form onSubmit={authenticate}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="usernameArea"
              placeholder="Enter your username or email"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordArea"
              placeholder="Enter your password."
            />
          </Form.Group>
          <Button type="submit">Connexion</Button>
        </Form>
      </Container>
    </>
  );
}
