// import { createLazyFileRoute } from '@tanstack/react-router';
// import axios from 'axios';

// // Function that makes a request to the server
// const handleLogin = async () => {
// 	try {
// 		const response = await axios.get('http://localhost:5000/login', {
// 			withCredentials: true,
// 		});
// 		window.location.href = response.data.auth_url;
// 	} catch (error) {
// 		console.error('Error during login:', error);
// 	}
// };

// export const Route = createLazyFileRoute('/login')({
// 	component: () => (
// 		<div className="flex flex-col items-center justify-center h-screen">
// 			<button
// 				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// 				onClick={handleLogin}
// 			>
// 				Login with Spotify
// 			</button>
// 		</div>
// 	),
// });
