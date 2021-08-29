export async function getVariants (val) {
  return (await (await fetch(`https://api.psma.com.au/v1/predictive/address?maxNumberOfResults=20&query=${encodeURIComponent(val)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_GEOSCAPE_KEY
    }
  })).json()).suggest
}
