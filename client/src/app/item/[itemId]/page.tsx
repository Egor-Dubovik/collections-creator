import ItemContent from '@/components/item/ItemContent/ItemContent';
import ItemService from '@/service/ItemService';
import styles from './styles.module.css';

export async function generateStaticParams() {
	const items = await ItemService.getAll();
	return items.map(item => ({
		itemId: String(item.id),
	}));
}

interface ItemPageProps {
	params: {
		itemId: string;
	};
}

const ItemPage = async ({ params }: ItemPageProps) => {
	const itemId = params.itemId;

	return (
		<main className='main'>
			<section className={styles.item}>
				<div className='item__container'>
					<ItemContent itemId={itemId} />
				</div>
			</section>
		</main>
	);
};

export default ItemPage;
