import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, HStack, Text, NumberInput, NumberInputField } from '@chakra-ui/react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';

interface PlaylistResponse {
  uuid: string;
  theme: string;
  songs: string[];
  time: string;
}

export const Route = createLazyFileRoute('/generate')({
  component: () => {
    const navigate = useNavigate();
    const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistResponse | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [songCount, setSongCount] = useState<number>(5);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('http://localhost:5000/session', {
            credentials: 'include'
          });
          if (!response.ok) {
            navigate({ to: '/' });
          }
          setIsAuthenticated(response.ok);
        } catch (error) {
          console.error('Auth check failed:', error);
          setIsAuthenticated(false);
          navigate({ to: '/' });
        }
      };
      
      checkAuth();
    }, [navigate]);

    const handleGeneratePlaylist = async () => {
      if (!isAuthenticated) {
        window.location.href = 'http://localhost:5000/login';
        return;
      }

      if (inputValue.trim()) {
        setLoading(true);

        try {
          const geminiResponse = await fetch('http://localhost:5000/gemini', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ 
              theme: inputValue,
              songCount: songCount
            }),
          });

          if (!geminiResponse.ok) {
            throw new Error('Failed to fetch the playlist from the server.');
          }

          const playlistData: PlaylistResponse = await geminiResponse.json();

          if (!playlistData.theme || !Array.isArray(playlistData.songs) || !playlistData.uuid || !playlistData.time) {
            throw new Error('Invalid response data received from server');
          }

          setCurrentPlaylist(playlistData);
        } catch (error) {
          console.error('Error:', error);
          setCurrentPlaylist(null);
        } finally {
          setLoading(false);
          setInputValue('');
        }
      }
    };

    const handleSavePlaylist = async () => {
      if (currentPlaylist) {
        try {
          const response = await fetch('http://localhost:5000/storesongs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(currentPlaylist),
          });

          if (!response.ok) {
            throw new Error('Failed to store playlist');
          }

          // Clear the current playlist after successful save
          setCurrentPlaylist(null);
        } catch (error) {
          console.error('Error saving playlist:', error);
        }
      }
    };

    const handleDiscardPlaylist = () => {
      setCurrentPlaylist(null);
    };

    return (
      <Box p={6} background="gray.800" color="white" borderRadius="md" minHeight="100vh">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Mugenify - Your Personal Music Generator
        </Text>
        {isAuthenticated && (
          <VStack spacing={6} align="stretch">
            {/* Playlist Generation Form */}
            <Box p={4} borderWidth={1} borderRadius="lg" bg="gray.700">
              <VStack spacing={4}>
                <Input
                  placeholder="Enter a theme for your playlist (e.g., summer vibes, workout, relaxation)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  aria-label="Theme input"
                  bg="gray.600"
                  color="white"
                  border="none"
                  _placeholder={{ color: 'gray.400' }}
                  isDisabled={loading}
                />
                
                {/* Number of songs input */}
                <HStack width="full">
                  <Text>Number of songs:</Text>
                  <NumberInput
                    defaultValue={5}
                    min={1}
                    max={20}
                    value={songCount}
                    onChange={(valueString) => setSongCount(Number(valueString))}
                    bg="gray.600"
                    borderRadius="md"
                  >
                    <NumberInputField />
                  </NumberInput>
                </HStack>

                <Button
                  colorScheme="teal"
                  onClick={handleGeneratePlaylist}
                  aria-label="Generate music"
                  isLoading={loading}
                  width="full"
                >
                  Generate Playlist
                </Button>
              </VStack>
            </Box>

            {/* Display Current Playlist */}
            {currentPlaylist && (
              <Box p={4} borderWidth={1} borderRadius="lg" bg="gray.700">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  Playlist for theme: {currentPlaylist.theme}
                </Text>
                <VStack align="stretch" spacing={2}>
                  {currentPlaylist.songs.map((song, index) => (
                    <Box key={index} p={2} bg="gray.600" borderRadius="md">
                      <Text>{song}</Text>
                    </Box>
                  ))}
                </VStack>
                
                {/* Save/Discard Buttons */}
                <HStack spacing={4} mt={4} justify="center">
                  <Button
                    colorScheme="green"
                    onClick={handleSavePlaylist}
                  >
                    Save Playlist
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={handleDiscardPlaylist}
                  >
                    Discard
                  </Button>
                </HStack>
              </Box>
            )}
          </VStack>
        )}
      </Box>
    );
  },
});

