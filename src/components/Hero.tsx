import { Box, Heading, Button } from '@chakra-ui/react';
import axios from 'axios';

//  function that makes a request to the server
const handleLogin = async () => {
	try {
		const response = await axios.get('http://localhost:5000/login');
		window.location.href = response.data.auth_url;
	} catch (error) {
		console.error('Error during login:', error);
	}
};

const HeroLandingPage = () => {
	return (
		<Box bg="gray.100" py={20} px={10} textAlign="center">
			<Heading as="h1" size="2xl" mb={4}>
				Welcome!
			</Heading>
			{/*  button that opens a link when pressed */}
			<Button as="a" colorScheme="blue" size="lg" onClick={handleLogin}>
				Get Started
			</Button>
		</Box>
	);
};

export default HeroLandingPage;
