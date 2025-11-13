import { Link, Stack } from 'expo-router';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import lessonsData from '../data/lessons.json';

export default function UnitA() {
    const lessons = lessonsData.lessons || [];

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Jazz Piano App',
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: 'rgba(231,71,223,0.5)' },
                }}
            />

            <ScrollView contentContainerStyle={styles.container}>
                {lessons.map((lesson) => (
                    <Link
                        key={lesson.id}
                        href={{
                            pathname: '/VideoPlayer',
                            params: {
                                id: lesson.id,
                                title: lesson.title,
                                videoFile: lesson.videoFile,
                                description: lesson.description,
                            },
                        }}
                        asChild
                    >
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>{lesson.title}</Text>
                            {lesson.description ? (
                                <Text style={styles.subtitle}>{lesson.description}</Text>
                            ) : null}
                        </TouchableOpacity>
                    </Link>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0b073aff",
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#1e90ff',
        color: '#fff',
        padding: 10,
        fontSize: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        color: '#e6f0ff',
        fontSize: 12,
        marginTop: 6,
    },
});