import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './common/types/api';

export function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get('refreshToken');
	if (!refreshToken) {
		return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
	}
}

export const config = {
	matcher: ['/profile'],
};
