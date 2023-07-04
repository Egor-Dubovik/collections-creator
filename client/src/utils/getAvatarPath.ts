type IAvatarPath = string | undefined | null;

export const getAvatarPath = (avatarPath: IAvatarPath, defaultPath = 'avatar.jpg') =>
	avatarPath ? avatarPath : defaultPath;
