import React from 'react';
import { useParams } from 'react-router-dom';

function Room() {
	const { id } = useParams();
	return <h1>{`you are in room ${id}`}</h1>;
}

export default Room;
