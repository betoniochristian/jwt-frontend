import './Header.css'
import NavBar from "react-bootstrap/NavBar"
import Container from "react-bootstrap/Container"
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <>
            <NavBar bg="primary" variant="dark">
                <Container>
                    
                    <Nav className="mx-auto">
                    <NavBar.Brand to="/"><strong>Employee Management</strong></NavBar.Brand>
                    </Nav>
                </Container>
            </NavBar>
        </>
    )
}

export default Header;