import { createLazyFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import NavBar from '../components/Navbar';
import { Avatar } from '@chakra-ui/react';

interface SessionData {
	// Define the shape of your session data here
	id: string;
	token: string;
	display_name: string;
	images: { height: number; url: string; width: number }[];
	// Add other fields as necessary
}

const getSession = async (): Promise<SessionData | null> => {
	try {
		const response = await axios.get('http://localhost:5000/session', {
			withCredentials: true,
		});
		console.log(response.data);
		return response.data as SessionData;
	} catch (error) {
		console.error('Error during login:', error);
		return null;
	}
};

export const Route = createLazyFileRoute('/app')({
	component: () => {
		const isCalledRef = useRef(false);
		const [sessionData, setSessionData] = useState<SessionData | null>(null);

		useEffect(() => {
			if (!isCalledRef.current) {
				getSession().then((data) => {
					if (data) {
						sessionStorage.setItem('sessionData', JSON.stringify(data)); // Store session data in sessionStorage
						setSessionData(data);
					}
				});
				isCalledRef.current = true;
			}
		}, []);

		const avatarURL = sessionData?.images[1]?.url ?? '';

		// Accessing sessionData directly from state
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<NavBar avatarUrl={avatarURL} />
				Ayoo this is /app
				<div>
					Session Data:{' '}
					{sessionData ? JSON.stringify(sessionData) : 'No session data'}
				</div>
			</div>
		);
	},
});
