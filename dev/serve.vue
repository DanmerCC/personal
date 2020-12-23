<script>
import Vue from 'vue';
import { PersonalSample,PreviewFile,ModalComponent,DataTable } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    PersonalSample,
    PreviewFile,
    ModalComponent,
    DataTable
  },
  data(){
    return {
      modal:false
    }
  }
});
</script>

<template>
  <div id="app">
    <button @click="modal=true">Modal</button>
    <personal-sample />
    <PreviewFile></PreviewFile>
    <modal-component>
      <template #body>
        <div class="container">
          Hola
        </div>
      </template>
    </modal-component>
  </div>
</template>
