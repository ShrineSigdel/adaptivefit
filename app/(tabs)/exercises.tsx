import * as React from 'react';
import { ScrollView } from 'react-native';
import ExerciseCard from '@/components/ExerciseCard';

const Exercises = () => {

    const dummyImage = require('@/assets/images/dummy.png');
    return (


        <ScrollView className='flex-1 align-center px-2 py-4'>
            <ExerciseCard title="Barbell Back Squat" image={dummyImage} tags={["Legs", "Liftingbar"]}></ExerciseCard>
            <ExerciseCard title="Barbell Back Squat" image={dummyImage} tags={["Legs", "Liftingbar"]}></ExerciseCard>
        </ScrollView>
    )
}

export default Exercises;