import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = () => {
    return (
        
        
        <Navbar className='Navbar' variant="dark" sticky='top'>
            <Container>
                <Navbar.Brand href="/doctrack">
                    <img className='navlogo' src={require('../static/images/logo400white.png')} alt='logo' />
                    {' '}DocTrack
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href="/landing">Home</Nav.Link>
                    <Nav.Link href="#About">About</Nav.Link>
                    <Nav.Link href="#Whitepaper">Whitepaper</Nav.Link>
                    <Nav.Link href="#Contact">Contact</Nav.Link>
                    <Nav.Link ></Nav.Link>
                    <Button className='NavButton' href="/doctrack">Go to App</Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;