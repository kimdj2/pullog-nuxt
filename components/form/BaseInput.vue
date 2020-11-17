<template>
  <v-text-field
    outlined
    dense
    v-bind="$attrs"
    :label="label"
    :value="value"
    @input="onChange"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    onChange($event) {
      this.$emit('handleChange', {
        name: $event.target.name,
        value: $event.target.value,
      })
    },
  },
}
</script>
