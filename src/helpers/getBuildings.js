export async function getBuildings () {
  const response = await (await fetch(`https://api.psma.com.au/v1/addresses/${this.addressId}/buildings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_GEOSCAPE_KEY
    }
  }).catch(err => console.warn(err))).json()

  // this.buildings = response.data
  // this.$emit('update:relatedBuildingIds', this.buildingIds)

  return response.data
}
