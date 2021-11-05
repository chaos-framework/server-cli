import React, { useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import { Game, Server } from '@chaos-framework/core';
import { ChaosProvider, useChaos, useChaosAPI } from '@chaos-framework/react-lib';
import { QueryAPI } from '@chaos-framework/api';

interface UIProps {
	api: QueryAPI,
	server: Server
}

const EntityList = (props: any): JSX.Element => {
	// const api = useChaosAPI();
	const [value, callback] = useState(5);
	// const entities = useChaos(api.entities());
	return (<div>hi {value}
		{/* {Array.from(entities.entries()).map((entry: any) => <span key={entry[0]}>{entry[1].name}</span>)} */}
	</div>);
}

const UI = (props: UIProps) => {
	const {exit} = useApp();

	const { api, server } = props;

	useInput((input, key) => {
		if (input === 'q') {
			if(server !== undefined) props.server.shutdown();
			exit();
		}
	});



	return (
		<ChaosProvider value={api}>
			<Text>Server running.</Text>
			<EntityList />
		</ChaosProvider>
	);
};

export default UI;
