<script setup lang="ts">
// macros
export interface Props {
  isLarge?: boolean
  hasImage?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isLarge: false,
  hasImage: true
})
</script>

<template>
  <div
    class="pk-card"
    :class="{
      'card-detail': props.isLarge,
      'card-default': !props.isLarge
    }"
  >
    <div v-if="hasImage" class="pk-card-img">
      <slot name="image"></slot>
    </div>
    <div class="pk-card-content">
      <slot></slot>
    </div>
    <div class="pk-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card-default {
  max-width: 152px;
  min-height: 190px;
}
.card-detail {
  max-width: 541px;
  min-height: 220px;
}
</style>
