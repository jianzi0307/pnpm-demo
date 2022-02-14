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

# npm 发布包

- npm login
- npm version patch
- npm publish --access public
