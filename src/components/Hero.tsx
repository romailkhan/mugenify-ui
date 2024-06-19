import { Box, Heading, Button, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

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
			<Link to="/login">
				<Button as="a" colorScheme="blue" size="lg">
					Get Started
				</Button>
			</Link>
		</Box>
	);
};

export default Hero;
