<script>
import Vue from 'vue';
import { PersonalSample,PreviewFile } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    PersonalSample,
    PreviewFile
  }
});
</script>

<template>
  <div id="app">
    <personal-sample />
    <PreviewFile></PreviewFile>
  </div>
</template>
