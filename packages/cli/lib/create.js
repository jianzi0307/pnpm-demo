const { promisify } = require("util");
const glob = require("glob");
// const { join } = require("path");
// const { mkdirSync, writeFileSync } = require("fs");
const download = promisify(require("download-git-repo"));
const terminal = require("terminal-kit").terminal;
const inquirer = require("inquirer");
const { floor } = require("./util");
const { templates } = require("./templates");

function create(argv) {
  const projectName = argv;
  // const files = glob.sync(join(__dirname, "/", projectName));

  // 判断目录是否存在
  const files = glob.sync(`./${projectName}`);
  if (files.length > 0) {
    console.log(`Target directory [${projectName}] already exists.`);
    return;
  }

  inquirer
    .prompt([
      {
        type: "list",
        message: "请选择一个模板",
        name: "templates",
        default: templates[0],
        choices: templates,
      },
    ])
    .then((res) => {
      const rs = templates.filter((item) => item.name === res.templates);
      if (rs.length > 0) {
        const repo = rs[0].repo;

        // 统计时间
        let timestamp = new Date().getTime();
        terminal(`Scaffolding project in ./${projectName}...\n\n`);
        terminal.spinner();
        download(repo, `./${projectName}`, { clone: true })
          .then(() => {
            terminal.backDelete();
            const periods = floor((new Date().getTime() - timestamp) / 1000, 2);
            terminal.green(`Done in ${periods}s. \n\n`);
            terminal(`Now run:\n\n`);
            terminal(`\tcd ${projectName}\n`);
            terminal(`\tnpm install (or \`yarn\`)\n`);
            terminal(`\tnpm run dev (or \`yarn dev\`)\n`);
            process.exit();
          })
          .catch((err) => console.log(err));
      }
    });

  // 创建目录
  // mkdirSync(projectName);
}

module.exports = {
  create,
};
