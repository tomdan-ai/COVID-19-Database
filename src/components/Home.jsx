import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectData, selectStatus } from '../redux/Home/homeSlice';
import { Link } from 'react-router-dom';
import bgGridImage from '../assets/Bg-grid.jpeg';
import bgMainImage from '../assets/Bg-main.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const status = useSelector(selectStatus);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIconClick = () => {
    setIsExpanded(true);
  };

  const filteredCountries = data.rawData
    ? data.rawData.filter((country) => {
        const searchTermLower = searchTerm.toLowerCase();
        const countryRegionLower = country.Country_Region.toLowerCase();
        return countryRegionLower.includes(searchTermLower);
      })
    : [];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: Failed to fetch data</div>;
  }

  return (
    <div>
      <nav>
        <h1>COVID 19 METRIC DATA</h1>

        <FontAwesomeIcon icon={faMicrophone} size="lg" color="white" className='svg' />
        <div className="search-container">
          {!isExpanded && (
            <FontAwesomeIcon
              icon={faSearch}
              size="lg"
              color="white"
              className="search-icon"
              onClick={handleIconClick}
            />
          )}
          {isExpanded && (
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          )}
        </div>
      </nav>
      <img src={bgGridImage} alt="BG-grid" className="img" />
      <div className='stats'>STAT BY COUNTRY</div>
      <div className="container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div
              key={country.Combined_Key}
              style={{ backgroundImage: `url(${bgMainImage})` }}
              className="list"
            >
              <ul>
                <Link to={`/details/${country.Combined_Key}`}>
                  {country.Admin2} {country.Country_Region}
                </Link>
                <li>Cases: {country.Confirmed}</li>
              </ul>
            </div>
          ))
        ) : (
          <div>No matching countries found</div>
        )}
      </div>
    </div>
  );
};

export default Home;
