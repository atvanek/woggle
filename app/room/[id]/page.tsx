export async function generateStaticParams() {
	const params: { id: string }[] = [];

	const posts = await fetch(
		'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
	).then((res) => res.json());

	for (const key in await posts.emojis) {
		params.push({ id: key });
	}
	return params;
}

function Page({ params }: any) {
	const { id } = params;
	// const { message } = useSocketConnect(id);
	return <p>You are in room {id}</p>;
}

export default Page;
