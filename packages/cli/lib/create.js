const { promisify } = require("util");
const glob = require("glob");
// const { join } = require("path");
// const { mkdirSync, writeFileSync } = require("fs");
const download = promisify(require("download-git-repo"));
const terminal = require("terminal-kit").terminal;
const { floor } = require("./util");

function create(argv) {
  const projectName = argv;
  // const files = glob.sync(join(__dirname, "/", projectName));

  // 判断目录是否存在
  const files = glob.sync(`./${projectName}`);
  if (files.length > 0) {
    console.log(`Target directory [${projectName}] already exists.`);
    return;
  }

  // 创建目录
  // mkdirSync(projectName);
  let timestamp = new Date().getTime();
  terminal.wrap.yellow("Installing CLI plugins. This might take a while..");
  terminal("\n");
  terminal.spinner();
  download("github:jianzi0307/vue2-vite-template", `./${projectName}`, { clone: true })
    .then(() => {
      terminal.backDelete();
      const periods = floor((new Date().getTime() - timestamp) / 1000, 2);
      terminal.wrap.green(`Done in ${periods}s.`);
      terminal("\n");
      terminal.wrap.white(`🎉 Successfully created project [${projectName}]`);
      terminal("\n");
      process.exit();
    })
    .catch((err) => console.log(err));
}

module.exports = {
  create,
};
