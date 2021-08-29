<template>
  <v-row justify="center">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-toolbar-title>
        <h6>Select building</h6>
      </v-toolbar-title>

      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Start to enter the address"
        solo-inverted
      ></v-autocomplete>

      <v-btn text large @click="$emit('update:address', select)" color="primary">
        SUBMIT
      </v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>

export default {
  name: 'BuildingsAddress',
  props: ['address'],
  data: () => ({
    loading: true,
    items: [],
    search: null,
    select: null,
    addresses: []
  }),
  methods: {
    async getBuildings () {
      const response = await fetch('https://dgtek.herokuapp.com/building')
      if (response.status !== 200) return []
      const buildings = (await response.json()).data
      return buildings.map(item => item.address)
    },
    querySelections (value) {
      this.loading = true
      this.items = this.addresses.filter(item => (item || '').toLowerCase().indexOf((value || '').toLowerCase()) > -1)
      this.loading = false
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
    relatedBuildingIds: {
      deep: true,
      immediate: true,
      handler (val) {}
    }
  },
  created () {
    this.getBuildings().then((response) => {
      this.addresses = response
      this.loading = false
    })
  }
}

</script>
