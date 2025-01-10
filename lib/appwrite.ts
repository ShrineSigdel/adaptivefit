import { Client, Account, OAuthProvider } from 'react-native-appwrite';
import * as linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

//client configs
export const config = {
    platform: "com.nmb.adaptivefit",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

//create a new client instance
export const client = new Client();

client
  .setEndpoint('config.endpoint') // Your API Endpoint
  .setProject('config.projectId')   // Your Project ID
  .setPlatform('config.platform')   // Your package name 

// Create a new Account instance
export const account = new Account(client);

//handle OAuth login
export async function login(){
    try {
        const redirectUri = linking.createURL('/page1'); //redirect to onboarding page after login

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);
        if (!response) 
            throw new Error("Create OAuth2 token failed");

        // Open loginUrl and listen for the redirect(will return a url with secret and userId)
        const browserResult = await WebBrowser.openAuthSessionAsync(response.toString(), redirectUri);

        if (browserResult.type !== "success")
            throw new Error("Create OAuth2 token failed");

        // Extract credentials from OAuth redirect URL(browerResult)
        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();

        if (!secret || !userId) throw new Error("Create OAuth2 token failed");
    
        //create session with OAuth credentials
        const session = await account.createSession(OAuthProvider.Google, secret);
        if (!session) throw new Error("Failed to create session");

        //redirect as needed (will handle this through login page)

        return true; //successfully logged in

    }catch(error){
        console.error(error);
        return false;
    }
}

//function to get current user 
export async function getUser(){
    try {
        const user = await account.get();
        return user;
    }catch(error){
        console.error(error);
        return null;
    }
}

