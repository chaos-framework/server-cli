import React, { FC } from 'react'; 
import { Box, Text, useApp, useInput } from 'ink';
import { Game, Server } from '@chaos-framework/core';

interface props {
	game?: Game
	server?: Server
}

const UI: FC<props> = (props) => {
	const {exit} = useApp();

	useInput((input, key) => {
		if (input === 'q') {
			if(props.server !== undefined) props.server.shutdown();
			exit();
		}
	});

	return (
		<Text>Server running.</Text>
	);
};

export default UI;
