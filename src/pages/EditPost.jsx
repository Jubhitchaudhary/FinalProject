import { supabase } from '../client';
import { useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import './EditPost.css'
import Nav from '../components/navbar';

const EditPost = () => {

    const {id} = useParams()
    const [post, setPost] = useState({title: "", content: "", url: "", votes: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
            await supabase
                .from('FootballPost')
                .update({ title: post.title, content: post.content, url: post.url })
                .eq('id', id);
    
            console.log('Crewmate updated successfully!');
    
            window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
    
        // First, delete associated comments
        const { error: commentError } = await supabase
            .from('comments_fb')
            .delete()
            .eq('id_fk', id); // Assuming 'post_id' is the foreign key column in the 'Comments' table
        if (commentError) {
            console.error('Error deleting associated comments:', commentError.message);
            // Handle error as needed
            return;
        }
    
        // Then, delete the post itself
        const { error: postError } = await supabase
            .from('FootballPost')
            .delete()
            .eq('id', id);
        if (postError) {
            console.error('Error deleting post:', postError.message);
            // Handle error as needed
            return;
        }
    
        // Redirect to the homepage after successful deletion
        window.location = "/";
    };
 
 
    

    return (
        <div className='EditPost'>
            <Nav/>
            <h2> Edit your post:</h2>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label for="content">Content</label><br />
                <input type="text" id="content" name="content" onChange={handleChange} placeholder='optional'/><br />
                <br/>

                <label for="url">Image URL</label><br />
                <input type="text" id="url" name="url" onChange={handleChange} placeholder='optional'/><br />
                <br/>
                
                <br/>
                <button onClick={updatePost}>Submit</button> 
                <button onClick={deletePost}>Delete Post</button>
            </form>
        </div>
        
        
    )
}

export default EditPost