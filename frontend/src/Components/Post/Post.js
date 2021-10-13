import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import axios from "axios";
import {API_BASE_URL} from "../Constants/apiConstants.js";
import './Post.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default function Post() {

    let {postId} = useParams();
    const [post,setPost] = useState({})
    const [title,setTitle] = useState("");
    
    useEffect(()=>{
    axios.get(API_BASE_URL+'/messages').then((data)=>{
        console.log(data)
    setPost({
            title: data.data[0].title,
             content: data.data[0].content,
             userId: data.data[0].userId,
             id:data.data[0].id,
             like:data.data[0].like
            });
     });
    
    },[postId]);
    
    const deletePost = (id) => {
        axios.delete(API_BASE_URL+'/messages').then((response)=>{
            alert("supprimer le post ?")
        })
    }
    
    
        return (
            <div className="Post individual">
                <Card.Body>
                    <Card.Title>
                        <h1 className="post-title">{post.title}</h1>
                    </Card.Title>
                <Card.Body>
                    <p>{post.content}</p>
              </Card.Body>

              <h4>{post.userId}</h4>
              <Button variant="danger" onClick={(() => deletePost(post.id))}>X</Button>
              </Card.Body>
              
          </div>
        )
    }

// function AllPost(props) {
//     const [text, setText] = useState({
//         title : "",
//         content : "",
//         attachment: "",
//         like: 0
//     });
//     const token = localStorage.getItem('token');
//     const handleChange = (event) => {
//         setText(event.target.value);
//     };
//     const AllPost = () => {
//         axios({
//             method: 'get',
//             url: API_BASE_URL+'/messages',
//             data: {
//                 title:text.title,
//                 content: text.content,
//                 attachement:text.attachment,
//                 like:0,
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
//             <Card style={{ width: '18rem' }}>
//   <Card.Img variant="top" src="{text.attachment}" alt="" />
//   <Card.Body>
//     <Card.Title>{text.title}
            
    
// </Card.Title>

//     <Card.Text>test
//       {text.content}
//     </Card.Text>
//   </Card.Body>
// </Card>
//         </div>
//     );
// }

// export default AllPost;