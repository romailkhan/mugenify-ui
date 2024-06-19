// import { createLazyFileRoute } from '@tanstack/react-router';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useRouter } from '@tanstack/react-router';

// const handleCallback = async (router: any) => {
// 	const urlParams = new URLSearchParams(window.location.search);
// 	const code = urlParams.get('code');
// 	const state = urlParams.get('state');

// 	if (!code || !state) {
// 		console.error('Error: Missing code or state');
// 		return;
// 	}

// 	if (state !== localStorage.getItem('state')) {
// 		console.error('Error: State mismatch');
// 		window.location.href = '/login';
// 		return;
// 	}

// 	try {
// 		// Exchange the code for an access token through your backend
// 		const response = await axios.get(
// 			`http://localhost:5000/callback?code=${code}&state=${state}`
// 		);
// 		if (response.data.code === '200') {
// 			router.navigate('/app');
// 		} else {
// 			console.error('Error during callback:', response.data.message);
// 		}
// 	} catch (error) {
// 		console.error('Error during callback:', error);
// 	}
// };

// export const CallbackRoute = createLazyFileRoute('/callback')({
// 	component: () => {
// 		const router = useRouter();

// 		useEffect(() => {
// 			handleCallback(router);
// 		}, [router]);

// 		return (
// 			<div className="flex flex-col items-center justify-center h-screen">
// 				<p>Loading...</p>
// 			</div>
// 		);
// 	},
// });
