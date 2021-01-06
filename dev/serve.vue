<script>
import Vue from 'vue';
import { PersonalSample,PreviewFile,ModalComponent,DataTable,CheckableItem,DataTable2 } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    PersonalSample,
    PreviewFile,
    ModalComponent,
    DataTable,
    'checkable-item':CheckableItem,
    'data-table2':DataTable2
  },
  data(){
    return {
      modal:false,
      data:[
        {id:1,name:"Juan",edad:10},
        {id:2,name:"Carlos",edad:11},
        {id:3,name:"Silvestre",edad:12},
        {id:4,name:"Donald",edad:13},
        {id:5,name:"Claudio",edad:14},
        {id:6,name:"Micky",edad:15},
      ],
      headers:[
        {name:'Key',value:'id'},
        {name:'Names',value:'name'},
        {name:'Edad',value:'edad'},
      ]
    }
  }
});
</script>

<template>
  <div id="app">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.0.5/css/adminlte.min.css" integrity="sha512-rVZC4rf0Piwtw/LsgwXxKXzWq3L0P6atiQKBNuXYRbg2FoRbSTIY0k2DxuJcs7dk4e/ShtMzglHKBOJxW8EQyQ==" crossorigin="anonymous" />
    <div class='container'>
      <data-table2 :items="data" :columns="headers" :select="true">

      </data-table2>
    </div>
    <button class="btn btn-primary" @click="modal=!modal">Modal</button>
    {{ modal }}
    <personal-sample />
    <PreviewFile></PreviewFile>
    <modal-component v-if="modal" @close="modal=false">
      <template #body>
        <div class="container">
          Hola
        </div>
      </template>
    </modal-component>

    <data-table :items="data" :columns="headers" :select="true">

    </data-table>
    
    <checkable-item></checkable-item>
  </div>
</template>
