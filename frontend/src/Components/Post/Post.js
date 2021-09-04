import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../Constants/apiConstants.js";
import './Post.css';
import Card from 'react-bootstrap/Card'

function AllPost(props) {
    const [text, setText] = useState({
        title : "",
        content : "",
        attachment: "",
        like: 0
    });
    const token = localStorage.getItem('token');
    const handleChange = (event) => {
        setText(event.target.value);
    };
    const AllPost = () => {
        axios({
            method: 'get',
            url: API_BASE_URL+'/messages',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',"Authorization" : `Bearer ${token}`},
            data: {
                title:text.title,
                content: text.content,
                attachement:text.attachment,
                like:text.like,
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
            <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="{text.attachment}" alt="" />
  <Card.Body>
    <Card.Title>{text.title}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>
        </div>
    );
}

export default AllPost;