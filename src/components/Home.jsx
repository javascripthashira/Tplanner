// Home.js
import React from 'react';
import Cardlist from './Cardlist';
import Hero from './Hero';
import Navbar from './Navbar';

const Home = ({ data, searchTerm, setSearchTerm, onSearch }) => {
  return (
    <div>
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onSearch={onSearch} 
      />
      <Hero />
      <Cardlist data={data} />
    </div>
  );
};

export default Home;
