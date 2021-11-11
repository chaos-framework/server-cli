import React, { FC } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import { Entity, Game, Server } from '@chaos-framework/core';
import { ChaosProvider, useChaos, useChaosAPI } from '@chaos-framework/react-lib';
import { EntityQuery, QueryAPI } from '@chaos-framework/api';
import { stringify } from 'querystring';

interface UIProps {
	api: QueryAPI,
	server: Server
}

const EntityList = (props: any) => {
	const api = useChaosAPI();
	const [, query] = useChaos(api.entities());
	return (<Text>
		{Array.from(query.map(([key, subquery]: any) => <EntityInfoRenderer key={key} query={subquery} /> ))}
	</Text>);
}

interface EntityProps {
	query: EntityQuery;
}

const EntityInfoRenderer = (props: EntityProps) => {
	const { query } = props;
	const [name] = useChaos(query.name());
	return <Text color='green'>{name}</Text>
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
