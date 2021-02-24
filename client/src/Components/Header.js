import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';



const Header = () => {
    return (
        <Navbar className='mb-3'>
            <Container>

                <LinkContainer to='/'>
                    <Navbar.Brand>
                        Needful Things
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>

                        <LinkContainer to='/signup'>
                            <Nav.Link href='/signup'>
                                Sign up
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/signin'>
                            <Nav.Link href='/signin'>
                                Sign in
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/shop'>
                            <Nav.Link href='/shop'>
                                Shop
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/cart'>
                            <Nav.Link href='/cart'>
                                Cart
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/about'>
                            <Nav.Link href='/about'>
                                About
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
