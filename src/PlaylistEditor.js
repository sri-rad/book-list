import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import _ from 'lodash';

export default function PlaylistEditor(props) {
    return (
        <ListGroup className="mb-4" variant="flush">
            {props.items && _.map(props.items, (item, index) =>
                <ListGroup.Item variant="flush" className="bg-light">
                    <Row className="ml-1">
                        <Col>
                            <Row>{_.get(item, 'title')}</Row>
                            <Row><i className="text-muted">{_.get(item, 'authors.0')}</i></Row>
                        </Col>
                        <Col xs="auto">
                            <Row>
                                {(index !== 0 && <Col className="mx-0" xs="auto"><label type="button" className="mx-0" variant="link" onClick={() => {
                                    props.moveUpFn(index);
                                }}>↑</label></Col>)
                                    || <Col className="mx-0" xs="auto"><label type="button" className="mx-0" variant="link"></label></Col>}
                                {(index !== props.items.length - 1 &&
                                    <Col className="mx-0" xs="auto"><label type="button" className="mx-0" variant="link" onClick={() => {
                                        props.moveDownFn(index);
                                    }}>↓</label></Col>)
                                    ||
                                    <Col className="mx-0" xs="auto"><label type="button" className="mx-0" variant="link">-</label></Col>}
                                <Col className="mx-0" xs="auto"><label type="button" className="mx-0" variant="link" onClick={() => {
                                    props.removeFromPlaylistFn(index);
                                }}>✕</label></Col>
                            </Row>
                            <Row className="small float-right" xs="auto">
                                <label type="link text-secondary">Edit description</label>
                            </Row>
                        </Col>
                    </Row>
                </ListGroup.Item>)}
        </ListGroup>);
}