import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main style={{ padding: 20 }}>
      <h1>Home</h1>
      <p>This is a placeholder for the Home page.</p>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
    </main>
  )
}

export default Home
