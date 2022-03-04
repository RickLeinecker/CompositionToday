import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar, Image, NavDropdown } from 'react-bootstrap';
import useLogout from "../Helper/CustomHooks/useLogout";
import GenericSearch from '../Helper/Generics/GenericSearch';
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { GenericHandlerType } from "../ObjectInterface";
import GenericHandler from "../Handlers/GenericHandler";

type Props = {
    isAdmin: boolean;
    currentUser: any;
}

export default function TopNavBar({ isAdmin, currentUser }: Props) {
    const location: any = useLocation();
    const { handleLogout } = useLogout();
    const [username, setUsername] = useState("");
    const [profileImagePath, setProfileImagePath] = useState("");

    const urlToPage = [
        { url: '/', page: 'Home' },
        { url: '/showcase', page: 'Showcase' },
        { url: '/related-projects', page: 'Related Projects' },
        { url: '/blog', page: 'Blog' }
    ];


    let temp = window.sessionStorage.getItem("username");
    useEffect(() => {
        async function fetchData(user: string) {
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({ username: user }),
                methodType: "POST",
                path: "readUserByUsername",
            }

            try {
                let answer = (await GenericHandler(handlerObject));
                if (answer.error.length > 0) {
                    return;
                }

                setProfileImagePath(answer.result.profilePicPath)
                return await answer.result;
            } catch (e: any) {
                console.error("Frontend Error: " + e);
            }

            return false;
        }


        if (!!temp) {
            setUsername(temp);
            fetchData(temp);
        }

    }, [temp])

    let notInSignUp;

    switch (location.pathname) {
        case "/":
        case "/blog":
        case "/showcase":
        case "/related-projects":
            notInSignUp = true;
            break;
        default:
            if (!currentUser)
                notInSignUp = false;
            else
                if (currentUser.isAnonymous)
                    notInSignUp = false;
                else
                    notInSignUp = true;
    }

    return (
        <>
            {
                notInSignUp &&
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
                                            src={profileImagePath || "img_avatar.png"}
                                            width="40vw"
                                            height="40vh"
                                            roundedCircle
                                        />
                                    </Nav.Link>
                                    <NavDropdown align="end" title={username}>
                                        <NavDropdown.Item as={Link} to={`/profile/${username}`}>My Profile</NavDropdown.Item>
                                        {isAdmin && <NavDropdown.Item as={Link} to={`/dashboard`}>Admin Dashboard</NavDropdown.Item>}
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
            }
        </>
    )
}
