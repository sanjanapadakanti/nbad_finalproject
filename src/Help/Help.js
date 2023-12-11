import React from "react";
import "./Help.scss";

function Help() {
  return (
    <div className="help-container">
   {/* This is a Semantic HTML Change */}

      <header className="header">
        <h1>Personal Budget Management System</h1>
      </header>
{/* This is a Semantic HTML Change */}
      <section className="section">
        <h2 className="section-heading">Overview</h2>
        <p className="section-content">
          Efficiently take control of your finances with our user-friendly Budget Management System. Accessible through a secure login page, this system empowers you to distribute funds across categories and effortlessly monitor your expenditures.
        </p>
        <p className="section-content">
          Access the system through the login page using your registered credentials.
        </p>
      </section>

      <section className="section">
        <h2 className="section-heading">Dashboard</h2>
        <p className="section-content">
          The dashboard provides a visual overview of your budget information, including pie charts, bar graphs, and tables.
        </p>
        <p className="section-content">
          Visit the AddBudget page or RemoveBudget Page to allocate budgets to categories or delete ones already added as needed.
        </p>
        <p className="section-content">
          Pie charts on the dashboard illustrate the percentage distribution of each category, and the bar graph highlights the variance between allocated and utilized budgets.
        </p>
      </section>
{/* This is a Semantic HTML Change */}
      <section className="section">
        <h2 className="section-heading">Allocating Budget</h2>
        <p className="section-content">
          Streamline the process of allocating used budget by following these steps:
        </p>
        <ol className="section-list">
          <li>Navigate to the AddBudget page.</li>
          <li>Enter the budget details for the specific month, year, and category.</li>
          <li>Click "Allocate" to promptly update the system with your allocated budget.</li>
        </ol>
      </section>
      <section className="section">
        <h2 className="section-heading">Removing Budget</h2>
        <p className="section-content">
          Streamline the process of Deleting extra budget by following these steps:
        </p>
        <ol className="section-list">
          <li>Navigate to theRemoveBudget page.</li>
          <li>Enter the budget details for the specific month, year, and category.</li>
          <li>Click "Deallocate" to promptly update the system with your updated budget.</li>
        </ol>
      </section>
    </div>
  );
}

export default Help;
