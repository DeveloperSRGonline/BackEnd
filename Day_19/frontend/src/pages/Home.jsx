import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to Image Captioning App 🖼️</h1>
      <p>This is the homepage. You can register, login, or create a new post.</p>

      <div style={styles.links}>
        <Link to="/register" style={styles.button}>Register</Link>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/create-post" style={styles.button}>Create Post</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '2rem',
    backgroundColor: '#f0f4f8',
    textAlign: 'center'
  },
  links: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  button: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px'
  }
};

export default Home;
