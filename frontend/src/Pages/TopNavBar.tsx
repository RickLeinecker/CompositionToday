import { Link } from "react-router-dom";
import { Nav, Navbar, Image, NavDropdown } from 'react-bootstrap';
import useLogout from "../Helper/CustomHooks/useLogout";
import GenericSearch from '../Helper/Generics/GenericSearch';
import { useEffect, useState } from "react";
import { GenericHandlerType } from "../ObjectInterface";
import GenericHandler from "../Handlers/GenericHandler";

export default function TopNavBar() {
    const { handleLogout } = useLogout();
    const [username, setUsername] = useState<string>("");
    const [profilePicPath, setProfilePicPath] = useState<string>("");

    useEffect(() => {
        let temp = window.sessionStorage.getItem("username");

        console.log("useeffect again");
        setUsername(!temp ? "" : temp);

        async function fetchUser(){
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({username: temp}),
                methodType: "POST",
                path: "readUserByUsername",
            }
            
            try{
                let answer = (await GenericHandler(handlerObject));
                if(answer.error.length > 0){
                    return;
                }
                
                const result = await answer.result;
                setProfilePicPath(result.profilePicPath)

            } catch(e: any){
                console.error("Frontend Error: " + e);
            }
        
        }

        fetchUser();
    }, [])

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
                    <Nav.Link as={Link} to={`/profile/${username}`}>
                        <Image
                            className={"d-inline-block align-top me-2"}
                            src={profilePicPath}
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
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}
