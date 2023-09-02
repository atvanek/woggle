
function Block({ letter, id }) {
	
	return (
		<div className='scene' >
			<div className='cube pointer' id={id}>
				<div className='cube__face cube__face--front flex center-all'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--back flex center-all'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--right flex center-all'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--left flex center-all'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--top flex center-all'></div>
				<div className='cube__face cube__face--bottom flex center-all'></div>
			</div>
		</div>
	);
}

export default Block;
