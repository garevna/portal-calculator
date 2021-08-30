export async function saveDefaults (data) {
  console.log(data)
  const response = await fetch('https://portal.dgtek.net/calculator/defaults', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BACKEND_API_KEY,
      Credentials: process.env.VUE_APP_CREDENTIALS
    },
    body: JSON.stringify(data)
  })

  return response.status
}
