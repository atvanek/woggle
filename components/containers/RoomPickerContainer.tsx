import RoomPicker from './RoomPicker';

async function RoomPickerContainer() {
	async function getEmojiData() {
		const res = await fetch('https://cdn.jsdelivr.net/npm/@emoji-mart/data');
		const data = await res.json();
		return data;
	}
	const data = await getEmojiData();
	return <RoomPicker data={data} />;
}

export default RoomPickerContainer;
