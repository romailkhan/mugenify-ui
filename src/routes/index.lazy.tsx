import { createLazyFileRoute } from '@tanstack/react-router';
import Hero from '../components/Hero';
import Features from '../components/Features';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	return (
		<>
			<Hero />
			<Features />
		</>
	);
}
