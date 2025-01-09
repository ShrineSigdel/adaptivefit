import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { List } from 'react-native-paper';

const Page1: React.FC = () => {
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to the Onboarding Page 1</Text>
                <Text style={styles.paragraph}>This is the first step of the onboarding process.</Text>
            </View>
            <List.Section title="Accordions">
                <List.Accordion
                    title="Uncontrolled Accordion"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="First item" />
                    <List.Item title="Second item" />
                </List.Accordion>

                <List.Accordion
                    title="Controlled Accordion"
                    left={props => <List.Icon {...props} icon="folder" />}
                    expanded={expanded}
                    onPress={handlePress}>
                    <List.Item title="First item" />
                    <List.Item title="Second item" />
                </List.Accordion>
            </List.Section>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Page1;