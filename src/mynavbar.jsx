import { Nav, Navbar, Container, Button } from "react-bootstrap";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./Store/authSlice";

export default function MyNavbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    redirect("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>NetworkApp</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <LinkContainer to="/myprofile">
                  <Nav.Link>Mon Profil</Nav.Link>
                </LinkContainer>
                <Button variant="danger" onClick={handleLogout}>
                  Se déconnecter
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to="/register">
                  <Nav.Link>S'inscrire</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Se connecter</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
