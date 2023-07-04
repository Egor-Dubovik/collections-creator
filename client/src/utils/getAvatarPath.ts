export const getAvatarPath = (avatarPath: string | undefined, defaultPath = 'avatar.jpg') =>
	avatarPath ? avatarPath : defaultPath;
