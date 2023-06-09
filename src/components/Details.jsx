import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faSkullCrossbones, faChartBar, faArrowLeft, faAreaChart,
} from '@fortawesome/free-solid-svg-icons';
import { selectData } from '../redux/Home/homeSlice';
import Navbar from './Navbar';

import bgMainImage from '../assets/Bg-main.jpeg';

import '../styles/Details.css';

const Details = () => {
  const { countryName } = useParams(); // Access the country name from the URL parameter
  const data = useSelector(selectData);
  const country = data.rawData.find((item) => item.Combined_Key === countryName); // Find the country by matching the Combined_Key property

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div>
      <Navbar />
      <Link to="/" style={{ textDecoration: 'none', marginBottom: '10px' }}>
        <FontAwesomeIcon icon={faArrowLeft} color="#b5cde0" className="arrow" />
      </Link>
      <h2 style={{ backgroundImage: `url(${bgMainImage})` }}>
        {country.Combined_Key}
        (
        {country.Last_Update}
        )
      </h2>
      <ul className="Details-container">
        <li>
          <FontAwesomeIcon icon={faUsers} size="lg" color="red" className="ico" />
          CONFIRMED
          {' '}
          <div className="insides">{country.Confirmed}</div>
        </li>
        <li>
          <FontAwesomeIcon icon={faSkullCrossbones} size="lg" color="red" className="ico" />
          DEATH(S)
          {' '}
          <div className="insides">{country.Deaths}</div>
        </li>
        <li>
          <FontAwesomeIcon icon={faChartBar} size="lg" color="red" className="ico" />
          FATALITY RATIO
          {' '}
          <div className="insides">{country.Case_Fatality_Ratio}</div>
        </li>
        <li>
          <FontAwesomeIcon icon={faAreaChart} size="lg" color="red" className="ico" />
          FREQUENCY
          {' '}
          <div className="insides">{country.Incident_Rate}</div>
        </li>
      </ul>
    </div>
  );
};

export default Details;
