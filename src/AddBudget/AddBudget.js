import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './Banner';
function AddBudget({ updateHomeData }) {
  const [categoryAllocation, setCategoryAllocation] = useState('');
  const [allocated, setAllocated] = useState('');
  const [selectedMonthAllocation, setSelectedMonthAllocation] = useState('');
  const [selectedYearAllocation, setSelectedYearAllocation] = useState(new Date().getFullYear());
  const [allCategories, setAllCategories] = useState([]);
  const [showBanner, setShowBanner] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Define categories
  const categories = [
    'Rent', 'Food', 'Education', 'Shopping', 'EMI', 'Trips',
    'Fuel', 'Electricity', 'Gas', 'Water', 'Wifi', 'Others'
  ];

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get('http://66.42.93.147:4000/api/categories');
      setAllCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAllocationSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const allocatedValue = parseFloat(allocated);

    if (isNaN(allocatedValue)) {
      console.error('Invalid value for allocated:', allocated);
      return;
    }

    const budgetData = {
      category: categoryAllocation,
      allocated: allocatedValue,
      month: selectedMonthAllocation,
      year: selectedYearAllocation,
      userId,
    };

    try {
      const response = await axios.post('http://66.42.93.147:4000/api/AddBudget', budgetData);
      console.log(response.data);

      if (typeof updateHomeData === 'function') {
        updateHomeData();
      }// Show the banner
      setShowBanner(true);

      // Hide the banner after 5 seconds (adjust the time as needed)
      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    } catch (error) {
      console.error('Error configuring budget:', error);
    }

    setCategoryAllocation('');
    setAllocated('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Budget</h2>
      {/* This is a Semantic HTML Change */}
      <form onSubmit={handleAllocationSubmit} style={styles.form}>
        <label style={styles.label}>
          Category:
          <select value={categoryAllocation} onChange={(e) => setCategoryAllocation(e.target.value)} style={styles.input}>
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Allocated Budget:
          <input type="number" value={allocated} onChange={(e) => setAllocated(e.target.value)} style={styles.input} />
        </label>
        <label style={styles.label}>
          Month:
          <select value={selectedMonthAllocation} onChange={(e) => setSelectedMonthAllocation(e.target.value)} style={styles.input}>
          <option value="" disabled>Select a month</option>
             {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Year:
          <input type="number" value={selectedYearAllocation} onChange={(e) => setSelectedYearAllocation(e.target.value)} style={styles.input} />
        </label>
        <button type="submit" style={{ ...styles.button, marginTop: '10px' }}>Allocate</button>
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
    backgroundColor: '#4caf50',
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    border: 'none',
    outline: 'none',
  },
};

export default AddBudget;