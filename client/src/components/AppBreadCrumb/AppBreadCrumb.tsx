import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { ICrumbLink } from '@/common/types/app';
import Link from 'next/link';
import styles from './AppBreadCrumb.module.css';

interface IAppBreadCrumbProps {
	links: ICrumbLink[];
}

const AppBreadCrumb = ({ links }: IAppBreadCrumbProps) => {
	return (
		<Breadcrumb
			className={styles.breadcrumb}
			separator={<ChevronRightIcon color='gray.500' />}
			spacing='8px'
		>
			{links.map((link, index) => (
				<BreadcrumbItem key={index}>
					<Link className={styles.link} href={link.path}>{link.value}</Link>
				</BreadcrumbItem>
			))}
		</Breadcrumb>
	);
};

export default AppBreadCrumb;
