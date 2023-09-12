'use client';

import { useParams } from 'next/navigation';
import {io} from 'socket.io-client'

function Page() {
	const params = useParams();
	const id = params.id as string;
	return <p>You are in room {decodeURI(id)}</p>;
}

export default Page;
