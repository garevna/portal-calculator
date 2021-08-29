import { defaults } from './'

const {
  costViaTunnelsPerMetre,
  costViaTelstraOrNBNPerMetre,
  costForCivilsOpenTrenchPerMetre,
  costForCivilsUnderboringPerMetre,
  pitCostP5,
  pitCostP6,
  pitCostP8P9,
  breakoutCost,
  reinstatementAsphaltCostPerSquareMeter,
  reinstatementConcreteCostPerSquareMeter,
  reinstatementBluestoneCostPerSquareMeter,
  trafficManagementCostPerDay,

  distanceBetweenPits,
  distanceBetweenBreakouts,
  civilCostPerMetre,
  pitCost,
  viaTelstraCostPerMetre
} = JSON.parse(JSON.stringify(defaults))

class SimpleCalculator {
  constructor () {
    this.costViaTunnelsPerMetre = costViaTunnelsPerMetre
    this.costViaTelstraOrNBNPerMetre = costViaTelstraOrNBNPerMetre
    this.costForCivilsOpenTrenchPerMetre = costForCivilsOpenTrenchPerMetre
    this.costForCivilsUnderboringPerMetre = costForCivilsUnderboringPerMetre
    this.pitCostP5 = pitCostP5
    this.pitCostP6 = pitCostP6
    this.pitCostP8P9 = pitCostP8P9
    this.breakoutCost = breakoutCost
    this.reinstatementAsphaltCostPerSquareMeter = reinstatementAsphaltCostPerSquareMeter
    this.reinstatementConcreteCostPerSquareMeter = reinstatementConcreteCostPerSquareMeter
    this.reinstatementBluestoneCostPerSquareMeter = reinstatementBluestoneCostPerSquareMeter
    this.trafficManagementCostPerDay = trafficManagementCostPerDay

    this.distanceBetweenPits = distanceBetweenPits
    this.distanceBetweenBreakouts = distanceBetweenBreakouts
    this.civilCostPerMetre = civilCostPerMetre
    this.pitCost = pitCost
    this.viaTelstraCostPerMetre = viaTelstraCostPerMetre

    this.distance = {
      title: 'Distance to the nearest pit',
      type: 'number',
      value: 0
    }

    this.distanceViaTunnels = {
      title: 'Distance via tunnels',
      type: 'number',
      value: 0
    }

    this.distanceViaTelstra = {
      title: 'Distance via telstra',
      type: 'number',
      value: 0
    }

    this.distanceViaNBN = {
      title: 'Distance via NBN',
      type: 'number',
      value: 0
    }

    this.distanceCivilsOpenTrench = {
      title: 'Distance civils open trench',
      type: 'number',
      value: 0
    }

    this.distanceCivilsUnderboring = {
      title: 'Distance civils underboring',
      type: 'number',
      value: 0
    }

    this.numberOfP5Pits = {
      title: 'Number of P5 pits',
      type: 'number',
      value: 0
    }

    this.numberOfP6Pits = {
      title: 'Number of P6 pits',
      type: 'number',
      value: 0
    }

    this.numberOfP8P9Pits = {
      title: 'Number of P8/9 pits',
      type: 'number',
      value: 0
    }

    this.numberOfBreakoutsToTelstra = {
      title: 'Number of breakouts to telstra',
      type: 'number',
      value: 0
    }

    this.areaToReinstateAsphalt = {
      title: 'Number of sq m to reinstate asphalt',
      type: 'number',
      value: 0
    }

    this.arearToReinstateConcrete = {
      title: 'Number of sq m to reinstate concrete',
      type: 'number',
      value: 0
    }

    this.arearToReinstateBluestone = {
      title: 'Number of sq m to reinstate bluestone',
      type: 'number',
      value: 0
    }

    this.numberOfDaysTrafficManagementRequired = {
      title: 'Number of days traffic management required',
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

const example = new SimpleCalculator()

example.setDistance(371)
example.typeOfRollout = 'via telstra'
example.connectedToTelstra = 'yes'

console.log('EXAMPLE:\n', example)
console.log('CALCS:\n', example.getTotalCost())
console.log('numberOfPits: ', example.numberOfPits.value)
console.log('numberOfBreakoutsToTelstra: ', example.numberOfBreakoutsToTelstra.value)

// export const simpleCalculator = new SimpleCalculator()

export default SimpleCalculator
