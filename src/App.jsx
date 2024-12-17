// App.js
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Display from './components/Display';
import Home from './components/Home';

const App = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchHotelsAndAttractions = async (location) => { 
    const API_KEY = import.meta.env.VITE_API_KEY;

    // URLs for hotels and attractions
    const hotelUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=-2092174&search_type=CITY&adults=1&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=EUR`;
    const attractionUrl = `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${encodeURIComponent(location)}&languagecode=en-us`;

    try {

      
      const [hotelResponse, attractionResponse] = await Promise.all([
        fetch(hotelUrl, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
            'x-rapidapi-key': API_KEY,
          },
        }),
        fetch(attractionUrl, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
            'x-rapidapi-key': API_KEY,
          },
        }),
      ]);

      if (!hotelResponse.ok) throw new Error(`Hotel API error: ${hotelResponse.status}`);
      if (!attractionResponse.ok) throw new Error(`Attraction API error: ${attractionResponse.status}`);

      const hotelData = await hotelResponse.json();
      const attractionData = await attractionResponse.json();

      return { hotels: hotelData.result || [], attractions: attractionData.result || [] };
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;

    try {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const headers = {
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      };

      // Fetch flights, hotels, and attractions
      const [flightsRes, hotelAttractionData] = await Promise.all([
        fetch(`https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(searchTerm)}`, { headers }),
        fetchHotelsAndAttractions(searchTerm),
      ]);

      if (!flightsRes.ok) throw new Error('Flight API error');

      const flightsData = await flightsRes.json();

      // Structure data from each endpoint
      const structuredData = {
        flights: flightsData?.data || [],
        hotels: hotelAttractionData.hotels || [],
        attractions: hotelAttractionData.attractions || [],
      };

      setData(structuredData);
      navigate('/display');

    } catch (err) {
      console.log('Error fetching travel search results:', err.message);
    }
  };

  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              data={data} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              onSearch={handleSearch} 
            />
          } 
        />
        <Route 
          path="/display" 
          element={
            <Display 
              data={data} 
              onRetrySearch={handleSearch} 
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
