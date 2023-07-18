import { IItemProp } from '@/common/types/item';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { getDateAndTimeFromString } from '@/utils/getDateFromString';
import styles from './ItemPropsList.module.css';

interface IItemPropsProps {
	props: IItemProp[];
}

const ItemPropsList = ({ props }: IItemPropsProps) => {
	return (
		<ul className={styles.propsList}>
			{props.map(prop => (
				<li key={prop.id} className={styles.prop}>
					{capitalizeFirstLetter(prop.name)}:{' '}
					{prop.type === 'date' ? getDateAndTimeFromString(prop.value, false) : prop.value}
				</li>
			))}
		</ul>
	);
};

export default ItemPropsList;
