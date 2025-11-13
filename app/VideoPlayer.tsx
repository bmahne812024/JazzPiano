import React, { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator, Platform, Button } from "react-native";
import { Video, Audio } from "expo-av";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig"; // your Firebase confi
import { useLocalSearchParams } from 'expo-router';

export default function VideoPlayer() {
  const { id, title, videoFile, description } = useLocalSearchParams();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const videoRef = useRef<any>(null); // expo-av Video ref
  const webVideoRef = useRef<any>(null); // HTMLVideoElement ref for web

  useEffect(() => {
    // Use videoFile param instead of hardcoded filename
    const fetchVideoUrl = async () => {
      const videoRef = ref(storage, videoFile as string);
      const url = await getDownloadURL(videoRef);
      setVideoUrl(url);
    };
      
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });
        setAudioReady(true);
      } catch (error) {
        console.log("Audio mode error:", error);
        setAudioReady(true);
      }
    };

    setupAudio();
    fetchVideoUrl();
  }, [videoFile]);
    

  // Try to enter fullscreen once audio is ready and the URL is available
  useEffect(() => {
    const enterFullscreen = async () => {
      if (!videoUrl || !audioReady) return;

      if (Platform.OS === "web") {
        try {
          // Browsers commonly require a user gesture to allow fullscreen; this will fail silently if blocked
          await webVideoRef.current?.requestFullscreen?.();
        } catch (e) {
          console.log(
            "Web fullscreen request failed (likely blocked by browser):",
            e
          );
        }
      } else {
        try {
          // expo-av exposes a method to present the native fullscreen player
          await videoRef.current?.presentFullscreenPlayer?.();
        } catch (e) {
          console.log("Native fullscreen request failed:", e);
        }
      }
    };

    enterFullscreen();
  }, [videoUrl, audioReady]);

  if (!videoUrl) {
    return <ActivityIndicator />;
  }

  if (Platform.OS === "web") {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <video
          ref={webVideoRef}
          width="100%"
          height="100%"
          controls
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* If the automatic requestFullscreen was blocked, show a manual button as fallback */}
        <Button
          title="Enter Fullscreen"
          onPress={() => webVideoRef.current?.requestFullscreen?.()}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        useNativeControls
        shouldPlay
        style={{ width: "100%", height: 300 }}
      />
    </View>
  );
}
