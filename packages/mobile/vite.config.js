import { createVuePlugin } from "vite-plugin-vue2";
import { defineConfig, loadEnv } from "vite";

export default ({ command, mode }) => {
  const env = loadEnv(mode, "./");

  return defineConfig({
    plugins: [createVuePlugin()],
    server: {
      host: env.VITE_HOST,
      port: env.VITE_PORT,
      open: true,
      https: false,
      ssr: false,
      base: env.VITE_BASE_URL,
      outDir: env.VITE_OUTPUT_DIR,
      define: {
        "process.env": {},
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
