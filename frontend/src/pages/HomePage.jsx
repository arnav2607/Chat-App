import React from 'react';
import { Container, Card, CardBody, CardTitle } from 'reactstrap';
import { useAuthStore } from '../store/useAuthStore';

function HomePage() {
    const { authUser } = useAuthStore();

    return (
        <Container className="mt-5">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Welcome to the Home Page</CardTitle>
                    <p>{authUser ? `Hello, ${authUser.name}!` : "You are not logged in."}</p>
                </CardBody>
            </Card>
        </Container>
    );
}

export default HomePage;
