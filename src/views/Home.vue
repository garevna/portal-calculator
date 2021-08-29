<template>
  <v-container class="homefone mt-12">
    <v-progress-linear
      :active="progress"
      :indeterminate="progress"
      absolute
      top
      color="buttons"
    ></v-progress-linear>

    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.svg')"
          class="my-3"
          contain
          height="80"
        />
      </v-col>
    </v-row>

    <v-stepper v-model="step" class="transparent mt-12" style="box-shadow: none;">
      <v-row justify="center">
        <v-col cols="12" sm="4" class="text-center text-md-right">
          <v-btn text outlined @click="step=1" :style="{ borderColor: first, color: first }">
            Settings
          </v-btn>
        </v-col>

        <v-col cols="12" sm="4" class="text-center">
          <v-btn text outlined @click="step=2" :style="{ borderColor: second, color: second }">
            Calculator
          </v-btn>
        </v-col>

        <v-col cols="12" sm="4" class="text-center text-md-left">
          <v-btn text outlined @click="step=3" :style="{ borderColor: third, color: third }">
            Simple calculator
          </v-btn>
        </v-col>
      </v-row>
      <v-stepper-items>
        <v-stepper-content step="1" class="pb-12">
          <v-card flat class="transparent text-center mx-auto" max-width="600">
            <Settings />
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2" class="pb-12">
          <v-card flat class="transparent text-center mx-auto" max-width="600">
            <!-- <SimpleCalculator v-if="distance" :distance="distance" /> -->
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3" height="320">
          <v-card flat class="transparent text-center mx-auto" max-width="600">
            <GeoscapeAutocomplete :value.sync="results" :buildingAddress.sync="address" />
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-card
      v-if="step === 3"
      flat
      class="transparent text-center mt-4 mx-auto px-2"
      max-width="600"
      min-width="360"
    >
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab :disabled="!distancesReady"> Distances </v-tab>
        <v-tab :disabled="!distance"> Calculations </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <ShowDistances
            v-if="distancesReady"
            :distances="distances"
            :selected.sync="distance"
            class="mt-4"
          />
        </v-tab-item>
        <v-tab-item>
          <SimpleCalculator
            v-if="distance"
            :distance="distance"
            :address="address"
            class="mt-4"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>

import { getCoordinates, getGeoscapeVariant } from '@/helpers'
import Settings from '@/components/Settings.vue'

export default {
  name: 'Home',
  components: {
    Settings,
    SimpleCalculator: () => import('@/components/SimpleCalculator.vue'),
    GeoscapeAutocomplete: () => import('@/components/GeoscapeAutocomplete.vue'),
    ShowDistances: () => import('@/components/ShowDistances.vue')
  },

  data: () => ({
    step: 1,
    tab: 0,
    address: '',
    results: '',
    distance: undefined,
    distances: null,
    distancesReady: false,
    progress: false
  }),

  computed: {
    first () {
      return this.step === 1 ? '#900' : '#999'
    },
    second () {
      return this.step === 2 ? '#900' : '#999'
    },
    third () {
      return this.step === 3 ? '#900' : '#999'
    }
  },

  watch: {
    distance (value) {
      this.distance = value
      this.tab = 1
    }
  },

  methods: {
    getCoordinates,
    getGeoscapeVariant,
    showDistances (data) {
      console.log('SHOW DISTANCES:\n', data)
      this.distances = data
      this.distancesReady = true
    },
    showProgress (value) {
      this.progress = value
    }
  },

  beforeDestroy () {
    this.$root.$off('distances-ready', this.showDistances)
    this.$root.$off('progress', this.showProgress)
  },

  mounted () {
    this.$root.$on('distances-ready', this.showDistances)
    this.$root.$on('progress', this.showProgress)
  }
}
</script>

<style>
h6 {
  font-size: 14px!important;
}
span {
  font-size: 12px;
  color: #09b;
}

.active {
  border-color: #900;
  color: #900;
}
</style>
