import { Client, Account, OAuthProvider, Avatars, Databases } from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

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
    console.log("Generated Redirect URI:", redirectUri);

    //create a login url
    const loginUri = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);
    console.log("Generated Login URI:", loginUri);
    if (!loginUri)
      throw new Error("Create OAuth2 token failed1");

    // Open loginUrl and listen for the redirect(will return a url with secret and userId)
    const browserResult = await WebBrowser.openAuthSessionAsync(loginUri.toString(), redirectUri);
    console.log("Browser Result:", browserResult);

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


const database = new Databases(client);
const collectionId = "67820c19002eb77dfa84";
const databaseId = "67820b040029b35a386e";

export async function getExercises() {
  try {
    const result = await database.listDocuments(databaseId, collectionId);
    console.log(`Fetching exercises ...`);
    console.log(result);
    return result.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}
