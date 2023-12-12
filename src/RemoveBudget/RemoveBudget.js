import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './Banner';

function RemoveBudget({ updateHomeData }) {
  const [categoryDeallocation, setCategoryDeallocation] = useState('');
  const [selectedMonthDeallocation, setSelectedMonthDeallocation] = useState('');
  const [selectedYearDeallocation, setSelectedYearDeallocation] = useState(new Date().getFullYear());
  const [categoryDeallocationList, setCategoryDeallocationList] = useState([]);
  const [allocatedCategories, setAllocatedCategories] = useState([]);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    fetchDelocatedCategories(selectedYearDeallocation, selectedMonthDeallocation);
  }, [selectedYearDeallocation, selectedMonthDeallocation]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchDelocatedCategories = (year, month) => {
    const userId = localStorage.getItem('userId');
    axios
      .get(`http://66.42.93.147:4000/api/get-budgets/${year}/${month}/${userId}`)
      .then((response) => {
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setAllocatedCategories(uniqueCategories);
        setCategoryDeallocationList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  };

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get('http://66.42.93.147:4000/api/categories');
      const categories = response.data.map((category) => category.category);
      setAllocatedCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeallocationSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const deallocateData = {
      category: categoryDeallocation,
      month: selectedMonthDeallocation,
      year: selectedYearDeallocation,
      userId,
    };

    try {
      const response = await axios.post('http://66.42.93.147:4000/api/deallocation-budget', deallocateData);
      console.log(response.data);

      if (typeof updateHomeData === 'function') {
        updateHomeData();
      }
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    }  catch (error) {
      console.error('Error deallocating budget:', error);
    }

    setCategoryDeallocation('');
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Remove Budget</h2>
      <form style={styles.form} onSubmit={handleDeallocationSubmit}>
       
        <label style={styles.label}>
          Month:
          <select
            value={selectedMonthDeallocation}
            onChange={(e) => setSelectedMonthDeallocation(e.target.value)}
            style={styles.input}
          >
            <option value="" disabled>Select a month</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Year:
          <input
            type="number"
            value={selectedYearDeallocation}
            onChange={(e) => setSelectedYearDeallocation(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Category to Deallocate:
          <select
            value={categoryDeallocation}
            onChange={(e) => setCategoryDeallocation(e.target.value)}
            style={styles.input}
          >
            <option value="" disabled>Select a category</option>
            {allocatedCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <button type="submit" style={{ ...styles.button, marginTop: '10px' }}>Deallocate</button>
      </form>
      <Banner showBanner={showBanner} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    height: 'calc(100vh - 44px)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    width: '230px',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    padding: '10px',
    marginBottom: '10px',
  },
  input: {
    height: '40px',
    width: '100%',
    outline: 'none',
    border: 'none',
    padding: '0 10px',
    fontSize: '16px',
    fontWeight: '500',
    borderBottom: '2px solid rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  },
  button: {
    marginTop: '20px',
    color: '#fff',
    backgroundColor: '#e74c3c', // Red button color
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    border: 'none',
    outline: 'none',
  },
};

export default RemoveBudget;
