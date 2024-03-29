import Room from "@/components/containers/Room";

export async function generateStaticParams() {
	const params: { emoji: string }[] = [];

	const data = await fetch(
		'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
	).then((res) => res.json());
	for (const key in await data.emojis) {
		params.push({ emoji: data.emojis[key].skins[0].native });
	}
	return params;
}

function Page({ params }: { params: { emoji: string } }) {
	const { emoji } = params;
	return <Room emoji={emoji} />;
}

export default Page;
