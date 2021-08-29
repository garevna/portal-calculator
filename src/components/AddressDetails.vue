<template>
  <v-card flat class="transparent">
    <v-row justify="center">
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Property
              </th>
              <th class="text-left">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="prop in properties"
              :key="prop"
            >
              <td class="text-left" v-if="addressDetails[prop]">{{ prop }}</td>
              <td class="text-left" v-if="addressDetails[prop]">{{ addressDetails[prop] }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-card>
</template>

<script>

import { getAddressDetails, getBuildings } from '@/helpers'

export default {
  name: '',
  props: ['addressId', 'geolocation', 'relatedBuildingIds'],
  data: () => ({
    properties: [],
    addressDetails: null,
    geoDatumCode: '',
    geoFeature: '',
    coordinates: [],
    geometryType: '',
    buildings: [],
    buildingIds: []
  }),
  watch: {
    coordinates: {
      deep: true,
      handler (val) {
        this.$emit('update:geolocation', val)
      }
    },
    addressId (val) {
      if (val) {
        this.getAddressDetails()
        this.getBuildings()
      }
    }
  },
  methods: {
    receiveAddressDetails: getAddressDetails,
    receiveBuildings: getBuildings,

    async getAddressDetails () {
      const { addressDetails, coordinates } = await this.receiveAddressDetails(this.addressId)
      this.addressDetails = addressDetails
      this.coordinates = coordinates
      this.$emit('update:relatedBuildingIds', this.buildingIds)
      this.properties = Object.keys(this.addressDetails)
    },

    async getBuildings () {
      this.buildings = await this.receiveBuildings(this.addressId)
      this.$emit('update:relatedBuildingIds', this.buildingIds)
    }
    // async getAddressDetails () {
    //   const response = await (await fetch(`https://api.psma.com.au/v1/addresses/${this.addressId}?include=geo,addressDetails`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: process.env.VUE_APP_GEOSCAPE_KEY
    //     }
    //   })).json()
    //
    //   this.addressDetails = response.addressDetails
    //   this.geoDatumCode = response.geo.geoDatumCode
    //   this.geoFeature = response.geo.geoFeature
    //   this.coordinates = response.geo.geometry.coordinates
    //   this.geometryType = response.geo.geometry.type
    //   this.buildingIds = response.relatedBuildingIds
    //   this.$emit('update:relatedBuildingIds', this.buildingIds)
    //   this.properties = Object.keys(this.addressDetails)
    // },

    // async getBuildings () {
    //   const response = await (await fetch(`https://api.psma.com.au/v1/addresses/${this.addressId}/buildings`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: process.env.VUE_APP_GEOSCAPE_KEY
    //     }
    //   }).catch(err => console.warn(err))).json()
    //
    //   this.buildings = response.data
    //   this.$emit('update:relatedBuildingIds', this.buildingIds)
    //
    //   return response.data
    // }
  },
  mounted () {
    if (this.addressId) this.getAddressDetails()
  }
}

</script>
