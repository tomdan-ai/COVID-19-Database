import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectData, selectStatus } from '../redux/Home/homeSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const firstTenItems = data.rawData; // Get the first 10 items from the rawData array
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: Failed to fetch data</div>;
  }

  return (
    <div>
      {Array.isArray(firstTenItems) && firstTenItems.length > 0 ? (
        firstTenItems.map((item) => (
          <div key={item.Combined_Key}>
            <h2>
              <Link to={`/details/${item.Combined_Key}`}>{item.Admin2} {item.Country_Region}</Link>
            </h2>
            <p>Total: {item.Confirmed}</p>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Home;
