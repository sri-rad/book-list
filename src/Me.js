import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useOktaAuth } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PlaylistList from './PlaylistList';

export default function Me() {
    const { oktaAuth, authState } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

    function logout() {
        oktaAuth.signOut();
    }

    useEffect(() => {
        oktaAuth.getUser().then(info => {
            setUserInfo(info);

        });
    }, [authState, oktaAuth]);

    return (
        <Container>
            <Row className="mt-5">
                <Col md={4} xs={12}>
                    <Row className="m-0 p-0">
                        <Col><Card>
                            {/* <Card.Img variant="top" src="http://books.google.com/books/content?id=kSGVAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" style={{'width': '10%'}}/> */}
                            <Card.Body>
                                <Card.Title className="text-center">{userInfo && userInfo.name || "-"}</Card.Title>
                                <Card.Text>
                                    <Row className="justify-content-center">
                                        <Link to="/create" >Create a playlist</Link>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <a href="#!" onClick={logout}>Logout</a>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card></Col>
                    </Row>
                </Col>
                <Col md={1}></Col>
                <Col className="mt-3 mt-md-0" md={3} mx-md-1 xs={12}>
                    <Row className="justify-content-center"><h4>saved playlists</h4></Row>
                    <Row className="justify-content-center">
                        <PlaylistList list={{}}></PlaylistList>
                    </Row>
                </Col>
                <Col md={1}></Col>
                <Col className="mt-3 mt-md-0" md={3} xs={12}>
                    <Row className="justify-content-center"><h4>your playlists</h4></Row>
                    <Row className="justify-content-center">
                        <PlaylistList list={{}}></PlaylistList>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};