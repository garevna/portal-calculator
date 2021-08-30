<template>
  <v-container class="homefone">
    <v-row justify="center" align="center">
      <v-col cols="7" md="6" lg="5" class="text-right">
        <p><small>Total cost:</small></p>
      </v-col>
      <v-col cols="5" md="4" lg="3">
        <p><b>{{ totalCost }}</b></p>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="7" md="6" lg="5" class="text-right">
        <p><small>Total duct rental cost per month:</small></p>
      </v-col>
      <v-col cols="5" md="4" lg="3">
        <p><b>{{ totalDustRentalCostPerMonth }}</b></p>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-expansion-panels flat class="transparent mt-4" style="max-width: 360px">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h5>
              <v-icon small class="mr-2">mdi-pencil</v-icon>
              <small>Setings</small>
            </h5>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table dark>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td width="180" style="text-align: right">
                      <small>Distance to the nearest pit</small>
                    </td>
                    <td width="140" style="text-align: center">
                      {{ distance }}
                    </td>
                  </tr>
                  <tr v-for="(item, propName) in calculator" :key="propName">
                    <td style="text-align: right">
                      <small>{{ item.title }}</small>
                    </td>
                    <td>
                      <p v-if="item.title && item.type === 'function'">
                        <b style="color: #fff"> {{ item.value }} </b>
                      </p>
                      <Selector
                        v-if="item.type === 'selector'"
                        :value.sync="item.value"
                        :label="item.title"
                        :available="item.available"
                      />
                      <SwitchValues
                        v-if="item.type === 'switcher'"
                        :label="item.title"
                        :value.sync="item.value"
                        :states="item.available"
                      />
                      <v-text-field
                        v-if="item.type === 'number'"
                        v-model="item.value"
                        outlined
                        dense
                        hide-details
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row justify="center">
      <v-btn outlined color="primary" @click="outputResultsToPDF" class="my-4">
        Output results
        <v-icon class="ml-2">mdi-open-in-new</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

import { SimpleCalculator, DetailedCalculator } from '@/data'
import { createPDF } from '@/helpers'

export default {
  name: 'SimpleCalculator',

  components: {
    SwitchValues: () => import('@/components/SwitchValues.vue'),
    Selector: () => import('@/components/Selector.vue')
  },

  props: ['address', 'distance', 'mode'],

  data: () => ({
    calculator: null,
    totalCost: null,
    totalDustRentalCostPerMonth: null,
    showPDF: false
  }),

  watch: {
    distance (val) {
      this.calculator.setDistance(val)
      this.calculateResults()
    },
    calculator: {
      deep: true,
      handler (data) {
        this.calculateResults()
      }
    }
  },

  methods: {
    calculateResults () {
      const { totalCost, totalDustRentalCostPerMonth } = this.calculator.getTotalCost()
      this.totalCost = totalCost
      this.totalDustRentalCostPerMonth = totalDustRentalCostPerMonth
      console.group('RESULTS')
      console.log('totalCost', this.totalCost)
      console.log('totalDustRentalCostPerMonth', this.totalDustRentalCostPerMonth)
      console.groupEnd('RESULTS')
    },

    async outputResultsToPDF () {
      const data = Object.keys(this.calculator).map(key => ({ title: this.calculator[key].title, value: this.calculator[key].value }))
      console.log(data)
      await createPDF(this.address, data, this.totalCost, this.totalDustRentalCostPerMonth)
    }
  },

  mounted () {
    console.log('MODE: ', this.mode)
    this.calculator = this.mode === 'simple' ? new SimpleCalculator() : new DetailedCalculator()

    this.calculator.setDistance(this.distance)
    this.calculateResults()
  }
}
</script>

<style scoped>
p {
  font-size: 14px !important;
  margin-bottom: 0 !important;
}
.theme--light.v-expansion-panels .v-expansion-panel {
  border: solid 1px #bbb;
}
</style>
