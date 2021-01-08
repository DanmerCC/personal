<script>
import Vue from 'vue';
import { PersonalSample,PreviewFile,ModalComponent,DataTable,CheckableItem,DataTable2,Tab } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    PersonalSample,
    PreviewFile,
    ModalComponent,
    DataTable,
    'checkable-item':CheckableItem,
    'data-table2':DataTable2,
    Tab
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
       data2:[
        {id:7,name:"aaaaaa",edad:10},
        {id:8,name:"bbbbbb",edad:11},
        {id:9,name:"cccccccccc",edad:12},
        {id:10,name:"dddddd",edad:13},
        {id:11,name:"eeeeeeee",edad:14},
        {id:12,name:"ffffffff",edad:15},
      ],
      headers:[
        {name:'Key',value:'id'},
        {name:'Names',value:'name'},
        {name:'Edad',value:'edad'},
      ],
      mpage:1,
      tab:'init'
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

    <data-table :items="mpage==1?data:data2" :columns="headers" :select="true">
    </data-table>
    <select v-model="mpage">
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
    <checkable-item></checkable-item>
    <Tab v-model="tab" :tabs="['init','othertab']">
      <template #init>
          This is a init tab 
      </template>
      <template #label_init>
        INIT TAB  
      </template>
      <template #othertab>
          This is a  othertab
      </template>
    </Tab>
  </div>
</template>
