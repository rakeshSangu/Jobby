# Jobby WebApp

Hello Everyone...!!!

Hope Everyone is Doing Well...

I am glad to share **Jobby WebApp** which I built as part of my React Assignment.

### Project Link

You can view the project live at:  
[Jobby App](https://rakesh18jobby.ccbp.tech)

### Concepts Used:
- React Components
- Component lifecycle methods
- Authentication/Authorization

### Overview:
In this project, I've built a **Jobby App** that allows users to log in, search for jobs, view job details, and apply filters for different job categories. It uses the concepts learned in React, including routing, state management, and API integration.




### Set Up Instructions:

1. Clone the repository:  
   `git clone https://github.com/your-username/jobby-app.git`
   
2. Navigate to the project directory:  
   `cd jobby-app`

3. Install dependencies:  
   `npm install`

4. Start the development server:  
   `npm start`

### Functionality to be added:

#### **Login Route:**
- When invalid credentials are provided, an error message should be shown.
- On valid credentials, navigate to Home Route.
- Unauthorized users should be redirected to the Login Route when accessing protected routes like Home, Jobs, and Job Item Details.

#### **Jobs Route:**
- Fetch jobs based on employment type, salary range, and search input.
- Display appropriate success or failure views based on API responses.

#### **Job Details Route:**
- Display detailed job information when a job item is clicked.
- Handle API failures and retry logic.

### API Endpoints:

#### **Login API:**
- Method: `POST`
- URL: `https://apis.ccbp.in/login`
- Sample Request:
  ```json
  {
    "username": "rahul",
    "password": "rahul@2021"
  }
