import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser } from "./appwrite";
import { getUserPreferences } from "./appwrite";
import { account } from "./appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Preferences {
  impairementType: string;
  impairementLevel: string;
  exerciseRoutine: string;
  assistanceNeeded: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  preferences: Preferences;
  refetchUser: () => Promise<void>;
  setUserPreferences: (key: keyof Preferences, value: string) => void;
  
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

//created a interface for the children prop
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<Preferences>({
    impairementType: '',
    impairementLevel: '',
    exerciseRoutine: '',
    assistanceNeeded: '', 
  });

  //to get the user during login or mounting the global provider
  const initializeUser = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        const userPreferences = await getUserPreferences(currentUser.$id);
        setPreferences(userPreferences);
      } else {
        throw new Error("No user session found");
      }
    } catch (error) {
      console.log("Error fetching user or invalid session. Clearing sessions...");
      await account.deleteSessions(); // Clear any cached session
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  //function to set the user preferences
  const setUserPreferences = (key: keyof Preferences, value: string) => {
    if (!user) return;
    const newPreferences = {
      ...preferences,
      [key]: value,
    };
    setPreferences(newPreferences);
  }

  // Initialize user on app mount
  useEffect(() => {
    initializeUser();
  }, []);

  //any changes in preferences 
  useEffect(() => {
    console.log("Preferences:", preferences);
  },[preferences]);
    
  //any changes in user
  useEffect(() => {
    if (user) {
      console.log("User:", user);
      console.log("isLogged:", isLogged);
    }
  }, [user]);

  //a wrapper around initialize user (used after login logouts to refetch user)
  const refetchUser = async () => {
    await initializeUser();
  };

  const isLogged = !!user;

  return (
    <GlobalContext.Provider
      value={{
        user,
        isLogged,
        loading,
        preferences,
        refetchUser,
        setUserPreferences
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = ():GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;

