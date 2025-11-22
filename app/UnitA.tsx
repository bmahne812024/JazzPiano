import { Link, Stack } from 'expo-router';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import lessonsData from '../data/lessons.json';

export default function UnitA() {
const backgroundImage = Platform.OS === 'web' 
    ? require('../assets/images/background-desktop.png')
    : require('../assets/images/background-mobile.png');
  

    
    const lessons = lessonsData.lessons || [];

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Unit A: Basic Jazz Chords',
                    headerTintColor: '#ffffffff',
                    headerStyle: { backgroundColor: 'rgba(0, 0, 0, 1)', },
                    headerShadowVisible: false,
                }}
            />

            <ImageBackground 
                    source={backgroundImage}
                    style={styles.container}
                    resizeMode="cover"
                  >

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
                                subtitles: JSON.stringify(lesson.subtitles || []),
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
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
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