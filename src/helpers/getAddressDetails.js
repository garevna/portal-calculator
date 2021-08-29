export async function getAddressDetails (addressId) {
  const response = await (await fetch(`https://api.psma.com.au/v1/addresses/${addressId}?include=geo,addressDetails`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_GEOSCAPE_KEY
    }
  })).json()

  return {
    addressDetails: response.addressDetails,
    geoDatumCode: response.geo.geoDatumCode,
    geoFeature: response.geo.geoFeature,
    coordinates: response.geo.geometry.coordinates,
    geometryType: response.geo.geometry.type,
    buildingIds: response.relatedBuildingIds
  }
}
