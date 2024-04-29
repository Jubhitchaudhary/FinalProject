import React from 'react';
import { useState } from 'react';
import './Post.css';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

const Post = (props) => {
    const [votes, setVotes] = useState(props.votes || 0);

    const handleVote = async () => {
        try {
            // Increment the local votes count
            setVotes(votes + 1);
    
            // Update the votes count in the database
            const { error } = await supabase
                .from('FootballPost')
                .update({ votes: votes + 1 })
                .eq('id', props.id);
    
            if (error) {
                throw error;
            }
    
            // Update the props.votes value after successful database update
            props.onVote(votes + 1);
        } catch (error) {
            console.error('Error updating votes:', error.message);
        }
    };
    


    return (
        <div className='Post'>
            <div className='post-header'>
                <div className="title-container">
                    <h2>{props.title}</h2>
                </div>
                <div className="info-link">
                    <Link to={"/info/" + props.id}>
                        <button className="info-button">Information</button>
                    </Link>
                </div>
            </div>
            <p className='time'>{props.time}</p>
            <p>{props.content}</p>
            <div className="ImageContainer">
                <img src={props.url} alt="Post Image" className="PostImage" />
            </div>
            <div className='post-footer'>   
                <div className="VoteSection">
                    <button className="vote-button" onClick={handleVote}>
                        {/* Like emoji icon */}
                        <span role="img" aria-label="Like">👍</span>
                    </button>
                    <span>Votes: {votes}</span>
                </div>
                <Link to={"/edit/" + props.id}><button>Edit Post</button></Link>
            </div>
        </div>
    );
}

export default Post;
