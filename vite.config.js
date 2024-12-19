import { defineConfig } from 'vite';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import vuePlugin from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [
        vueJsxPlugin(),
        vuePlugin(),    //  for .vue files
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src') 
        }
    },
    server: {
        port: 8080,
    },
    build: {
        sourcemap: true,
        minify: false
    }
     
});