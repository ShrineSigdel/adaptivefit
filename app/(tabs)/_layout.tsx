import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import ExercisesRoute from './exercises';
import MyWorkoutRoute from './myworkout';

const MyComponent = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'exercises', title: 'Exercises', focusedIcon: 'arm-flex', unfocusedIcon: 'arm-flex-outline' },
        { key: 'myworkout', title: 'My Workout', focusedIcon: 'star-box', unfocusedIcon: 'star-box-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        exercises: ExercisesRoute,
        myworkout: MyWorkoutRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            activeColor="#198BEF"
            inactiveColor="#69747a"
            shifting={true} 
        />
    );
};

export default MyComponent;
