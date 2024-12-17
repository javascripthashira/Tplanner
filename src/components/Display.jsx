import React from 'react';
import Navbar from './Navbar';

const Display = ({ data }) => {
    console.log("Display data:", data);
  
    const { flights = [], attractions = [], hotels = [] } = data || {};

    return (
      <>
        <Navbar />
        <div className="display-container">
          {/* Flights Section */}
          {flights.length > 0 && (
            <section className="category-section">
              <h2>Flights / Airports</h2>
              <ul>
                {flights.map((flight, index) => (
                  <li key={index}>
                    <h3>{flight.name}</h3>
                    <p>Type: {flight.type}</p>
                    <p>Code: {flight.code}</p>
                    {flight.regionName && <p>Region: {flight.regionName}</p>}
                    {flight.city && <p>City: {flight.city}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Attractions Section */}
          {attractions.length > 0 && (
            <section className="category-section">
              <h2>Attractions</h2>
              <ul>
              {attractions.map((attraction, index) => (
  <li key={index}>
    <h3>{attraction.title}</h3>
    <p>Product ID: {attraction.productId}</p>
    <p>Product Slug: {attraction.productSlug}</p>
  </li>
))}
              </ul>
            </section>
          )}

          {/* Hotels Section */}
          {hotels.length > 0 && (
            <section className="category-section">
              <h2>Hotels</h2>
              <ul>
                {hotels.map((hotel, index) => (
                  <li key={index}>
                    <h3>{hotel.name}</h3>
                    <p>Location: {hotel.location}</p>
                    <p>Rating: {hotel.rating}</p>
                    <p>Price: {hotel.price}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </>
    );
};

export default Display;
