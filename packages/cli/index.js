#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

const packageJson = require("./package.json");

program
  .version(packageJson.version, '-v, --version')
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-p, --pizza-type <type>", "flavour of pizza");

program.parse(process.argv);

// const options = program.opts();
// console.log(options);
// console.log(packageJson, "<<<<<packageJson");
