import { Box, Heading, Text } from '@chakra-ui/react';

const Features = () => {
	return (
		<Box bg="blue.100" py={300} px={100}>
			<Heading as="h1" size="2xl" mb={4}>
				Features
			</Heading>
			<Text fontSize="xl" mb={8}>
				Discover new music with the power of AI and create the perfect playlist
			</Text>
		</Box>
	);
};

export default Features;
