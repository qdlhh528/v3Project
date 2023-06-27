import { Button } from 'vant'
import type { App } from 'vue'

export function setupComponents(app: App<Element>) {
  app.use(Button)
}
