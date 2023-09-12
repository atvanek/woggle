'use client';

import { useParams } from 'next/navigation';

function Page() {
	const params = useParams();
	const id = params.id as string;
	return <p>You are in room {decodeURI(id)}</p>;
}

export default Page;
