import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectData } from '../redux/Home/homeSlice';

const Details = () => {
  const { countryName } = useParams(); // Access the country name from the URL parameter
  const data = useSelector(selectData);
  const country = data.rawData.find((item) => item.Combined_Key === countryName); // Find the country by matching the Combined_Key property

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div>
      <h2>{country.Combined_Key}</h2>
      <p>Total Confirmed: {country.Confirmed}</p>
      <p>Total Deaths: {country.Deaths}</p>
      <p>Case Fatality Ratio: {country.Case_Fatality_Ratio}</p>
    </div>
  );
};

export default Details;
