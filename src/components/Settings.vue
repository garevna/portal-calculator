<template>
  <v-container>
    <v-row justify="center" align="center" v-for="(item, propName) of defaults" :key="propName">
      <v-col cols="6" lg="5" style="text-align: right">
        <small>{{ item.title }}</small>
      </v-col>
      <v-col cols="6" md="3" lg="2">
        <v-text-field v-model="item.value" outlined dense hide-details />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { defaults } from '@/data'
// import { getDefaults } from '@/helpers'

export default {
  name: 'Settings',

  data: () => ({
    defaults: JSON.parse(JSON.stringify(defaults))
  }),

  // async beforeMount () {
  //   this.loading = true
  //   const response = await getDefaults()
  //   console.log('*********************', response)
  //   for (const key in response) {
  //     this.defaults[key].value = response[key]
  //   }
  // },

  mounted () {
    console.log(defaults)
  }
}
</script>
