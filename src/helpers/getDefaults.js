export async function getDefaults () {
  console.log(process.env.VUE_APP_BACKEND_API_KEY)
  const response = await (await fetch('https://portal.dgtek.net/calculator/defaults', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BACKEND_API_KEY,
      Credentials: process.env.VUE_APP_CREDENTIALS
    }
  })).json()

  return response.data.defaults
}
