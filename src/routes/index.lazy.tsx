import { createLazyFileRoute } from '@tanstack/react-router';
import HeroLandingPage from '../components/Hero';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	return (
		<>
			<HeroLandingPage />
		</>
	);
}
