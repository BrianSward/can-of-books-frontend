import React from 'react';
import Header from './Header';
import Profile from './About';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Routes, Route, Link
} from "react-router-dom";


function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
        <Profile/>
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/books">Books</Link>
      </nav>
    </>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/books">Books</Link>
        <br></br>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function Books() {
  return (
    <>
      <main>
        <h2>Welcome to the books!</h2>
        <BestBooks/>
      </main>
      <nav>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/about">About</Link>
        
      </nav>
    </>
  );
}

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="books" element={<Books />}/>
            <Route path="about" element={<About />} />
          </Routes>
        <Footer />
      </>
    )
  }
}

export default App;
