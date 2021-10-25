import React, { FC } from 'react'; 
import { Box, Text } from 'ink';

const UI: FC<{name?: string}> = ({name = 'Stranger'}) => (
	<Box borderStyle="double" flexGrow={1}>
		<Text>
			Hello, <Text italic color="green">{name}</Text>
		</Text>
	</Box>
);

export default UI;
