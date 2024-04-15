import { useSelector } from "react-redux";
import { getLoggedUser } from "../../../redux/userRedux";

const { Navbar, Container, NavbarBrand, Nav } = require("react-bootstrap");
const { NavLink } = require("react-router-dom");

const NavBar = () => {
  const loggedUser = useSelector(getLoggedUser);
  return (
    <section>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="mt-4 mb-4 rounded"
      >
        <Container>
          <NavbarBrand as={NavLink} to="/">
            AdsBoard.app
          </NavbarBrand>
          <Nav className="d-flex justify-content-end">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {!loggedUser && (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
            {loggedUser && (
              <>
                <Nav.Link as={NavLink} to="/ad/add">
                  New Ad
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </section>
  );
};

export default NavBar;
