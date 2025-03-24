import React from 'react';
import { Container, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useAuthStore } from '../store/useAuthStore';

function SignUpPage() {
    const { authUser } = useAuthStore();

    return (
        <Container className="mt-5">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Sign Up</CardTitle>
                    {authUser ? (
                        <p>You are already signed up as {authUser.name}.</p>
                    ) : (
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" id="name" placeholder="Enter your name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" id="email" placeholder="Enter your email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" id="password" placeholder="Enter your password" />
                            </FormGroup>
                            <Button color="primary" className="mt-3">Sign Up</Button>
                        </Form>
                    )}
                </CardBody>
            </Card>
        </Container>
    );
}

export default SignUpPage;
