# Personal Budget App

## Overview

The Personal Budget App is a web application that helps users manage their monthly expenditures. It integrates a user-friendly UI with a MySQL database to store budget data. Users can add and delete various budget categories such as food, home rent, gas, electricity, and WiFi bills. The app provides insightful visualizations, including pie charts, bar charts, and tables, to give users a clear overview of their monthly expenses.

## Features

- **User Authentication**: Secure user authentication for login and logout functionality.
- **Budget Management**: Add, delete, and update budget entries for different categories.
- **Visualization**: Monthly expenditure visualized through pie charts, bar charts, and tables.
- **Help Pages**: Detailed help pages to guide users through the application.

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript

- **Backend**:
  - Node.js with Express for server-side logic
  - MySQL for database management

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/personal-budget-app.git
    cd personal-budget-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the MySQL database:
    - Create a MySQL database and update the connection details in `config/database.js`.

4. Run the application:

    ```bash
    npm start
    ```

5. Access the app in your browser at `http://localhost:3000`.

## Database Setup

- Create a MySQL database with the following schema:

    ```sql
    CREATE TABLE budgets (
      id INT PRIMARY KEY AUTO_INCREMENT,
      category VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      date DATE NOT NULL
    );
    ```

## Usage

1. **Login**: Use your credentials to log in.
2. **Add Budgets**: Navigate to the "Add Budget" section to add your monthly expenditures.
3. **Visualize Data**: Check the "Visualize Data" section for pie charts, bar charts, and tables.
4. **Delete Budgets**: Go to the "Manage Budgets" section to delete entries.
5. **Logout**: Click on the "Logout" button when you are done.

## Contributing

Feel free to contribute by opening issues or creating pull requests. Follow the [contributing guidelines](CONTRIBUTING.md) for more details.
