class ApiError extends Error {
	status: number;
	errors: any[];

	constructor(status: number, message: string, errors: any[] = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static badRequest(message: string, errors: any[] = []) {
		return new ApiError(400, message, errors);
	}

	static unauthorizedError() {
		return new ApiError(401, 'User not authorized');
	}
}

export default ApiError;