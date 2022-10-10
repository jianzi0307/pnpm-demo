# pnpm monorepo demo

- tools 工具包
- web 包 vite + vue2.0

# pnpm 相关命令

- pnpm -w clean
- pnpm -w i
- pnpm install uuid -S -r --filter @alanojs/tools
- pnpm install typescript -D -w
- pnpm up -r --filter @alanojs/web
- pnpm version patch
- pnpm publish --no-git-checks --access public
- pnpm unpublish --force
- pnpm up -r

# npm 发布包

- npm login
- npm version patch
- npm publish --access public

# @alano/cli 依赖包

commander.js 命令行
inquirer.js 交互
colors.js 颜色
download-git-repo 从 git 仓库拉代码
chalk 颜色
progress 进度条
terminal-kit
