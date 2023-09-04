import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { word } = await req.json();
	console.log(word);
	return NextResponse.json({ key: 'value' });
}
