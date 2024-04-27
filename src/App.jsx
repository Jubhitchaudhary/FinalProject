import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './components/navbar';
import { supabase } from './client.jsx';
import Post from './components/Post.jsx';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at'); // Default sort by created time
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      let { data, error } = await supabase
        .from('FootballPost')
        .select()
        .order(sortBy, { ascending:false}); // Set ascending to true if sorting by created_at

      if (error) {
        console.error('Error fetching Posts:', error.message);
      } else {
        if (searchTitle) {
          // Filter posts by title if searchTitle is provided
          data = data.filter(post => post.title.toLowerCase().includes(searchTitle.toLowerCase()));
        }
        setPosts(data);
      }
    };

    fetchPosts();
  }, [sortBy, searchTitle]); // Update posts when sortBy or searchTitle changes

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
  };;

  const handleSearch = (event) => {
    setSearchTitle(event.target.value);
  };

  return (
    <div className='App'>
      <Nav />
      
    <h1>Welcome all to Football Hub!!<span className="football-emoji">⚽️</span></h1>

      <div className="sort-search">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Time Created</option>
          <option value="votes">Maximum Upvotes</option>
        </select>
        <input type="text" placeholder="Search by title" value={searchTitle} onChange={handleSearch} />
      </div>
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            id={post.id}
            title={post.title}
            content={post.content}
            time={formatDateTime(post.created_at)}
            url={post.url}
            votes={post.votes}
          />
        ))
      ) : (
        <h2>No Posts Yet</h2>
      )}
    </div>
  );
}

// Function to format date and time
function formatDateTime(dateTimeString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString('en-US', options);
}

export default App;
