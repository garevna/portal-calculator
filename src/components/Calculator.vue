<template>
  <v-container class="homefone">
    <v-row justify="center" align="center">
      <v-card flat class="transparent mx-auto" width="360">
        <table width="360">
          <thead>
            <tr style="background: #eee; height: 32px">
              <th width="180"> <small>Option</small> </th>
              <th width="90"> <small>Value</small> </th>
              <th width="90"> <small>Cost</small> </th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 48px">
              <td>
                <small><b>Distance to the nearest pit</b></small>
              </td>
              <td colspan="2" class="text-center">
                <small><b>{{ distance }}</b></small>
              </td>
            </tr>
            <tr v-for="(item, propName) in calculator" :key="propName">
              <td>
                <small>{{ item.title }}</small>
              </td>
              <td>
                <v-text-field
                  v-model="item.value"
                  outlined
                  dense
                  hide-details
                />
              </td>
              <td>
                <p class="ml-2" v-if="calculator[propName].readonly" style="border: solid 1px #777; padding: 8px; border-radius: 4px; text-align: right">
                  {{ item.associated }}
                  <v-icon small @click="editItem(propName)">
                    mdi-pencil
                  </v-icon>
                </p>
                <v-text-field
                  v-else
                  v-model="item.associated"
                  outlined
                  dense
                  hide-details
                  append-icon="mdi-check-bold"
                  @click:append="item.readonly = true"
                />
              </td>
            </tr>
          </tbody>
          <tfoot class="mt-4">
            <tr style="background-color:#eee; height: 38px">
              <td>
                <b><small>Total cost:</small></b>
              </td>
              <th colspan="2">
                <b><small>{{ totalCost }}</small></b>
              </th>
            </tr>
            <tr style="background-color:#eee">
              <td>
                <b><small>Total duct rental cost per month:</small></b>
              </td>
              <th colspan="2">
                <b><small>{{ totalDustRentalCostPerMonth }}</small></b>
              </th>
            </tr>
          </tfoot>
        </table>
      </v-card>
    </v-row>

    <v-row justify="center">
      <v-btn outlined color="primary" @click="restoreDefaults" class="my-4">
        Restore defaults
      </v-btn>
      <v-btn outlined color="primary" @click="outputResultsToPDF" class="my-4">
        Output results
        <v-icon class="ml-2">mdi-open-in-new</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

import { DetailedCalculator } from '@/data'
import { createPDF } from '@/helpers'

export default {
  name: 'Calculator',

  props: ['address', 'distance'],

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
    },

    async outputResultsToPDF () {
      const data = Object.keys(this.calculator)
        .map(key => ({ title: this.calculator[key].title, value: this.calculator[key].value, cost: this.calculator[key].associated }))
      await createPDF(this.address, data, this.totalCost, this.totalDustRentalCostPerMonth)
    },

    restoreDefaults () {
      this.calculator.restoreDefaults()
    },

    editItem (propName) {
      Object.assign(this.calculator[propName], { readonly: false })
    }
  },

  mounted () {
    this.calculator = new DetailedCalculator()
    for (const key in this.calculator) {
      this.calculator[key].readonly = true
    }

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
