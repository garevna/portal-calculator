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
  trafficManagementPlanCostEach
} = JSON.parse(JSON.stringify(defaults))

class DetailedCalculator {
  constructor () {
    this.distanceViaTunnels = {
      title: 'Distance via tunnels',
      type: 'number',
      value: 0,
      associated: costViaTunnelsPerMetre.value,
      readonly: true
    }

    this.distanceViaTelstra = {
      title: 'Distance via telstra',
      type: 'number',
      value: 0,
      associated: costViaTelstraOrNBNPerMetre.value,
      readonly: true
    }

    this.distanceViaNBN = {
      title: 'Distance via NBN',
      type: 'number',
      value: 0,
      associated: costViaTelstraOrNBNPerMetre.value,
      readonly: true
    }

    this.distanceCivilsOpenTrench = {
      title: 'Distance civils open trench',
      type: 'number',
      value: 0,
      associated: costForCivilsOpenTrenchPerMetre.value,
      readonly: true
    }

    this.distanceCivilsUnderboring = {
      title: 'Distance civils underboring',
      type: 'number',
      value: 0,
      associated: costForCivilsUnderboringPerMetre.value,
      readonly: true
    }

    this.numberOfP5Pits = {
      title: 'Number of P5 pits',
      type: 'number',
      value: 0,
      associated: pitCostP5.value,
      readonly: true
    }

    this.numberOfP6Pits = {
      title: 'Number of P6 pits',
      type: 'number',
      value: 0,
      associated: pitCostP6.value,
      readonly: true
    }

    this.numberOfP8P9Pits = {
      title: 'Number of P8/9 pits',
      type: 'number',
      value: 0,
      associated: pitCostP8P9.value,
      readonly: true
    }

    this.numberOfBreakoutsToTelstra = {
      title: 'Number of breakouts to telstra',
      type: 'number',
      value: 0,
      associated: breakoutCost.value,
      readonly: true
    }

    this.areaToReinstateAsphalt = {
      title: 'Number of sq m to reinstate asphalt',
      type: 'number',
      value: 0,
      associated: reinstatementAsphaltCostPerSquareMeter.value,
      readonly: true
    }

    this.arearToReinstateConcrete = {
      title: 'Number of sq m to reinstate concrete',
      type: 'number',
      value: 0,
      associated: reinstatementConcreteCostPerSquareMeter.value,
      readonly: true
    }

    this.arearToReinstateBluestone = {
      title: 'Number of sq m to reinstate bluestone',
      type: 'number',
      value: 0,
      associated: reinstatementBluestoneCostPerSquareMeter.value,
      readonly: true
    }

    this.numberOfDaysTrafficManagementRequired = {
      title: 'Number of days traffic management required',
      type: 'number',
      value: 0,
      associated: trafficManagementCostPerDay.value,
      readonly: true
    }

    this.numberOfTrafficManagementPlans = {
      title: 'Number of traffic management plans',
      type: 'number',
      value: 0,
      associated: trafficManagementPlanCostEach.value,
      readonly: true
    }
  }

  restoreDefaults () {
    this.distanceViaTunnels.associated = costViaTunnelsPerMetre.value
    this.distanceViaTelstra.associated = costViaTelstraOrNBNPerMetre.value
    this.distanceViaNBN.associated = costViaTelstraOrNBNPerMetre.value
    this.distanceCivilsOpenTrench.associated = costForCivilsOpenTrenchPerMetre.value
    this.distanceCivilsUnderboring.associated = costForCivilsUnderboringPerMetre.value
    this.numberOfP5Pits.associated = pitCostP5.value
    this.numberOfP6Pits.associated = pitCostP6.value
    this.numberOfP8P9Pits.associated = pitCostP8P9.value
    this.numberOfBreakoutsToTelstra.associated = breakoutCost.value
    this.areaToReinstateAsphalt.associated = reinstatementAsphaltCostPerSquareMeter.value
    this.arearToReinstateConcrete.associated = reinstatementConcreteCostPerSquareMeter.value
    this.arearToReinstateBluestone.associated = reinstatementBluestoneCostPerSquareMeter.value
    this.numberOfDaysTrafficManagementRequired.associated = trafficManagementCostPerDay.value
    this.numberOfTrafficManagementPlans.associated = trafficManagementPlanCostEach.value
  }

  getTotalCost () {
    let totalCost = Object.keys(this)
      .map(key => this[key].value * this[key].associated)
      .reduce((accumulator, currentValue) => accumulator + currentValue)

    let totalDustRentalCostPerMonth = ((this.distanceViaTelstra.value + this.distanceViaTunnels.value) * 4 + this.distanceViaNBN.value * 8) / 12

    totalCost = totalCost.toFixed(2)
    totalDustRentalCostPerMonth = totalDustRentalCostPerMonth.toFixed(2)

    return {
      totalCost,
      totalDustRentalCostPerMonth
    }
  }
}

export default DetailedCalculator
