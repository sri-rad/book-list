import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SearchResult from './SearchResult';
import axios from 'axios';
import _ from 'lodash';
import PlaylistEditor from './PlaylistEditor';
import ReactHtmlParser from 'react-html-parser';


export default function ListCreator(props) {

    let [query, setQuery] = useState('');
    let [displayQuery, setDisplayQuery] = useState('');
    let [resultItems, setResultItems] = useState(null);
    let [playlistItems, setPlaylistItems] = useState([]);
    let [playlistName, setPlaylistName] = useState('');
    let [playlistDesc, setPlaylistDesc] = useState('');
    let [idMap, setIdMap] = useState({});

    function handleChange(e) {
        setQuery(e.target.value);
    }

    function handlePlaylistDescChange(e) {
        setPlaylistDesc(e.target.value);
    }

    function handlePlaylistNameChange(e) {
        setPlaylistName(e.target.value);

    }
    function search() {
        var config = {
            method: 'get',
            url: `https://www.googleapis.com/books/v1/volumes?q=${query}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let items = _.map(response.data.items, _.partialRight(_.pick, ['id', 'volumeInfo.title', 'volumeInfo.authors', 'volumeInfo.description']));
                setResultItems(items);
                setDisplayQuery(query);
            })
            .catch(function (error) {
                setResultItems([]);
                setDisplayQuery(query);
            });

    }

    function createPlaylist() {
        console.log(`Creating playlist ${playlistName} with ${playlistItems.length} books`);
        console.log(`Desc: ${playlistDesc}`);

        // setmytext(JSON.stringify(playlistItems));
    }

    function addToPlaylist(item) {
        setPlaylistItems([...playlistItems, item]);

        let newIdMap = _.assign({}, idMap);
        newIdMap[item['id']] = true;
        setIdMap(newIdMap);
    }

    function removeFromPlaylist(index) {
        let id = playlistItems[index]['id'];
        let items = [...playlistItems];
        _.pullAt(items, index);
        setPlaylistItems(items);

        let newIdMap = _.assign({}, idMap);
        newIdMap[id] = false;
        setIdMap(newIdMap);
    }

    function moveUp(index) {
        let items = [...playlistItems];
        items[index] = playlistItems[index - 1];
        items[index - 1] = playlistItems[index];
        setPlaylistItems(items);
    }

    function moveDown(index) {
        let items = [...playlistItems];
        items[index] = playlistItems[index + 1];
        items[index + 1] = playlistItems[index];
        setPlaylistItems(items);
    }

    return (
        <div>
            <Row className="mt-5">
                <Col xs={7}>
                    <Row className="justify-content-center">
                        <Col>
                            <Row className="justify-content-center">Find a book to add to the new playlist:</Row>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={0} md={1}></Col>
                        <Col xs={8} md={7} className="justify-content-center text-center">
                            <Form.Control placeholder="Title or Author" value={query} onChange={handleChange} />
                        </Col>
                        <Col xs={4} md={3} className="justify-content-center text-center">
                            <Button variant="primary" onClick={search}>Search</Button>
                        </Col>
                        <Col xs={0} md={1}></Col>
                    </Row>

                    {resultItems != null &&
                        <Row className="mt-3">
                            <Col xs={2}></Col>
                            <Col xs={8}>
                                <Row className="justify-content-start"><h5>Results for '{displayQuery}':</h5></Row>
                                <SearchResult results={resultItems} addToPlaylistFn={addToPlaylist} idMap={idMap}></SearchResult>
                            </Col>
                            <Col xs={2}></Col>
                        </Row>}
                </Col>
                <Col xs={5}>
                    {playlistItems && playlistItems.length > 0 && <PlaylistEditor items={playlistItems} removeFromPlaylistFn={removeFromPlaylist} moveUpFn={moveUp} moveDownFn={moveDown}></PlaylistEditor>}
                    <Row className="p-0 mb-5">
                        <Col><Card>
                            {/* <Card.Img variant="top" src="http://books.google.com/books/content?id=kSGVAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" style={{'width': '10%'}}/> */}
                            <Card.Body>
                                <Card.Title className="text-center">Create New Playlist</Card.Title>
                                <Card.Text>
                                    <Row className="justify-content-center">
                                        {playlistItems.length} {playlistItems.length === 1 && 'book' || 'books'}
                                    </Row>
                                    <Row className="justify-content-center">
                                    </Row>
                                </Card.Text>
                                {/* <Form.Control placeholder="" value={playlistName} onChange={handlePlaylistNameChange} /> */}
                                <Row className="justify-content-center m-2">
                                    <Form.Control placeholder="Name of the playlist" value={playlistName} onChange={handlePlaylistNameChange} />
                                </Row>
                                <Row className="justify-content-center m-2" value={playlistDesc} onChange={handlePlaylistDescChange}>
                                    <Form.Control placeholder="Description" />
                                </Row>
                                <Row className="justify-content-center m-2">
                                    <Button variant="primary" onClick={createPlaylist} disabled={!(playlistItems && playlistItems.length > 0)}>Create</Button>
                                </Row>
                            </Card.Body>
                        </Card></Col>
                    </Row>
                </Col>
            </Row>
        </div>);
}