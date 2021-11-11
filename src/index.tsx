#!/usr/bin/env node
import React from 'react';
import meow from 'meow';
import { render } from 'ink';
import { Chaos, Game, isGame, Server } from '@chaos-framework/core';
import { IOServer } from '@chaos-framework/server-io';
import { QueryAPI } from '@chaos-framework/api';

import UI from './UI/UI.js';

// Define help text and CLI arguments
const cli = meow(`
  Usage
    $ chaos ../some-chaos-game/bin
    $ chaos ../some-chaos-game/bin someOption="test" someOtherOption=5

  Options
    --options, -o Path to local file containing options for the game in
      a single top-level JSON object
    --npm, -n (NOT YET IMPLEMENTED) Indicates that the path given is an
      NPM package (with optional version) to download
    --git, -g (NOT YET IMPLEMENTED) Indicates that the path given is a
      link to a .git repository online
    --github, -gh (NOT YET IMPLEMENTED) Indicates that the path given is
      an alias of a Github repo/directory ie chaos-framework/examples/chess

  Notes
    It is assumed that the path given is to a local folder with an
    index.js where the default export matches the Game interface in
    @chaos-framework/core. Otherwise the flags --github, --git, and
    --npm are prioritized in that order. Specifying --github and
    --npm will ignore the --npm flag, for example.
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
} else {
  run(path);
}

async function run(path: string, options?: string[], optionsFilePath?: string) {
  // Import the game passed
  let server: Server;
  let game: Game;
  let api: QueryAPI;
  try {
    console.log(`Loading ${path}...`);
    const module = import(path) as any;
    game = module.default?.default;
    if(!isGame(module)) {
      throw new Error(`Module specified at ${path} is not proper Chaos game module.`);
    }
    game = module;
    api = new QueryAPI(game);
    server = new IOServer(3000, game);
    game.initialize({});
    render(<UI api={api} server={server} />);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
}