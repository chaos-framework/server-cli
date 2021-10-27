#!/usr/bin/env node
import React from 'react';
import meow from 'meow';
import { render } from 'ink';
import { Chaos, Game, isGame, Server } from '@chaos/core';
import { IOServer } from '@chaos-framework/server-io';

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
  cli.showHelp(1);
}

// Import the game passed
let server: Server;
let game: Game;
try {
  console.log(`Loading ${path}...`);
  let module = await import(path);
  module = module.default?.default;
  if(isGame(module)) {
    game = module;
    server = new IOServer(3000, game);
    render(<UI game={game} server={server} />);
  } else {
    console.error(`Module specified at ${path} is not proper Chaos game module.`)
    process.exit(1);
  }
} catch (err) {
  console.error(err);
}
