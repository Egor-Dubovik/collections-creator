export const getLinkDecoration = (route: string, pathname: string) =>
	route === pathname ? 'underline' : 'none';
