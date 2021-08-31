<template>
  <v-card flat class="transparent">
    <v-row justify="center">
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Address
              </th>
              <th class="text-left">
                Distance (m)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) of distances"
              :key="index"
              @click="selectPit(record)"
              style="cursor: pointer"
            >
              <td class="text-left">
                {{ record.address }}<br>
                <small>lat: {{ record.coordinates[1] }} lng: {{ record.coordinates[0] }}</small>
              </td>
              <td class="text-left">{{ record.distance }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'ShowDistances',

  props: ['distances', 'selected'],

  methods: {
    selectPit (item) {
      this.$emit('update:selected', item.distance)
    }
  }
}
</script>
