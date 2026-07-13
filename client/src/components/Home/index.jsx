import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-hero">
        <span className="hero-badge">✨ AI-Powered Resume Analysis</span>
        <h1>
          Get Your Resume <span className="gradient-text">Past the Bots</span>
        </h1>
        <p className="hero-subtitle">
          Upload your resume, compare it against any job description, and get an
          instant ATS compatibility score with AI-powered suggestions to land more
          interviews.
        </p>
        <div className="hero-actions">
          <Link to={token ? "/your-resumes" : "/register"} className="hero-cta">
            Analyze My Resume →
          </Link>
          {!token && (
            <Link to="/login" className="hero-secondary">
              I already have an account
            </Link>
          )}
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">📄</div>
          <h3>Smart PDF Parsing</h3>
          <p>Instantly extracts and reads text from your uploaded resume.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>ATS Compatibility Score</h3>
          <p>See exactly how well your resume matches the job you want.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Suggestions</h3>
          <p>Get tailored bullet points and skill recommendations from AI.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;