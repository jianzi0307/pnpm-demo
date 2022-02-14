import { StorageService, StorageAdapterType } from './src/storage';

/**
 * Vue插件支持
 * @param {*} Vue 
 * @param {object} options { adapter: 'localStorage' }
 */
const install = (Vue, options = { adapter: StorageAdapterType.LocalStorage }) => {
  const ins = new StorageService()
  Vue.prototype.$storage = ins.getAdapter(options.adapter);
};

export * from './src/storage'

export default { install }

