import React, { useState, useEffect } from 'react';
import FormSearch from './FormSearch';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [img, setImg] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los datos de la API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los datos de la API
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((data) => setImg(data[0])) // Cambiar a data[0] para obtener la primera imagen
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = posts.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <h1>Lista de Posts</h1>
      <FormSearch onSearch={handleSearch} />
      <ul>
        {filteredPosts.length > 0
          ? filteredPosts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <img src={img.url} alt="error" />
              </li>
            ))
          : posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <img src={img.url} alt="error" />
              </li>
            ))}
      </ul>
    </div>
  );
}

export default PostList;
