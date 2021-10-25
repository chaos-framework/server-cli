#!/usr/bin/env node
import React from 'react';
import meow from 'meow';
import { render } from 'ink';
import { Chaos, Game, isGame } from '@chaos/core';

import UI from './UI/ui.js';

// Define help text and CLI arguments
const cli = meow(`
  Usage
    $ chaos ../some-chaos-game/bin
  `, 
  { 
    importMeta: import.meta,
  }
);

// Make sure a path for a game was specified.
const path = (cli.input[0] || cli.flags.game) as string;
if (path === undefined) {
  // Show the help text and exit the process.
  console.log(cli.help);
  process.exit(1);
}

// Import the game passed
let game;
try {
  console.log(`Loading ${path}...`);
  game = await import(path);
  game = game.default?.default;
  if(!isGame(game)) {
    console.error(`Module specified at ${path} is not proper Chaos game module.`)
    process.exit(1);
  }
  console.log(`${Chaos.id} loaded.`);
} catch (err) {
  console.error(err);
}

render(<UI name={'Chaos'}/>);
