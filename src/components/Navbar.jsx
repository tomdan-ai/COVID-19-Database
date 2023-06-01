import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faSearch } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { selectStatus } from '../redux/Home/homeSlice';

const Navbar = () => {
  const status = useSelector(selectStatus);

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIconClick = () => {
    setIsExpanded(true);
  };

  if (status === 'loading') {
    return (
      <div className="loading-container">
        <BounceLoader color="#fff" size={100} />
      </div>
    );
  }

  return (
    <nav>
      <h1>COVID 19 METRIC DATA</h1>

      <FontAwesomeIcon icon={faMicrophone} size="lg" color="white" className="svg" />
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
  );
};

export default Navbar;
