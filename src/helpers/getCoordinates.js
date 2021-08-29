export async function getCoordinates (id) {
  this.progress = true
  const response = await (await fetch(`https://api.psma.com.au/v1/addresses/${id}/geo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_GEOSCAPE_KEY
    }
  })).json()

  const coords = response.geo.geometry.coordinates
  this.progress = false
  return { lat: coords[1], lng: coords[0] }
}
