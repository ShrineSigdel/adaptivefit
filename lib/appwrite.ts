import { Client, Account, OAuthProvider, Avatars, Databases, Query } from 'react-native-appwrite';
import * as Linking from 'expo-linking';

import { openAuthSessionAsync } from 'expo-web-browser';

//client configs
export const config = {
  platform: "com.nmb.adaptivefit",
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "677fb0200018b55d1de7"
}

//create a new client instance
export const client = new Client();


client
  .setEndpoint(config.endpoint) // Your API Endpoint
  .setProject(config.projectId)   // Your Project ID
  .setPlatform(config.platform)   // Your package name 

// Create a new Account instance
export const account = new Account(client);

//create a new Avatars instance
export const avatar = new Avatars(client);

//handle OAuth login
export async function login() {
  try {
    // Create a deep link that works across Expo environments
    // Ensure localhost is used for the hostname to validation error for success/failure URLs
    const redirectUri = Linking.createURL("/page1");

    //create a login url
    const loginUri = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);
    if (!loginUri)
      throw new Error("Create OAuth2 token failed1");

    // Open loginUrl and listen for the redirect(will return a url with secret and userId)
    const browserResult = await openAuthSessionAsync(loginUri.toString(), redirectUri);

    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed2");

    // Extract credentials from OAuth redirect URL(browerResult)
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get('secret');
    const userId = url.searchParams.get('userId');

    if (!secret || !userId) throw new Error("Create OAuth2 token failed3");

    //create session with OAuth credentials
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    //redirect as needed (will handle this through login page)

    return true; //successfully logged in

  } catch (error) {
    console.error(error);
    return false;
  }
}


//function to get current user 
export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name); //name initials 

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//user preferences 
export const saveUserPreferences = async (preferences: any) => {
  try {
    const result = await account.updatePrefs(preferences);
  } catch (error) {
    console.log(error);
  }
}



const database = new Databases(client);
const ExerciseCollectionId = "67820c19002eb77dfa84";
const databaseId = "67820b040029b35a386e";

export async function getExercises(impairmentType: string, impairmentLevel: string) { //pass in user preferences to be used as query
  try {
    const result = await database.listDocuments(databaseId, ExerciseCollectionId, [
      Query.search("impairmentType", impairmentType),
      Query.equal("impairmentLevel", impairmentLevel)
    ]);
    return result.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getExerciseDetails(exerciseId: string) {
  try {
    const result = await database.getDocument(databaseId, ExerciseCollectionId, exerciseId);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


const MyWorkoutCollectionId = "6782bcba000a3a06bc8f";

export async function createWorkout(userId: string, exerciseId: string) {
  try {
    const workout = {
      userId, // Associate with user
      exercises: [exerciseId], // Initialize with the first exercise
    };

    const result = await database.createDocument(databaseId, MyWorkoutCollectionId, 'unique()', workout);
    console.log('Workout created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating workout:', error);
    return null;
  }
}


export async function addExerciseToWorkout(workoutId: string, exerciseId: string) {
  try {
    // Fetch the workout document
    const workout = await database.getDocument(databaseId, MyWorkoutCollectionId, workoutId);

    // Update the exercises array
    const updatedExercises = [...workout.exercises, exerciseId];
    const result = await database.updateDocument(databaseId, MyWorkoutCollectionId, workoutId, {
      exercises: updatedExercises,
    });

    console.log('Exercise added successfully:', result);
    return result;
  } catch (error) {
    console.error('Error adding exercise to workout:', error);
    return null;
  }
}


export const getMyWorkout = async (userId: string) => {
  try {
    const workouts = await database.listDocuments(databaseId, MyWorkoutCollectionId, [
      Query.equal('userId', userId),
    ]);

    // Fetch detailed exercises for each workout
    const workoutsWithExercises = await Promise.all(
      workouts.documents.map(async (workout) => {
        const exerciseDetails = await Promise.all(
          workout.exercises.map(async (exerciseId: string) => {
            try {
              const exercise = await database.getDocument(databaseId, ExerciseCollectionId, exerciseId);
              return exercise; // Return the exercise details
            } catch (error) {
              console.error(`Error fetching exercise with ID ${exerciseId}:`, error);
              return null;
            }
          })
        );

        return { ...workout, exercises: exerciseDetails.filter(Boolean) }; // Filter out nulls
      })
    );

    return workoutsWithExercises;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
};

export async function getWorkoutId(userId: string) {
  try {
    console.log('Fetching workout for userId:', userId);

    const workouts = await database.listDocuments(databaseId, MyWorkoutCollectionId, [
      Query.equal('userId', userId), // Ensure this matches your database schema
    ]);

    if (workouts.documents.length === 0) {
      console.log('No workout found for the user');
      return null; // Return null if no workout exists
    }

    const workoutId = workouts.documents[0].$id;
    console.log('Found workout ID:', workoutId);
    return workoutId;
  } catch (error) {
    console.error('Error fetching workout ID:', error);
    return null;
  }
}


