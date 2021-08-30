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
          height="50"
        />
      </v-col>
    </v-row>

    <v-card flat class="transparent mx-auto" max-width="600" min-width="360">
      <v-row v-if="mode !== 'settings'" justify="end">
        <v-btn text color="#777" class="mr-2" @click="mode = 'settings'">
          <v-icon small> mdi-cog </v-icon>
          <small>Settings</small>
        </v-btn>
      </v-row>

      <v-card v-if="mode === 'settings'" flat class="transparent mx-auto mt-3" width="360">
        <v-toolbar flat clas="transparent">
          <v-toolbar-title>
            <h5><small>Settings</small></h5>
          </v-toolbar-title>

          <v-spacer />

          <v-icon color="#777" class="pa-0 ma-0" @click="mode = 'calc'">
            mdi-close
          </v-icon>
        </v-toolbar>

        <v-row justify="center">
          <Settings />
        </v-row>
      </v-card>

      <v-row justify="center" v-else>
        <v-card flat class="transparent mx-auto mt-4" width="360">
          <GeoscapeAutocomplete
            :value.sync="results"
            :buildingAddress.sync="address"
            :mode.sync="mode"
          />

          <v-tabs v-if="mode" v-model="tab" background-color="transparent" grow>
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
                v-if="mode === 'simple'"
                :distance="distance"
                :address="address"
                class="mt-4"
              />
              <Calculator
                v-else
                :distance="distance"
                :address="address"
                class="mt-4"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-row>
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
    Calculator: () => import('@/components/Calculator.vue'),
    SimpleCalculator: () => import('@/components/SimpleCalculator.vue'),
    GeoscapeAutocomplete: () => import('@/components/GeoscapeAutocomplete.vue'),
    ShowDistances: () => import('@/components/ShowDistances.vue')
  },

  data: () => ({
    step: 1,
    mode: undefined,
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
    },
    mode (value) {
      console.log('MODE CHANGED: ', value)
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
