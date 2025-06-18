import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUserCart } from "../../store/features/cartSlice";
import { logoutUser } from "../services/authService";

const NavBar = () => {
  const dispatch = useDispatch();
  const userRoles = useSelector((state) => state.auth.roles);
  const userId = localStorage.getItem("userId");
  const cart = useSelector((state) => state.cart);

  const handleLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserCart(userId));
    }
  }, [dispatch, userId]);

  return (
    <Navbar expand="lg" sticky="top" className="nav-bg">
      <Container>
        <Navbar.Brand to={"/"} as={Link}>
          <span className="shop-home">buyNow.com</span>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to={"/products"} as={Link}>
              All Products
            </Nav.Link>
          </Nav>

          {userRoles.includes("ROLE_ADMIN") && (
            <Nav className="me-auto">
              <Nav.Link to={"/add-product"} as={Link}>
                Manage Shop
              </Nav.Link>
            </Nav>
          )}

          <Nav className="ms-auto">
            <NavDropdown title="Account">
              {userId ? (
                <>
                  <NavDropdown.Item
                    to={`/user-profile/${userId}/profile`}
                    as={Link}
                  >
                    My Account
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item to={"#"} onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item to={"/login"} as={Link}>
                    Login
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            {userId && (
              <Link
                to={`/user/${userId}/my-cart`}
                className="nav-link me-1 position-relative"
              >
                <FaShoppingCart className="shopping-cart-icon" />
                {cart.items.length > 0 ? (
                  <div className="badge-overlay">{cart.items.length}</div>
                ) : (
                  <div className="badge-overlay">0</div>
                )}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
