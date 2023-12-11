// Banner.js
import React from 'react';

function Banner({ showBanner }) {
  return showBanner ? (
    <div style={styles.banner}>
      {/* Banner content goes here */}
      Budget deleted successfully!
    </div>
  ) : null;
}

const styles = {
  banner: {
    position: 'fixed', // Fix the banner to the viewport
    top: 0,            // Position it at the top
    left: 0,
    width: '100%',     // Make it span the entire width
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '20px',
    borderRadius: '6px',
    textAlign: 'center',
  },
};

export default Banner;
