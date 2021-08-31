import { defaults } from './'

const {
  distanceBetweenPits,
  distanceBetweenBreakouts,
  civilCostPerMetre,
  pitCost,
  breakoutCost,
  viaTelstraCostPerMetre
} = JSON.parse(JSON.stringify(defaults))

class SimpleCalculator {
  constructor () {
    this.distanceBetweenPits = distanceBetweenPits
    this.distanceBetweenBreakouts = distanceBetweenBreakouts
    this.civilCostPerMetre = civilCostPerMetre
    this.pitCost = pitCost
    this.breakoutCost = breakoutCost
    this.viaTelstraCostPerMetre = viaTelstraCostPerMetre

    this.distance = {
      title: 'Distance to the nearest pit',
      type: 'number',
      value: 0
    }

    this.typeOfRollout = {
      title: 'Type of rollout',
      type: 'selector',
      available: ['civils', 'via telstra'],
      value: 'civils'
    }

    this.connectedToTelstra = {
      title: 'Connected to Telstra',
      type: 'switcher',
      available: ['yes', 'no'],
      value: 'no'
    }

    this.numberOfPits = {
      title: 'Number of pits',
      type: 'function',
      method: 'getNumberOfPits',
      value: undefined
    }

    this.numberOfBreakoutsToTelstra = {
      title: 'Number of breakouts to telstra',
      type: 'function',
      method: 'getNumberOfBreakoutsToTelstra',
      value: undefined
    }
  }

  setDistance (value) {
    this.distance.value = value
  }

  getTotalCost () {
    this.numberOfPits.value = this.distanceBetweenPits.value ? Math.round(this.distance.value / this.distanceBetweenPits.value + 1) : 0
    this.numberOfBreakoutsToTelstra.value = this.distanceBetweenBreakouts.value ? Math.ceil(this.distance.value / this.distanceBetweenBreakouts.value + 1) : 0

    const res = this.typeOfRollout.value === 'civils' ? this.distance.value * 1.1 * this.civilCostPerMetre.value + this.numberOfPits.value * this.pitCost.value
      : this.distance.value * 1.1 * this.viaTelstraCostPerMetre.value + this.numberOfBreakoutsToTelstra.value * this.breakoutCost.value
    let totalCost = this.distance.value ? res + (this.connectedToTelstra.value === 'yes' ? this.breakoutCost.value : 0) : 0

    let totalDustRentalCostPerMonth = this.typeOfRollout.value === 'via telstra' ? this.distance.value * 4 / 12 : 0

    totalCost = totalCost.toFixed(2)
    totalDustRentalCostPerMonth = totalDustRentalCostPerMonth.toFixed(2)

    return {
      totalCost,
      totalDustRentalCostPerMonth
    }
  }
}

export default SimpleCalculator
