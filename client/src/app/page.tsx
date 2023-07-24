import RecentItems from '@/components/sections/home/RecentItems/RecentItems';
import TopCollections from '@/components/sections/home/TopCollections/TopCollections';

export default async function HomePage() {
	return (
		<main className='main'>
			<section>
				<RecentItems />
				<TopCollections />
			</section>
		</main>
	);
}
