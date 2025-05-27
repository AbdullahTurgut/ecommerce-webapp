import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="lg" sticky="top" className="nav-bg">
      <Container>
        <Navbar.Brand to={"/"} as={Link}>
          <span className="shop-home">buyNow.com</span>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to={"#"} as={Link}>
              All Products
            </Nav.Link>
          </Nav>

          <Nav className="me-auto">
            <Nav.Link to={"#"} as={Link}>
              Manage Products
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown title="Account">
              <NavDropdown.Item to={"#"} as={Link}>
                My Account
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item to={"#"} as={Link}>
                My Orders
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item to={"#"} as={Link}>
                Logout
              </NavDropdown.Item>

              <NavDropdown.Item to={"#"} as={Link}>
                Login
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
