# Friday App

Friday is a React application developed as a midterm project in the AppleSeeds Fullstack Developer Bootcamp. The app uses Firebase authentication to allow users to register and log in. After logging in, users can set their preferences for location, range, favorite types of hangouts (clubs, food, etc.), with whom they want to hang out (partner, friends, alone, etc.), and the price range. The app then generates a random hangout place that matches the user's preferences.

## Installation

1. Clone the repository using `git clone https://github.com/your-username/friday.git`
2. Navigate to the project directory using `cd friday`
3. Install the necessary dependencies using `npm install`
4. Start the development server using `npm start`

## Technologies Used

The following technologies were used in the development of this project:

- ReactJS
- React Router DOM
- Firebase Authentication
- Firestore Database
- Material UI
- Google Maps API
- Styled Components
- Combobox NPM Package


## Usage

After installing the app and starting the development server, you can access the app by navigating to `http://localhost:3000` in your web browser. From there, you can register or log in using Firebase authentication. Once you are logged in, you will be taken to the preferences page, where you can set your location, range, favorite types of hangouts, and other preferences. After setting your preferences, you can click the "Find Hangout" button to generate a random hangout place that matches your preferences. You can also create new places, edit existing ones, and delete them.

The app reads the places and user preferences from the Firestore database.


## Credits

The Friday app was developed by [your name] as a midterm project in the AppleSeeds Fullstack Developer Bootcamp. 

## License

This project is licensed under the terms of the MIT license.
