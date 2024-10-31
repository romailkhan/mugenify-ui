import { Box, Heading, Button, Text } from '@chakra-ui/react';
import axios from 'axios';

// Function that makes a request to the server
const handleLogin = async () => {
	try {
		const response = await axios.get('http://localhost:5000/login', {
			withCredentials: true,
		});
		window.location.href = response.data.auth_url;
	} catch (error) {
		console.error('Error during login:', error);
	}
};

const Hero = () => {
	return (
		<Box bg="gray.100" py={300} px={100} textAlign="center">
			<Heading as="h1" size="2xl" mb={4}>
				Mugenify
			</Heading>
			<Text fontSize="xl" mb={8}>
				Discover new music with the power of Google Gemini and create the
				perfect playlist
			</Text>

			<Button as="a" colorScheme="blue" size="lg" onClick={handleLogin}>
				Get Started
			</Button>
		</Box>
	);
};

export default Hero;
