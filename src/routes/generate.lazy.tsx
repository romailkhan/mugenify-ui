import { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, HStack, Text } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';

interface PlaylistResponse {
  uuid: string;
  theme: string;
  songs: string[];
  time: string;
}

export const Route = createLazyFileRoute('/generate')({
  component: () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status when component mounts
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('http://localhost:5000/session', {
            credentials: 'include'
          });
          setIsAuthenticated(response.ok);
        } catch (error) {
          console.error('Auth check failed:', error);
          setIsAuthenticated(false);
        }
      };
      
      checkAuth();
    }, []);

    const handleSendMessage = async () => {
      if (!isAuthenticated) {
        window.location.href = 'http://localhost:5000/login';
        return;
      }

      if (inputValue.trim()) {
        setMessages((prevMessages) => [
          ...prevMessages,
          `You: Theme "${inputValue}"`,
        ]);

        setLoading(true);

        try {
          const geminiResponse = await fetch('http://localhost:5000/gemini', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Add this to include cookies
            body: JSON.stringify({ theme: inputValue }),
          });

          if (!geminiResponse.ok) {
            throw new Error('Failed to fetch the playlist from the server.');
          }

          const playlistData: PlaylistResponse = await geminiResponse.json();

          if (!playlistData.theme || !Array.isArray(playlistData.songs) || !playlistData.uuid || !playlistData.time) {
            throw new Error('Invalid response data received from server');
          }

          const storeResponse = await fetch('http://localhost:5000/storeplaylist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Add this to include cookies
            body: JSON.stringify(playlistData),
          });

          if (!storeResponse.ok) {
            console.error('Failed to store playlist');
          }

          const formattedSongs = playlistData.songs
            .filter(song => song && song.trim().length > 0)
            .join('\n');

          setMessages((prevMessages) => [
            ...prevMessages,
            `AI: Here's a playlist for the theme "${playlistData.theme}":`,
            formattedSongs,
          ]);
        } catch (error) {
          console.error('Error:', error);
          setMessages((prevMessages) => [
            ...prevMessages,
            'AI: Sorry, there was an error generating your playlist. Please try again.',
          ]);
        } finally {
          setLoading(false);
        }

        setInputValue('');
      }
    };

    return (
      <Box p={6} background="gray.800" color="white" borderRadius="md" minHeight="100vh">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Mugenify - Your Personal Music Generator
        </Text>
        {!isAuthenticated ? (
          <Box textAlign="center" p={4}>
            <Text mb={4}>Please log in to generate playlists</Text>
            <Button 
              colorScheme="teal" 
              onClick={() => window.location.href = 'http://localhost:5000/login'}
            >
              Log In
            </Button>
          </Box>
        ) : (
          <VStack spacing={6} align="stretch">
            <Box
              className="chatbox"
              borderWidth={1}
              borderRadius="lg"
              p={4}
              height="400px"
              overflowY="auto"
              bg="gray.700"
            >
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <Box key={index} p={3} bg="gray.600" borderRadius="md" mb={4}>
                    <Text>{msg}</Text>
                  </Box>
                ))
              ) : (
                <Text textAlign="center">Tell me, what theme do you want for your playlist?</Text>
              )}
            </Box>
            <HStack>
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
              <Button
                colorScheme="teal"
                onClick={handleSendMessage}
                aria-label="Generate music"
                isLoading={loading}
              >
                Generate
              </Button>
            </HStack>
          </VStack>
        )}
      </Box>
    );
  },
});

