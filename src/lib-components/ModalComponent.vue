<template>
  <transition name="modal">
    <div class="unspace">
      <div
        :class="'modal ' + modalClasses"
        tabindex="-1"
        role="dialog"
        aria-labelledby="Modal"
        style="display: block"
        @click.stop=""
      >
        <div
          :class="'modal-dialog ' + modalSizeClasses"
          role="document"
          @click.stop
        >
        <slot name='everybody'>
          <div class="modal-content" :style="{'max-height':(windowHeight*height_proportion)+'px'}">
            <slot name="precontent"> </slot>
            <div class="modal-header" v-if="hasHeader">
              <slot name="prepend-head"> </slot>
              <h5 class="modal-title">{{ title }}</h5>

              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>

            
              <slot name="modal-footer">
                <div class="modal-footer">
                  <slot name="footer"></slot>
                  <button type="button" class="btn btn-secondary" @click="close()">
                    {{ labelCancel }}
                  </button>
                  </div>
              </slot>
          </div>
          </slot>
        </div>
      </div>

      <div class="modal-backdrop show"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    persona: { default: null },
    title: { default: "" },
    modalClasses: { default: "" },
    isLarge: { default: false },
    isSmall: { default: false },
    isExtraLarge: { default: false },
    hasHeader: { default: true },
    backdropClose: { default: true },
    backdropCloseConfirm: { default: false },
    backdropCloseConfirmText: { default: "Are you sure?" },
    labelCancel: { default: "Cancel" },
    height_proportion:{default:0.75}
  },
  data() {
    return {
      windowHeight: window.innerHeight
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    closeBackdrop() {
      if (!this.backdropClose) {
        return false;
      }
      if (
        this.backdropCloseConfirm &&
        !confirm(this.backdropCloseConfirmText)
      ) {
        return false;
      }
      this.close();
    },
  },
  computed: {
    modalSizeClasses() {
      if (this.isLarge) {
        return "modal-lg";
      }
      if (this.isSmall) {
        return "modal-sm";
      }
      if (this.isExtraLarge) {
        return "modal-xl";
      }
      return "";
    },
  },
};
</script>

<style scoped>
.modal-content{
    overflow:scroll;
}
.modal-xl {
  width: 90%;
  max-width: 1200px;
}
.unspace {
  height: 0;
}
.breadcrumb-menu .btn {
  color: white;
}
.breadcrumb-menu .btn:hover {
  color: #6c757d;
}

.modal-title {
  color: #6c757d;
}
</style>
