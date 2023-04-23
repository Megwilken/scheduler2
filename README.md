# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Final Product

## Screenshots

Main Appointment Page
!["Main Appointment Page"](

Create Appointment
!["Create Appointment"](

Saving Appointment
!["Saving Appointment"](

Delete Appointment
!["Delete Appointment"](

Deleting Appointment


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## API Server setup

Clone the scheduler-api repository from GitHub to your local machine.

   ```
   git clone https://github.com/lighthouse-labs/scheduler-api
   ```

Navigate into the cloned repository.

   ```
   cd scheduler-api
   ```

Refer to the scheduler-api README.md file to Install the required dependencies, create and seed the database, and run the server. 

## Tech Stack

React

Axios

JSX

HTML

SASS

JavaScript

Node

PostgreSQL

Storybook

Jest

Cypress

Testing Library
## Dependencies

babel/core

storybook/addon-actions

storybook/addon-backgrounds

storybook/addon-links

storybook/addon-viewport

testing-library/jest-dom

testing-library/react

testing-library/react-hooks

classnames

prop-types

react

react-dom

react-scripts

react-test-renderer

