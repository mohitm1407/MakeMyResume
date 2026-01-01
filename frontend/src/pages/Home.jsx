import { Link } from 'react-router-dom'
import '../home.css'

function Home() {
  return (
    <div className="home-layout">
      <header className="home-navbar">
        <div className="home-nav-content">
          <div className="home-brand">
            <span className="home-logo">MMR</span>
            <span className="home-title">MakeMyResume</span>
          </div>
          <nav className="home-links">
            <Link to="/home">Home</Link>
            <Link to="/details">My Details</Link>
            <Link to="/login">Logout</Link>
          </nav>
        </div>
      </header>

      <main className="home-main">
        <section className="home-hero">
          <h1>Craft a resume that stands out</h1>
          <p>Simple, polished, and tailored to your next opportunity.</p>
          <div className="home-actions">
            <Link className="home-btn primary" to="/signup">Create new resume</Link>
            <Link className="home-btn ghost" to="/login">Continue editing</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home


