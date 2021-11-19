import { Link } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';
import GenericSearch from '../Helper/Generics/GenericSearch';

export default function TopNavBar() {
    return (
        <Navbar className="px-5" bg="light" expand="lg">
            <Navbar.Brand href="/">Composition Today</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/showcase">Showcase</Nav.Link>
                    <Nav.Link as={Link} to="/related-projects">Related Projects</Nav.Link>
                    <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                </Nav>

                <GenericSearch />

                <Nav>
                    <Nav.Link href="/my-profile">
                        {/* <Image
                            className={"d-inline-block align-top"}
                            style={{ width: "7%" }}
                            src="img_avatar.png"
                            roundedCircle
                        /> */}
                        <img
                            alt=""
                            src="/img_avatar.png"
                            width="35vw"
                            height="35vh"
                            className="d-inline-block align-top"
                        />
                        My Profile
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}
