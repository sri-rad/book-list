import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';

export default function SearchResult(props) {
    return (
        <ListGroup variant="flush" className="mb-4">
            {props.results && _.map(props.results, (result) =>
                <ListGroup.Item variant="flush">
                    <Row>
                        <Col>
                        <Row>{_.get(result, 'volumeInfo.title')}</Row>
                        <Row><i className="text-muted">{_.get(result, 'volumeInfo.authors.0')}</i></Row>
                        </Col>
                        {(!props.idMap[result['id']] && <Col xs="auto"><label type="button" className="text-primary" variant="link" onClick={()=> {
                            let item = {};
                            item['id'] = result['id'];
                            item['title'] = _.get(result, 'volumeInfo.title');
                            item['authors'] = _.get(result, 'volumeInfo.authors');
                            item['description'] = _.get(result, 'volumeInfo.description');
                            props.addToPlaylistFn(item);
                        }}>Add</label></Col>) || <Col xs="auto"><label type="button" className="text-success">Added</label></Col>}
                    </Row>
                </ListGroup.Item>)}
        </ListGroup>);
}