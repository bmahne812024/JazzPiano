import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useLocalSearchParams } from 'expo-router';

type SubtitleTrack = {
  language: string;
  label: string;
  file: string;
};

type SubtitleUrl = {
  language: string;
  label: string;
  url: string;
};

export default function VideoPlayer() {
  const params = useLocalSearchParams();
  const { id, title, videoFile, description } = params;
  
  // Parse subtitles from params (comes as JSON string from navigation)
  const subtitles: SubtitleTrack[] = params.subtitles 
    ? JSON.parse(params.subtitles as string) 
    : [];
  
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [subtitleUrls, setSubtitleUrls] = useState<SubtitleUrl[]>([]);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const videoRef = ref(storage, videoFile as string);
      const url = await getDownloadURL(videoRef);
      setVideoUrl(url);
    };
    fetchVideoUrl();
  }, [videoFile]);

  // Fetch all subtitle URLs on mount
  useEffect(() => {
    const fetchSubtitleUrls = async () => {
      const urls: SubtitleUrl[] = [];
      for (const subtitle of subtitles) {
        try {
          const subtitleRef = ref(storage, subtitle.file);
          const url = await getDownloadURL(subtitleRef);
          urls.push({
            language: subtitle.language,
            label: subtitle.label,
            url: url,
          });
        } catch (error) {
          console.log(`Subtitle file not found for ${subtitle.language}:`, error);
        }
      }
      setSubtitleUrls(urls);
    };
    
    if (subtitles.length > 0) {
      fetchSubtitleUrls();
    }
  }, [subtitles]);

  // Initialize expo-video player with source
  const videoSource = videoUrl
    ? {
        uri: videoUrl,
        metadata: {
          title: title as string,
        },
      }
    : '';

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  if (!videoUrl) {
    return <ActivityIndicator />;
  }

  // For web, use HTML5 video element with track tags
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        {/* Language selector button for web */}
        {subtitles.length > 0 && (
          <View style={styles.languageBar}>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              <Text style={styles.languageButtonText}>
                {subtitles.find(s => s.language === selectedLanguage)?.label || 'Subtitles'} ▼
              </Text>
            </TouchableOpacity>
            
            {showLanguageMenu && (
              <View style={styles.languageMenu}>
                <TouchableOpacity
                  style={styles.languageOption}
                  onPress={() => {
                    setSelectedLanguage('');
                    setShowLanguageMenu(false);
                  }}
                >
                  <Text style={[styles.languageOptionText, selectedLanguage === '' && styles.selectedOption]}>
                    Off
                  </Text>
                </TouchableOpacity>
                {subtitles.map((subtitle) => (
                  <TouchableOpacity
                    key={subtitle.language}
                    style={styles.languageOption}
                    onPress={() => {
                      setSelectedLanguage(subtitle.language);
                      setShowLanguageMenu(false);
                    }}
                  >
                    <Text style={[styles.languageOptionText, selectedLanguage === subtitle.language && styles.selectedOption]}>
                      {subtitle.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
        <video
          controls
          style={{ width: '100%', height: '100%' }}
          src={videoUrl}
          crossOrigin="anonymous"
        >
          {subtitleUrls.map((subtitle, index) => (
            <track
              key={subtitle.language}
              kind="subtitles"
              src={subtitle.url}
              srcLang={subtitle.language}
              label={subtitle.label}
              default={index === 0}
            />
          ))}
        </video>
      </View>
    );
  }

  // For native, use VideoView (native subtitle support is limited)
  return (
    <View style={styles.container}>
      {/* Language selector button */}
      {subtitles.length > 0 && (
        <View style={styles.languageBar}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setShowLanguageMenu(!showLanguageMenu)}
          >
            <Text style={styles.languageButtonText}>
              {subtitles.find(s => s.language === selectedLanguage)?.label || 'Subtitles'} ▼
            </Text>
          </TouchableOpacity>
          
          {showLanguageMenu && (
            <View style={styles.languageMenu}>
              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => {
                  setSelectedLanguage('');
                  setShowLanguageMenu(false);
                }}
              >
                <Text style={[styles.languageOptionText, selectedLanguage === '' && styles.selectedOption]}>
                  Off
                </Text>
              </TouchableOpacity>
              {subtitles.map((subtitle) => (
                <TouchableOpacity
                  key={subtitle.language}
                  style={styles.languageOption}
                  onPress={() => {
                    setSelectedLanguage(subtitle.language);
                    setShowLanguageMenu(false);
                  }}
                >
                  <Text style={[styles.languageOptionText, selectedLanguage === subtitle.language && styles.selectedOption]}>
                    {subtitle.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
      
      <VideoView
        player={player}
        style={styles.video}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  languageBar: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
  },
  languageButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  languageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  languageMenu: {
    marginTop: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  languageOptionText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedOption: {
    color: '#1e90ff',
    fontWeight: '600',
  },
});
