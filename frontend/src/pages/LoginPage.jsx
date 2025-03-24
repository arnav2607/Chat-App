import React from 'react';
import { Container, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { useAuthStore } from '../store/useAuthStore';

function LoginPage() {
    const { authUser } = useAuthStore();

    return (
        <Container className="mt-5">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Login Page</CardTitle>
                    {authUser ? (
                        <p>Welcome back, {authUser.name}!</p>
                    ) : (
                        <>
                            <p>Please log in to access your account.</p>
                            <Button color="primary">Login</Button>
                        </>
                    )}
                </CardBody>
            </Card>
        </Container>
    );
}

export default LoginPage;
