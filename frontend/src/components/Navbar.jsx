import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Container } from 'reactstrap';
import { useAuthStore } from '../store/useAuthStore.js';

function AppNavbar() {
    const { authUser } = useAuthStore();

    return (
        <Navbar color="dark" dark expand="md">
            <Container>
                <NavbarBrand href="/">MyApp</NavbarBrand>
                <Nav className="ms-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/profile">Profile</NavLink>
                    </NavItem>
                    {authUser ? (
                        <NavItem>
                            <Button color="danger">Logout</Button>
                        </NavItem>
                    ) : (
                        <>
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/signup">Sign Up</NavLink>
                            </NavItem>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;
