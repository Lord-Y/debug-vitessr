import { App, Plugin } from 'vue'
import { configObject } from '../apis/configs'

// only for env.json from public directory
import axios from 'axios'
async function getConfig(): Promise<any> {
  const { data } = await axios.get('http://localhost:3000/env.json')
  return data
}
let runtime: configObject
const x = getConfig()
x.then((response: any) => {
  runtime = response
})

// only for env.json
// import * as config from './env.json'
// const runtime: configObject = config

const runtimeConfigSymbol = Symbol()

export const runtimeConfig: Plugin = {
  install(app: App) {
    app.provide(runtimeConfigSymbol, runtime);
    app.config.globalProperties.$runtimeConfig = runtime
  },
}

export function useRuntimeEnv() {
  const runtimeConfig: configObject = runtime
  return runtimeConfig;
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $runtimeConfig: configObject
  }
}