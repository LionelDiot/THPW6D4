import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import Cookies from "js-cookie";

export default function Register()  {
  const saveProfil = (event) => {
    event.preventDefault();
    const formUsername = event.target.elements.usernameArea.value;
    const formEmail = event.target.elements.emailArea.value;
    const formPassword = event.target.elements.passwordArea.value;
    const data = {
      username: formUsername,
      email: formEmail,
      password: formPassword,
    };
    fetch('http://localhost:1337/api/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseData) => {
      const token = responseData.jwt;
      Cookies.set("token", token);
    });
    alert(
      "Profil saved successfully :" +
        data.username +
        " " +
        data.email +
        " " +
        data.password
    );
    }
  return (
    <>
      <h1>Créer ici un nouveau profil</h1>
      <Container>
        
        <Form onSubmit={saveProfil}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="usernameArea"
              placeholder="Enter a username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="emailArea"
              placeholder="Enter an email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordArea"
              placeholder="Enter a valid password (one maj one number 8 char min)."
            />
          </Form.Group>
          <Button type="submit">Créer le profil</Button>
        </Form>
      </Container>
    </>
  );
}