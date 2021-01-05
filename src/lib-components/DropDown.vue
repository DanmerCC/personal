<template>
  <div class='btn-group border border-dark rounded-lg '>
    <slot name="primary">

    </slot>
    <button
      class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <div
      class="dropdown-menu"
      x-placement="bottom-start"
      style="position: absolute; transform: translate3d(89px, 34px, 0px); top: 0px; left: 0px; will-change: transform;"
    >
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
    .btn-group.border.border-dark.rounded-lg{
        width: 100%;
    }
</style>
