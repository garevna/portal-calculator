import { defaults } from './schema-defaults'
import SimpleCalculator from './schema-simple-calculator'
import DetailedCalculator from './schema-calculator'

const {
  pitCost,
  breakoutCost,
  civilCostPerMetre,
  viaTelstraCostPerMetre,
  distanceBetweenPits,
  distanceBetweenBreakouts,
  costViaTunnelsPerMetre,
  costViaTelstraOrNBNPerMetre,
  costForCivilsOpenTrenchPerMetre,
  costForCivilsUnderboringPerMetre,
  pitcostP5,
  pitcostP6,
  pitcostP8P9,
  asphaltCostPerSquareMeter,
  reinstatementBluestoneCostPerSquareMeter,
  trafficManagementCostPerDay,
  trafficManagementPlanCostEach
} = defaults

export {
  SimpleCalculator,
  DetailedCalculator,
  defaults,
  pitCost,
  breakoutCost,
  civilCostPerMetre,
  viaTelstraCostPerMetre,
  distanceBetweenPits,
  distanceBetweenBreakouts,
  costViaTunnelsPerMetre,
  costViaTelstraOrNBNPerMetre,
  costForCivilsOpenTrenchPerMetre,
  costForCivilsUnderboringPerMetre,
  pitcostP5,
  pitcostP6,
  pitcostP8P9,
  asphaltCostPerSquareMeter,
  reinstatementBluestoneCostPerSquareMeter,
  trafficManagementCostPerDay,
  trafficManagementPlanCostEach
}
