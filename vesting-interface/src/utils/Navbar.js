import React from 'react';
import {
    classnames,
    Container,
    Nav,
    NavItem,
    NavLink,
    Link,
} from 'tailwindcss/react';

const Navbar = () => {
    return (
        <Container>
            <Nav>
                <NavItem>
                    <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/register-organization-token">Register Organization</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/add-stakeholder-and-vesting">Add Stakeholder</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/make-withdrawal">Whitelist Address(es)</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/whitelist-addresses">Withdrawals</NavLink>
                </NavItem>
            </Nav>
        </Container>
    );
};

export default Navbar;
