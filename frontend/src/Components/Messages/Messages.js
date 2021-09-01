import React, {useEffect, useState} from "react";
import axios from "axios";


function AddPost(props) {
    const [text, setText] = useState('');
    const token = localStorage.getItem('token');
    const handleChange = (event) => {
        setText(event.target.value);
    };
    const sendPost = () => {
        axios.post('http://localhost:3080/api/messages/new/', {
            text: "",
            content: "",
            attachment: "",
            likes: 0,
            createdAt: "",
            updatedAt: "",
            UserId: "",
            Users: "",
        },{ headers: {"Authorization" : `Bearer ${token}`} })
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