'use client';

type BlockProps = {
	letter: string;
	id: string;
};

function Block({ letter, id }: BlockProps) {
	function handleBlockClick() {
		const currentBox = document.getElementById(id);
		console.log(currentBox?.classList);
		currentBox?.classList.contains('selected')
			? currentBox?.classList.remove('selected')
			: currentBox?.classList.add('selected');
	}
	return (
		<div className='scene cursor-pointer' onClick={handleBlockClick}>
			<div className='cube' id={id}>
				<div className='cube__face cube__face--front flex justify-center items-center'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--back flex justify-center items-center'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--right flex justify-center items-center'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--left flex justify-center items-center'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--top flex justify-center items-center'></div>
				<div className='cube__face cube__face--bottom flex justify-center items-center'></div>
			</div>
		</div>
	);
}

export default Block;
