import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { List, Button } from 'react-native-paper';
import { Image } from 'expo-image'

const Page1: React.FC = () => {
    const [expanded, setExpanded] = React.useState(true);
    const heroImage = require('../assets/images/hero1.png');
    const theme = {
        ...DefaultTheme,
        // Specify custom property in nested object

        colors: {
            ...DefaultTheme.colors,
            primary: '#198BEF',
            secondary: '#070D81',
            text: '#000000',
            background: '#FFFFFF',
        },
    };


    const handlePress = () => setExpanded(!expanded);
    return (
        <PaperProvider theme={theme}>
            <ScrollView className='flex-col content-center h-full bg-white py-4 mb-4'>
                <View className='flex-col justify-around content-center h-52 px-4'>
                    <Text className='font-bold text-2xl text-center '>Hi There!</Text>
                    <Text className='font-light text-lg text-center'>Tell us about yourself, to help us build your profile</Text>
                    <Text className='font-bold text-lg text-center'>Tell us which best describes your impairment(s)</Text>
                </View>
                <Image source={heroImage} contentFit='cover' className='h-[220px] w-auto'></Image>
                <List.Section>
                    <List.Accordion
                        title="Upper limb - Prothesesis"
                        theme={{
                            ...theme,
                            colors: {
                                ...theme.colors,
                            },
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                        onPress={handlePress}>
                        <List.Item title="Single" titleStyle={styles.title} />
                        <List.Item title="Double" titleStyle={styles.title} />
                    </List.Accordion>
                    <List.Accordion
                        title="Lower limb - Prothesesis"
                        theme={{
                            ...theme,
                            colors: {
                                ...theme.colors,
                            },
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                        onPress={handlePress}>
                        <List.Item title="Single" titleStyle={styles.title} />
                        <List.Item title="Double" titleStyle={styles.title} />
                    </List.Accordion>
                    <List.Accordion
                        title="Upper limb - Amputee"
                        theme={{
                            ...theme,
                            colors: {
                                ...theme.colors,
                            },
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                        onPress={handlePress}>
                        <List.Item title="Single" titleStyle={styles.title} />
                        <List.Item title="Double" titleStyle={styles.title} />
                    </List.Accordion>
                    <List.Accordion
                        title="Lower limb - Amputee"
                        theme={{
                            ...theme,
                            colors: {
                                ...theme.colors,
                            },
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                        onPress={handlePress}>
                        <List.Item title="Single" titleStyle={styles.title} />
                        <List.Item title="Double" titleStyle={styles.title} />
                    </List.Accordion>
                </List.Section>
                <Button mode="contained" onPress={() => console.log('Pressed')} style={{ margin: 20, backgroundColor: '#198BEF' }}>
                    Continue
                </Button>
            </ScrollView>
        </PaperProvider>
    );
};




const styles = StyleSheet.create({
    title: {
        color: '#198BEF',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Page1;