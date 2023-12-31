import RecentItems from '@/components/sections/home/RecentItems/RecentItems';
import TopCollections from '@/components/sections/home/TopCollections/TopCollections';
import Tags from '@/components/sections/Tags/Tags';

export default async function HomePage() {
	return (
		<main className='main'>
			<RecentItems />
			<TopCollections />
			<Tags />
		</main>
	);
}
