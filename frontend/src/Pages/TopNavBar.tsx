import { Link } from "react-router-dom";
import { Nav, Navbar, Image, NavDropdown } from 'react-bootstrap';
import useLogout from "../Helper/CustomHooks/useLogout";
import GenericSearch from '../Helper/Generics/GenericSearch';

export default function TopNavBar() {
    const { handleLogout } = useLogout();
    return (
        <Navbar className="px-5" bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Composition Today</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-5 me-5">
                    <Nav.Link className="me-2" as={Link} to="/showcase">Showcase</Nav.Link>
                    <Nav.Link className="me-2" as={Link} to="/related-projects">Related Projects</Nav.Link>
                    <Nav.Link className="me-2" as={Link} to="/blog">Blog</Nav.Link>
                </Nav>

                <Nav className="ms-5">
                    <GenericSearch />
                </Nav>

                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/my-profile">
                        <Image
                            className={"d-inline-block align-top me-2"}
                            src="img_avatar.png"
                            width="40vw"
                            height="40vh"
                            roundedCircle
                        />
                    </Nav.Link>
                    <NavDropdown align="end" title="[Username]">
                        <NavDropdown.Item as={Link} to="/my-profile">My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}
