import React from 'react';
import { Container, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useAuthStore } from '../store/useAuthStore';

function ProfilePage() {
    const { authUser } = useAuthStore();

    return (
        <Container className="mt-5">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Profile Page</CardTitle>
                    {authUser ? (
                        <>
                            <CardText><strong>Name:</strong> {authUser.name}</CardText>
                            <CardText><strong>Email:</strong> {authUser.email}</CardText>
                        </>
                    ) : (
                        <CardText>You are not logged in. Please log in to view your profile.</CardText>
                    )}
                </CardBody>
            </Card>
        </Container>
    );
}

export default ProfilePage;
