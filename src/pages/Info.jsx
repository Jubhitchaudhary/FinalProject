import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import Nav from "../components/navbar";
import './info.css';

const Info = () => {
    const { id } = useParams();
    const [info, setInfo] = useState({title: "", content: "", url: "", votes: 0});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    function formatDateTime(dateTimeString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString('en-US', options);
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        try {
            await supabase
                .from("comments_fb")
                .insert([{ content: comment, id_fk: id}]);
            fetchComments();
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from("comments_fb")
                .select("*")
                .eq("id_fk", id);
            if (error) {
                throw error;
            }
            setComments(data || []);
        } catch (error) {
            console.error("Error fetching comments:", error.message);
        }
    };

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const { data, error } = await supabase
                    .from("FootballPost")
                    .select("*")
                    .eq("id", id)
                    .single();
                if (error) {
                    throw error;
                }
                if (data) {
                    setInfo(data);
                }
            } catch (error) {
                console.error("Error fetching info:", error.message);
            }
        };
        fetchInfo();
        fetchComments();
    }, [id]);

    return (
        <div className="Info">
            <Nav />
            {info ? (
                <>
                    <h3>{info.title}</h3>
                    <p className="time">{formatDateTime(info.created_at)}</p>
                    <p>{info.content}</p>
                    <div className="img-container">
                        <img src={info.url} alt="Post" />
                    </div>
                    <h4>Comments:</h4>
                    <form onSubmit={handleSubmitComment}>
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                            required
                        ></textarea>
                        <button type="submit">Post</button>
                    </form>
                    <div className="user-comments">
                        <h4>User's Comments:</h4>
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <p>{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Info;
