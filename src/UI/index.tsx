import React, { FC } from 'react'; 
import { Text } from 'ink';

const UI: FC<{name?: string}> = ({name = 'Stranger'}) => (
	<Text>
		Hello, <Text color="green">{name}</Text>
	</Text>
);

export default UI;
