import { createLazyFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { useEffect } from 'react';

const getSession = async () => {
	try {
		const response = await axios.get('http://localhost:5000/session', {
			withCredentials: true,
		});
		console.log(response.data);
	} catch (error) {
		console.error('Error during login:', error);
	}
};

export const Route = createLazyFileRoute('/app')({
	component: () => {
		// Use the useEffect hook to call getSession when the component mounts
		useEffect(() => {
			getSession();
		}, []);

		return (
			<div className="flex flex-col items-center justify-center h-screen">
				Ayoo this is /app
			</div>
		);
	},
});
