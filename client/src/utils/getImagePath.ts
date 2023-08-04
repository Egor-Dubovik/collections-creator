type IAvatarPath = string | undefined | null;

export const getImagePath = (avatarPath: IAvatarPath, defaultPath = 'avatar.jpg') =>
	avatarPath ? avatarPath : defaultPath;
