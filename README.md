# Namn the country


## Project Overview

This is an web application designed to provide information and an interactive educational quiz experience. The application combines detailed country research with an interactive learning platform via a quiz game to improve your knowledge.

## Key Features

###  Country Search
- Detailed country information 

### Interactive Quiz Game

- National flags identification
- Get hints when answering questions incorrectly
- Score tracking

### User Experience
- User profiles
- Global high score

## Technology Stack

### Frontend
- Framework: Vue.js
- Routing: Vue Router?
- Styling: CSS

### Backend & Database
- Firebas
- Node.js

### External API
- Country Information: https://dev.me/products/country 

## Prerequisites

- Node.js ??
- npm 
- Firebase Account

## Installation Process

1. Clone the repository
   ```bash
   git clone https://github.com/HarryKarlsson/DH2642-project/tree/main
   ```

2. Navigate to project directory
   ```bash
   cd DH2642-project
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Configure Firebase
   

5. Set up environment variables

-  **Create a `.env` File**:  
   Create a file named `.env` in the project's root directory.  
-  **Add the API Key**:  
   Add the following line to the `.env` file, replacing `<your-api-key>` with your actual API key from https://countryapi.io/dashboard  
   ```env
   VITE_COUNTRY_API_KEY=<your-api-key>
   ```
-  **Save the File**:  
   Save the file after making the changes.

## Running the Application

```bash
npm run dev
```

## What We Still Plan to Do
 While the foundation of the application is complete, there are several features we still plan to implement and improve:

- **Quiz Implementation**: Finalize the functionality of the interactive quiz to make it fully operational and engaging.  
- **Profile View**: Enhance the profile view to ensure it is complete and user-friendly.  
- **Highscore View**: Create a dedicated view to display high scores and encourage competition among users.  
- **Styling and Design**: Apply CSS and styling across the entire application for a cohesive and visually appealing look.  
- **Responsiveness**: Optimize the application for different screen sizes to ensure a seamless experience on both desktop and mobile devices.  


## File Descriptions

### highscoreView + Presenter
Displays the high score view, showing either the user's personal best scores or a leaderboard of top players. Useful for tracking quiz results and competition.

### navbarView + Presenter
A navigation bar component with links and buttons for switching between different views, such as Home, Quiz or Profile.

### practiceView + Presenter
A practice view where users can train by looking up information of countries before attempting the actual quiz.

### profileView + Presenter
Displays the user's profile information, such as their name, avatar, (statistics).

### quizPageView + Presenter
The main quiz view where users answer questions and track their progress through the quiz.

### quizStartView + Presenter
The starting view for quizzes, allowing users to set up their preferences, such as the region the what to do.

### welcomeView + Presenter
The welcome screen of the application is the first page the user sees. It will include an introduction to the app and a button to get started.

### homeView + Presenter
Represents the main homepage of the application. Acts as the main point for users, providing navigation to other sections like quizzes, profiles, or high scores.
