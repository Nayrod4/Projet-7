import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../Constants/apiConstants.js";
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function AddPost(props) {
    const [text, setText] = useState({
        title : "",
        content : "",
        like: 0
    });
    const token = localStorage.getItem('token');
    const handleChange = (event) => {
        setText(event.target.value);
    };
    const sendPost = () => {
        axios({
            method: 'post',
            url: API_BASE_URL+'/messages/new',
            data: {
            headers: {"Authorization" : `Bearer ${token}`},
              content: text.content,
            }
          })
            .then((response) => {
                console.log(response);
                props.setPosts(posts => [...posts, response.data]);
            }, (error) => {
                console.log(error);
            });
        setText('');

    };

    return (
        <div className="App">
            {/* <label>
                Ajouter un post :
                <textarea value={text} placeholder={"Add something interesting"} onChange={handleChange} />
            </label>
            <input type="button" value="Post" onClick={sendPost} /> */}
                <Card style={{ width: '20rem' }}>
                <Card.Body>
                <Form>
                <FormGroup className="mb-3" controlId="Message">
                    <FormLabel>Titre</FormLabel>
                    <FormControl type="email" placeholder="Un super titre" />
                </FormGroup>
                <FormGroup className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <FormLabel>Votre Message :</FormLabel>
                    <FormControl as="textarea" placeholder="Parlez nous un peu de vous !" rows={3} />
                    <br />
                    <Button variant="success" type="button" value="Post" onClick={sendPost} >Poster </Button>
                </FormGroup>
                </Form>
                </Card.Body>
                </Card>
        </div>
    );
}

export default AddPost;