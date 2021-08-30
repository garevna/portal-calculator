<template>
  <v-container>
    <v-row justify="center">
      <h6>Search address</h6>
    </v-row>
    <v-row justify="center">
      <v-autocomplete
        v-model="address"
        :loading="loading"
        :items="addresses"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        placeholder="Enter the address"
        outlined
        clearable
        :menu-props="{ bottom: true, offsetY: true }"
      />
    </v-row>
    <v-row justify="center" v-if="address" class="mt-4 mb-8">
      <v-btn outlined @click="getSelected('simple')" :color="mode === 'simple' ? '#900' : '#777'">
        Simple calculator
      </v-btn>
      <v-btn outlined @click="getSelected('detailed')" :color="mode === 'detailed' ? '#900' : '#777'">
        Detailed calculator
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

import { getDistance, getVariants, getAddressDetails, transformAddress } from '@/helpers'

export default {
  name: 'GeoscapeAutocomplete',

  props: ['value', 'buildingAddress', 'mode'],

  data: () => ({
    address: '',
    addressDetails: null,
    variants: [],
    loading: false,
    search: null
    // google: '',
    // formula: ''
  }),
  computed: {
    addresses () {
      return this.variants.map(item => item.address)
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.getVariants(val)
    }
  },
  methods: {
    receiveVariants: getVariants,

    async getVariants (val) {
      if (val.length < 4) return
      this.loading = true
      this.variants = await this.receiveVariants(val)
      this.loading = false
    },

    async getSelected (mode) {
      this.$root.$emit('progress', true)

      this.$emit('update:buildingAddress', this.address)
      this.$emit('update:mode', mode)

      this.addressDetails = await getAddressDetails(this.variants[0].id)

      const coordinates = this.addressDetails.coordinates
      const response = await getDistance(coordinates[1], coordinates[0])

      const distances = response.data.matrix.rows[0].elements.map(item => item.distance.value)

      this.$root.$emit('distances-ready', response.data.matrix.destination_addresses.map((address, index) => ({
        address: transformAddress(address),
        pit: response.data.pits[index]._id,
        coordinates: response.data.pits[index].coordinates,
        distance: distances[index]
      })))

      this.$root.$emit('progress', false)
    }
  }
}
</script>
