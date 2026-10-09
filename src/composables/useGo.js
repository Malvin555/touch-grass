import { useRouter } from 'vue-router'

export function useGo() {
  const router = useRouter()

  return (name, query = {}, params = {}, options = {}) =>
    router.push({
      name,
      params,
      query,
      ...options,
    })
}
