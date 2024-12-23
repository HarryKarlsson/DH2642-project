# Namn the country


## Project Overview

This is an web application designed to provide information and an interactive educational quiz experience. The application combines detailed country research with an interactive learning platform via a quiz game to improve your knowledge.

## Target Group

The target group for this application includes individuals who are interested in learning about world geography and testing their knowledge of countries all around the globe. This includes students, teachers, travelers, and someone interested in geography. The quiz and practice pages are great for users who want to learn in a fun way, while the profile and highscore pages are for those who like to track their progress and compete with others. The application is designed to be accessible and enjoyable for users of all ages, making it suitable for casual learners as well as those seeking a more structured learning experience.
 
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
- Country Information: https://countryapi.io

## Prerequisites

- Node.js
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
### OBS
If no countries or questions are shown, the API key with requests has probably ran out of requests. Please get a new api key from https://countryapi.io 


### Mid project plan

## What We Still Plan to Do
 While the foundation of the application is complete, there are several features we still plan to implement and improve:

- **Quiz Implementation**: Finalize the functionality of the interactive quiz to make it fully operational and engaging.  
- **Profile View**: Enhance the profile view to ensure it is complete and user-friendly.  
- **Highscore View**: Create a dedicated view to display high scores and encourage competition among users.  
- **Styling and Design**: Apply CSS and styling across the entire application for a cohesive and visually appealing look.  
- **Responsiveness**: Optimize the application for different screen sizes to ensure a seamless experience on both desktop and mobile devices.  




### File Descriptions

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

### welcomeView + Presenter
Represents the main homepage of the application. Acts as the main point for users, providing navigation to other sections like quizzes, profiles, or high scores.

### logInView + presenter
The login view provides users with the option to sign in using a Google account. If the user is not logged in, the interface will emphasize the importance of logging in so that the web app can track their state and save their scores. 

### 3rd part component 
The third-party component used is https://www.radix-vue.com/components/dialog.html. In the practice view, the dialog component is utilized to display country cards with information about each searched country.


The practiceView.jsx uses the following components from the `Radix Vue` library:

- `DialogRoot`: Root component for the dialog.
- `DialogTrigger`: Element that opens the dialog.
- `DialogPortal`: Handles rendering the dialog outside the main DOM hierarchy.
- `DialogOverlay`: Background overlay for the dialog.
- `DialogContent`: Container for the dialog content.
- `DialogTitle`: Title of the dialog.
- `DialogDescription`: Description within the dialog.
- `DialogClose`: Button or element to close the dialog.

These components are used in the `CountryCard` sub-component to display country details in a modal.

---

