import {getCurrentInstance} from 'vue'

export function useInstance() {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('useInstance must use in setup!')
  }
  return instance
}
