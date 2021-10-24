#!/usr/bin/env node
import React from 'react';
// import meow from 'meow';
import { render } from 'ink';

import UI from './UI';

// const cli = meow(`
// Usage
//   $ chaos ../some-chaos-game/bin

// Options
//   --game Redundant flag, as it is the default parameter. Path to game folder or file (automatically assumes index.js otherwise).

// Examples
//   $ ink --game ../chaos-game/bin
// `);

render(<UI name={'Chaos'}/>);