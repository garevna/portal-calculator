<template>
  <v-row justify="center">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-toolbar-title>
        <h6>Search address</h6>
      </v-toolbar-title>
      <input
        ref="autocompleteAddress"
        class="input-field pa-4"
        v-model="address"
        placeholder="Address"
      />

      <v-btn text large @click="clickHandler" color="primary">SUBMIT</v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>

import { createAutocomplete } from '@/helpers'

export default {
  name: 'GoogleAutocomplete',

  props: ['value'],

  data: () => ({
    ready: false,
    address: ''
  }),
  methods: {
    clickHandler () {
      this.$emit('update:value', this.$refs.autocompleteAddress.value)
    }
  },
  mounted () {
    createAutocomplete(this.$refs.autocompleteAddress)
    this.ready = true
  }
}
</script>

<style scoped>

.input-field {
  display: inline-block;
  outline: none;
  width: 560px;
  margin: 0 16px;
  padding: 8px 16px;
  border: solid 1px #bbb;
  border-radius: 4px;
}
.input-field:focus {
  outline: none;
  border: solid 1px #09b;
}
</style>
