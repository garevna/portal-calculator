<template>
  <!-- <v-card flat> -->
    <!-- <v-card-text> -->
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            text
          >
            {{ localValue }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in available"
            :key="item"
            link
          >
            <v-list-item-title v-text="item" @click="selectItem(item)"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-select
        :items="available"
        v-model="localValue"
        :label="label"
        :menu-props="{ bottom: true, offsetY: true }"
      /> -->
    <!-- </v-card-text> -->
  <!-- </v-card> -->
</template>

<script>

export default {
  name: 'Selector',
  props: ['label', 'value', 'available'],
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  },
  methods: {
    selectItem (item) {
      this.localValue = item
    }
  }
}
</script>
