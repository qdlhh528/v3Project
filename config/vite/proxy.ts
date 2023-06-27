/**
 * Generate proxy
 */

import { type ProxyOptions } from 'vite'
import {
  API_BASE_URL,
  API_TARGET_URL,
  OPERATION_API_BASE_URL,
  OPERATION_API_TARGET_URL
} from '../../config/constant'

type ProxyTargetList = Record<string, ProxyOptions>

const ret: ProxyTargetList = {
  // hrssc
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), '')
  },
  // operation
  [OPERATION_API_BASE_URL]: {
    target: OPERATION_API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${OPERATION_API_BASE_URL}`), '')
  }
}

export default ret
