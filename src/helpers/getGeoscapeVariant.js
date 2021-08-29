export async function getGeoscapeVariant (data) {
  var address = data || this.$refs.autocompleteAddress.value
  const index = address.indexOf(', Australia')
  address = index !== -1 ? address.slice(0, index) : address

  this.progress = true

  const response = (await (await fetch(`https://api.psma.com.au/v1/predictive/address?maxNumberOfResults=1&query=${encodeURIComponent(address)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_GEOSCAPE_KEY
    }
  })).json())

  this.progress = false

  return response && response.suggest ? response.suggest[0] : null
}
