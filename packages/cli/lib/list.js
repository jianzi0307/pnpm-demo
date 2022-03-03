const { templates } = require("./templates");
const terminal = require("terminal-kit").terminal;

function list() {
  templates.forEach((item, index) => {
    terminal.yellow(`${index + 1}) ${item.name}`);
    terminal("\n");
  });
}

module.exports = {
  list,
};
