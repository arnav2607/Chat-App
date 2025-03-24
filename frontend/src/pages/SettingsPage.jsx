import React from 'react';
import { Container, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useAuthStore } from '../store/useAuthStore';

function SettingsPage() {
    const { authUser } = useAuthStore();

    return (
        <Container className="mt-5">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Settings Page</CardTitle>
                    {authUser ? (
                        <>
                            <CardText><strong>Username:</strong> {authUser.name}</CardText>
                            <CardText><strong>Email:</strong> {authUser.email}</CardText>
                            <Button color="primary" className="mt-3">Update Profile</Button>
                            <Button color="danger" className="mt-3 ms-2">Logout</Button>
                        </>
                    ) : (
                        <CardText>You are not logged in. Please log in to access settings.</CardText>
                    )}
                </CardBody>
            </Card>
        </Container>
    );
}

export default SettingsPage;
