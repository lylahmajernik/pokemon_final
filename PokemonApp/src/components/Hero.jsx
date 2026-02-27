import { Link } from "react-router-dom";
import "./Hero.css";
// AI Used to help with div placement/classnames for css, write page intros


function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to PokeDex Arena</h1>
        <p className="hero-subtitle">Explore, Collect, and Battle Pokemon</p>
        
        <p className="hero-description">
          Discover the ultimate Pokemon experience. Search through hundreds of Pokemon, 
          build your dream team, save your favorites, and battle other trainers to prove 
          your skills. Whether you're a seasoned trainer or just starting your journey, 
          PokeDex Arena has everything you need!
        </p>

        <div className="hero-features">
          <div className="feature">
            <div className="feature-icon">🔍</div>
            <h3>Explore Pokemon</h3>
            <p>Search and discover detailed stats for every Pokemon in the Pokedex</p>
          </div>

          <div className="feature">
            <div className="feature-icon">👥</div>
            <h3>Build Your Team</h3>
            <p>Create a team of up to 6 Pokemon to prepare for battle</p>
          </div>

          <div className="feature">
            <div className="feature-icon">⭐</div>
            <h3>Save Favorites</h3>
            <p>Mark your favorite Pokemon for quick access anytime</p>
          </div>

          <div className="feature">
            <div className="feature-icon">⚔️</div>
            <h3>Battle Arena</h3>
            <p>Challenge opponents and test your team's strength</p>
          </div>
        </div>

        <div className="hero-buttons">
          <Link to="/pokemon-details" className="btn btn-primary">
            Start Exploring
          </Link>
          <Link to="/battle" className="btn btn-secondary">
            Go to Battle Arena
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
