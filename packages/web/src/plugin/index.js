import { default as TimerManager } from "@alanojs/timer";
import Storage, { StorageAdapterType } from '@alanojs/storage';
import { default as request } from './http';

const plugins = [
  { plugin: Storage, options: { adapter: StorageAdapterType.Cookie } },
  { plugin: request, options: null },
  { plugin: TimerManager, options: null }
]

export default {
  install: (_vue) => {
    plugins.forEach(item => {
      _vue.use(item.plugin, item.options);
    })
  }
};
