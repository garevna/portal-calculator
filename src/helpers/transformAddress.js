export const transformAddress = function (address) {
  const index = address.indexOf(', Australia')
  return index !== -1 ? address.slice(0, index) : address
}
