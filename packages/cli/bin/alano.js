#!/usr/bin/env node

const packageJson = require("../package.json");

const { Command } = require("commander");
const program = new Command();

const { list, create } = require("../lib");

// alano list
program.command("list").description("show templates").action(list);

// alano create <project-name>
program
  .command("create <project-name>")
  .description("create a new project")
  .action(create);

program
  .version(packageJson.version, "-v, --version")
  .description(packageJson.description)
  .parse(process.argv);
