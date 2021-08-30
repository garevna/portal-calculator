export async function postHistory (details) {
  const response = await (await fetch('https://portal.dgtek.net/calculator/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BACKEND_API_KEY,
      Credentials: process.env.VUE_APP_CREDENTIALS
    },
    body: JSON.stringify(details)
  })).json()

  return response.data
}
