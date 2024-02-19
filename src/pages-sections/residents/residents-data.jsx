import React, { useEffect, useState } from 'react';
import { getBedBookingData } from '../../firebase/bookAbed/get-booking';

const ResidentsData = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const result = await getBedBookingData();
      if (result.status == 200) {
        setResidents(result.data);
        setLoading(false);
      } else {
        setError('Failed to fetch data');
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading residents...</p>;
  }

  if (error) {
    return (
      <p>
        Error loading residents data. Please try again later or contact support.
      </p>
    );
  }

  return (
    <div>
      {residents.map(resident => (
        <div key={resident.id}>
          <p>Name: {resident.data.name}</p>
          <p>Mobile Number: {resident.data.personalContactNo}</p>
        </div>
      ))}
    </div>
  );
};

export default ResidentsData;
