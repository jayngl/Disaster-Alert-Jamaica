# Disaster Alert Jamaica

## Overview
**Disaster Alert Jamaica** is a React Native app designed to provide real-time alerts, shelter locations, and emergency reporting during natural disasters in Jamaica. The app aims to help users stay informed and find safe locations quickly.

## Features
- 📍 **Map with Shelter Locations** – Find nearby shelters with ease.
- ⚠️ **Real-Time Alerts** – Get the latest disaster alerts and warnings.
- 🏠 **Get Shelter Near You** – Uses geolocation to find the closest shelter.
- 🚨 **Emergency Reporting** – Report emergencies to relevant authorities.
- 🔒 **User Authentication** – Secure sign-up and login using Firebase.

## Technologies Used
- **React Native** (Expo)
- **Firebase Firestore** (for real-time alerts & emergency reports)
- **Firebase Authentication** (for user authentication)
- **React Navigation** (for smooth app navigation)
- **Google Maps API** (for shelter locations & directions)

## Installation & Setup
### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Have a Firebase project set up

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/jayngl/Disaster-Alert-Jamaica.git
   cd Disaster-Alert-Jamaica
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Add your Firebase config to `firebaseConfig.js`:
   ```js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   export default firebaseConfig;
   ```
4. Start the app:
   ```sh
   expo start
   ```

## Screenshots
![photo_5071393655817875055_y](https://github.com/user-attachments/assets/54a2cd95-2d22-412d-9e22-5f55bc91b430)
![photo_5071393655817875053_y](https://github.com/user-attachments/assets/4e4aa4fa-6a2b-4455-b966-532373244920)
![photo_5071393655817875043_y](https://github.com/user-attachments/assets/c4099765-aaf4-4cc7-b879-9a8919bf28ce)
![photo_5071393655817875044_y](https://github.com/user-attachments/assets/7ccc26f8-3e98-4581-a606-63cf12d580d9)
![photo_5071393655817875052_y](https://github.com/user-attachments/assets/8f4ab20d-2eee-4517-b0b3-d5d7a544174a)
![photo_5071393655817875048_y](https://github.com/user-attachments/assets/e5a95492-5a4f-4b1f-aca2-e24e65185f98)


## Contribution
Contributions are welcome! Feel free to submit issues and pull requests.

## License
MIT License

## Contact
For questions or feedback, contact **jayngl** at https://github.com/jayngl.

