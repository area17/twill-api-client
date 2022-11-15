import { stringify } from 'qs'
import { ofetch } from 'ofetch'

export const client = () => {
  return async (url, fetchOptions = {}) => {
    const headers = {
      ...(fetchOptions.headers || {})
    }

    if (fetchOptions.params) {
      url = `${url}${url.includes('?') ? '&' : '?'}${stringify(
        fetchOptions.params
      )}`
      delete fetchOptions.params
    }

    return await ofetch(url, {
      responseType: 'json',
      retry: 0,
      ...fetchOptions,
      headers
    }).catch((error) => {
      throw error?.data?.errors || error
    })
  }
}
