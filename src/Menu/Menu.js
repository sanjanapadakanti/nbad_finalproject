import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Menu.scss'; // Import the CSS file
import axios from 'axios';
import styled from 'styled-components';

const CustomNavBar = styled.nav`
  color: white;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #333; /* Change this to your desired background color */
`;

const HelpLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: auto; /* Move to the right */
`;

function Menu() {
  const [userId, setUserId] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const value = localStorage.getItem('userId');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserId(value || '');

    // Fetch user details when userId is available
    if (value) {
      // Replace the following API call with your actual API endpoint to fetch user details
      fetchUserDetails(value);
    }
  }, [value]);

  const fetchUserDetails = async (userId) => {
    try {
      // Replace the following with your actual API endpoint to fetch user details
      const response = await axios.get(`http://144.202.18.160:${3002}/api/users/${userId}`);
      const userData = response.data;

      // Assuming the API response has a "firstname" property
      setUserFirstName(userData.firstname);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserId('');
    setUserFirstName('');
    navigate('/login'); // Navigate directly to the login page
  };

  const isLoginPage = location.pathname === '/login';
  
  return (
    /* This is a A11y Change */

    <CustomNavBar className="menu" aria-label="Main menu" itemScope itemType="https://schema.org/SiteNavigationElement">
      
      {!userId && isLoginPage && (
        <HelpLink itemProp="url" to="/Help" tabIndex="5">Help</HelpLink>
      )}
      <ul>
        {userId && (
          <>
            {/*} is a SEO Change */}
            {!isLoginPage && <li><Link itemProp="url" to="/help" tabIndex="2">Help</Link></li>}
            {!isLoginPage && <li><Link itemProp="url" to="/home" tabIndex="3">Home</Link></li>}
            {!isLoginPage && <li><Link itemProp="url" to="/AddBudget" tabIndex="3">AddBudget</Link></li>}
            {!isLoginPage && <li><Link itemProp="url" to="/RemoveBudget" tabIndex="3">RemoveBudget</Link></li>}
            <li><Link itemProp="url" to="/login" tabIndex="11" onClick={handleLogout}>Logout</Link></li>
          </>
        )}
      </ul>
    </CustomNavBar>
  );
}

export default Menu;