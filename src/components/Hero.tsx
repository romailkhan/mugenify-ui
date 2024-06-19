import { Box, Heading, Button } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

const HeroLandingPage = () => {
	return (
		<Box bg="gray.100" py={20} px={10} textAlign="center">
			<Heading as="h1" size="2xl" mb={4}>
				Yurrrskiii
			</Heading>
			{/*  button that opens a link when pressed */}
			<Link to="/login">
				<Button as="a" colorScheme="blue" size="lg">
					Get Started
				</Button>
			</Link>
		</Box>
	);
};

export default HeroLandingPage;
