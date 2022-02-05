import React from 'react';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import _ from 'lodash';

export default function Playlist(props) {
    return (
        <ListGroup variant="flush">
            {
            props.playlistItems && _.map(props.playlistItems, (item, index) =>
            <ListGroup.Item type="button" variant="flush" onClick={() => {props.setSelectedIndex(index)}} className={index === props.selectedIndex && "bg-light" || ""}>
                <Row className="px-1">
                    {_.get(item, 'title')}
                </Row>
                <Row className="px-1">
                    <i>{_.get(item, 'authors.0')}</i>
                </Row>
            </ListGroup.Item>
            )}
        </ListGroup>);
}