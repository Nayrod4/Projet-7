import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../Constants/apiConstants.js";
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function AddPost() {

    // const [userId,setuserId] = useState("");
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    
    const submitPost = () => {
    axios.post(API_BASE_URL+'messages/new', {title: title, content: content})
    }
    
        return (
            <div className="CreatePost">
                <div className="uploadPost">
                 <Card style={{ width: '20rem' }}>
                 <Card.Body>
                 <Form>
                    {/* <FormGroup className="mb-3" controlId="Users">
                        <FormLabel>Utilisateur: </FormLabel>
                            <FormControl type="text" onChange={(e)=> {
                                setuserId(e.target.value)
                            }}/>
                        </FormGroup> */}

                    <FormGroup className="mb-3" controlId="Title">    
                        <FormLabel>Titre: </FormLabel>
                            <FormControl placeholder="Un super titre" type="text" onChange={(e)=>{
                                setTitle(e.target.value)
                            }}/>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="Message">        
                    <FormLabel>Votre Message :</FormLabel>
                        <FormControl as="textarea" placeholder="Parlez nous un peu de vous !" rows={3}
                        onChange={(e)=>{
                            setContent(e.target.value)
                        }}
                        ></FormControl>
                    </FormGroup>
    <Button variant="success" type="button" value="Post" onClick={submitPost}>Poster</Button>
                </Form>
                </Card.Body>
                </Card>
                </div>
            </div>
        )
    }
    
    export default AddPost

// const qs = require('qs')

// function AddPost(props) {
//     // const data = qs.stringify({
//     //     title: text.title,
//     //     content: text.content 
//     //   });
//     const [text, setText] = useState({
//         title: "",
//         content: "",
//     });
//     const token = localStorage.getItem('token');
//     const handleChange = (event) => {
//         setText(event.target.value);
//     };
//     const sendPost = () => {
//         axios({
//             method: 'post',
//             url: API_BASE_URL+'/messages/new',
//             headers: {"Authorization" : `Bearer ${token}`}, 
//             data: {
//                 title: "",
//                 content: "",
//             }
//           })
//             .then((response) => {
//                 console.log(response);
//                 props.setPosts(posts => [...posts, response.data]);
//             }, (error) => {
//                 console.log(error);
//             });
//         setText('');

//     };

//     return (
//         <div className="App">
//             {/* <label>
//                 Ajouter un post :
//                 <textarea value={text} placeholder={"Add something interesting"} onChange={handleChange} />
//             </label>
//             <input type="button" value="Post" onClick={sendPost} /> */}
//                 <Card style={{ width: '20rem' }}>
//                 <Card.Body>
//                 <Form>
//                 <FormGroup className="mb-3" controlId="Message">
//                     <FormLabel>Titre</FormLabel>
//                     <FormControl type="title" id="title" value={text.title} onChange={handleChange} placeholder="Un super titre" />
//                 </FormGroup>
//                 <FormGroup className="mb-3" controlId="exampleForm.ControlTextarea1">
//                     <FormLabel>Votre Message :</FormLabel>
//                     <FormControl type="content" id="content" value={text.content} onChange={handleChange} as="textarea" placeholder="Parlez nous un peu de vous !" rows={3} />
//                     <br />
//                     <Button variant="success" type="button" value="Post" onClick={sendPost} >Poster </Button>
//                 </FormGroup>
//                 </Form>
//                 </Card.Body>
//                 </Card>
//         </div>
//     );
// }

// export default AddPost;