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
    <v-row justify="center">
      <v-btn text @click="getSelected" color="primary">
        SUBMIT
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

import { getDistance, getVariants, getAddressDetails, transformAddress } from '@/helpers'

export default {
  name: 'GeoscapeAutocomplete',

  props: ['value', 'buildingAddress'],

  data: () => ({
    address: '',
    addressDetails: null,
    variants: [],
    loading: false,
    search: null,
    google: '',
    formula: ''
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
    async getSelected () {
      this.$root.$emit('progress', true)
      // console.log('VARIANTS:\n', this.variants)
      // console.log('SELECTED:\n', this.variants[0])
      this.$emit('update:buildingAddress', this.address)
      this.addressDetails = await getAddressDetails(this.variants[0].id)
      // console.log('ADDRESS DETAILS:\n', this.addressDetails)
      const coordinates = this.addressDetails.coordinates
      const response = await getDistance(coordinates[1], coordinates[0])

      // console.log('DISTANCES:\n', response.data.matrix)

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
