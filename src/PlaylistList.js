import React from 'react';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

export default function PlaylistList(props) {
    return (
        <ListGroup variant="flush">
            <ListGroup.Item variant="flush">
                <Row className="text-dark">
                    <b>
                        <Link to="/list/5959">wealth, not status</Link></b>
                </Row>
                <Row className="text-muted">books recommended naval
                </Row>
                <Row>
                    <i>from&nbsp;<Link to="/me" className="text-muted">sri-rad</Link></i>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item variant="flush">
                <Row className="text-dark">
                    <b>
                        <Link to="/list/5959">tyler, the reader</Link></b>
                </Row>
                <Row className="text-muted">
                    tyler the creator's favorites that he's talked about much
                </Row>
                <Row>
                    <i>from&nbsp;<Link to="/me" className="text-muted">sri-rad</Link></i>
                </Row>
            </ListGroup.Item>
        </ListGroup>);
}