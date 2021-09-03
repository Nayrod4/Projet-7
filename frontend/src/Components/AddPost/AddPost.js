import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../Constants/apiConstants.js";


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
            <label>
                Add Post:
                <textarea value={text} placeholder={"Add something interesting"} onChange={handleChange} />
            </label>
            <input type="button" value="Add" onClick={sendPost} />
        </div>
    );
}

export default AddPost;