<template>
  <table width="360">
    <tbody>
      <tr v-for="(item, propName) of defaults" :key="propName">
        <td width="280">
          <small>{{ item.title }}</small>
        </td>
        <td>
          <v-text-field v-model="item.value" outlined dense hide-details />
        </td>
      </tr>
      <tr>
        <td colspan="2" class="pt-5 text-right">
          <v-btn outlined color="primary" @click="saveData()">
            Save updates
          </v-btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

import { defaults } from '@/data'
import { getDefaults /*, saveDefaults */ } from '@/helpers'

export default {
  name: 'Settings',

  data: () => ({
    defaults: JSON.parse(JSON.stringify(defaults))
  }),

  methods: {
    async saveData () {
      const data = Object.assign({}, ...Object.keys(this.defaults).map(key => ({ [key]: this.defaults[key].value })))
      console.log({
        defaults: data
      })
    }
  },

  async beforeMount () {
    const data = await getDefaults()
    console.log('SETTINGS RECEIVED THE DATA:\n', data)
    for (const key in this.defaults) {
      console.log(key, this.defaults[key].value, data[key])
      this.defaults[key].value = data[key] || this.defaults[key].value
    }
  }
}
</script>
