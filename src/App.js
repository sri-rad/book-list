import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListCreator from './ListCreator';
import Player from './Player';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, BrowserRouter as Router, Switch, useHistory, Link } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Login from './Login';
import Protected from './Protected';
import { oktaAuthConfig, oktaSignInConfig } from './config';
import Me from './Me';
import PlaylistList from './PlaylistList';
import Playlist from './Playlist';
import './App.css';

const oktaAuth = new OktaAuth(oktaAuthConfig);

function AppWithRouterAccess() {
    const history = useHistory();

    const customAuthHandler = () => {
        history.push('/login');
    };

    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri, window.location.origin));
    };

    return (
        <Security
            oktaAuth={oktaAuth}
            onAuthRequired={customAuthHandler}
            restoreOriginalUri={restoreOriginalUri}
        >
            <Switch>
                <SecureRoute path='/me' component={Me} />
                <Route path='/login/callback' component={LoginCallback} />
                <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
                <SecureRoute path='/protected' component={Protected} />
                <SecureRoute path="/create" component={ListCreator} />
                <Route path="/list/:id">
                    <Player></Player>
                </Route>
                <Route path="/">
                    <Row className="mt-3 m-1">
                        <Col xs={12} md={5} className="mt-2">
                            <Row className="justify-content-center"><h4>top playlists</h4></Row>
                            <Row className="justify-content-center text-center">
                                <PlaylistList list={{}}></PlaylistList>
                            </Row>
                        </Col>
                        <Col xs={0} md={2}></Col>
                        <Col xs={12} md={5} className="mt-2">
                            <Row className="justify-content-center"><h4>new playlists</h4></Row>
                            <Row className="justify-content-center">
                                <PlaylistList list={{}}></PlaylistList>
                            </Row>
                        </Col>
                    </Row>
                </Route>
            </Switch>
        </Security>
    );
}


export default function App() {
    return (
        <Router>
            <Container fluid className="justify-content-center main_section">
                <Row>
                    <Col md={3} xs={0}></Col>
                    <Col md={6} xs={12} className="text-center"><h1><Link to="/" className="text-decoration-none text-dark">booklist</Link></h1></Col>
                    <Col md={3} xs={9} className="float-right my-3 d-none d-sm-block">
                        <Row>
                            <Col className="float-right text-center mx-0"><Link to="/create">Create Playlist</Link></Col>
                            <Col className="float-right text-center mx-0"><Link to="/me">Profile</Link></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center text-muted font-italic"><h4>playlists for books</h4></Col>
                </Row>
                <Row className="d-block d-sm-none">
                    <Col className="text-center mx-0"><Link to="/create">Create Playlist</Link></Col>
                    <Col className="text-center mx-0"><Link to="/me">Profile</Link></Col>
                </Row>
                <AppWithRouterAccess />
            </Container>
        </Router>
    )
}