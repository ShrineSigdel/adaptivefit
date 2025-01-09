import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MyWorkout from './myworkout';
import ExercisesScreen from './exercises';

const Tab = createBottomTabNavigator();

const Layout = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="MyWorkout" component={MyWorkout} />
                <Tab.Screen name="Exercises" component={ExercisesScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Layout;