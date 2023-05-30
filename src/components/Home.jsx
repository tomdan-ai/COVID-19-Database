import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectData, selectStatus } from '../redux/Home/homeSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const status = useSelector(selectStatus);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCountries = data.rawData ? data.rawData.filter((country) => {
    const searchTermLower = searchTerm.toLowerCase();
    const countryRegionLower = country.Country_Region.toLowerCase();
    return countryRegionLower.includes(searchTermLower);
  }) : [];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: Failed to fetch data</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className='container'>
      {filteredCountries.length > 0 ? (
        filteredCountries.map((country) => (
          <div key={country.Combined_Key} className='list'>
            <ul>
              <Link to={`/details/${country.Combined_Key}`}>{country.Admin2} {country.Country_Region}</Link>
            <li>Total: {country.Confirmed}</li>
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
