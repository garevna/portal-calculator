export async function getDistance (lat, lng) {
  const response = await (await fetch('https://portal.dgtek.net/calculator/distance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BACKEND_API_KEY,
      Credentials: process.env.VUE_APP_CREDENTIALS
    },
    body: JSON.stringify({ lat, lng })
  })).json()

  console.log('FETCH RESPONSE:\n', response)

  return response
}
