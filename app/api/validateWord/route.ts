import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	console.log('hit');
	const { word } = await req.json();
	console.log(word);
	return NextResponse.json({ key: 'value' });
}
