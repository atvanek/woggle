import RoomContainer from '@/components/containers/RoomContainer';

export async function generateStaticParams() {
	const params: { id: string }[] = [];

	const data = await fetch(
		'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
	).then((res) => res.json());

	for (const key in await data.emojis) {
		params.push({ id: key });
	}
	return params;
}

function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	return <RoomContainer id={id} />;
}

export default Page;
