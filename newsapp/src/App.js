import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <div>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<News key="general" country="in" category="general" />} />
              <Route exact path="/Business" element={<News key="business" country="in" category="business" />} />
              <Route exact path="/Entertainment" element={<News country="in" category="entertainment" />} />
              <Route exact path="/General" element={<News key="general" country="in" category="general" />} />
              <Route exact path="/Health" element={<News key="health" country="in" category="health" />} />
              <Route exact path="/Science" element={<News key="science" country="in" category="science" />} />
              <Route exact path="/Sports" element={<News key="sports" country="in" category="sports" />} />
              <Route exact path="/Technology" element={<News key="technology" country="in" category="technology" />} />
            </Routes>
          </Router>
        </div>
      </>
    )
  }
}
