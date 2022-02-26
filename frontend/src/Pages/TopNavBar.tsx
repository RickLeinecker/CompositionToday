import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar, Image, NavDropdown } from 'react-bootstrap';
import useLogout from "../Helper/CustomHooks/useLogout";
import GenericSearch from '../Helper/Generics/GenericSearch';
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function TopNavBar() {
    const location: any = useLocation();
    const { handleLogout } = useLogout();
    const [username, setUsername] = useState("");

    const urlToPage = [
        { url: '/', page: 'Home' },
        { url: '/showcase', page: 'Showcase' },
        { url: '/related-projects', page: 'Related Projects' },
        { url: '/blog', page: 'Blog' }
    ];

    useEffect(() => {
        let temp = window.sessionStorage.getItem("username");

        setUsername(!temp ? "" : temp);
    }, [])

    return (
        <Navbar className="px-5" bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Composition Today</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "space-between" }}>
                <Nav className="ms-5 me-5">
                    {
                        urlToPage.map((u2p) => (
                            <Nav.Link
                                style={{ textDecoration: location.pathname === u2p.url ? 'underline' : '' }}
                                className="me-2"
                                as={Link}
                                to={u2p.url}
                            >
                                {u2p.page}
                            </Nav.Link>
                        ))
                    }
                </Nav>

                <Nav style={{ marginRight: "3rem" }}>
                    <GenericSearch placeHolder="Search Composers" apiEndpoint='searchComposers' getPayload={(value: any) => { }} />
                </Nav>

                <Nav className="ms-5">

                    {getAuth().currentUser?.isAnonymous ?
                        <>
                            <Nav.Link className="me-2" as={Link} to="/registration"> Sign Up </Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link as={Link} to={`/profile/${username}`}>
                                <Image
                                    className={"d-inline-block align-top me-2"}
                                    src="img_avatar.png"
                                    width="40vw"
                                    height="40vh"
                                    roundedCircle
                                />
                            </Nav.Link>
                            <NavDropdown align="end" title={username}>
                                <NavDropdown.Item as={Link} to={`/profile/${username}`}>My Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}
