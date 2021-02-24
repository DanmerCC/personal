<template>
  <div :class="'card ' + responsiveclass+' '+(inload?'loading':'')" :style="{'--loadingtext':loadingtext}">
    <div class="container-fluid">
      <div class="row align-items-center head-options">
        <div class="col-11 text-center">
          <span v-show="selectable">{{ selecteds.length }} Seleccionados</span>
        </div>
        <div class="col-1 config-icon text-right">
          <i
            class="fa fa-cog"
            aria-hidden="true"
            @click="showConfigTable = true"
          ></i>
        </div>
      </div>
    </div>
    <table class="table table-responsive-sm table-sm" ref='domref'>
      <thead>
        <tr v-if="selectable">
          <th class="select-td " >
            <button class="btn btn-sm" v-if="haveSomeUnselected || selecteds.length==0" @click="selectAllPage()">
                <i class="fa fa-check-square fa-2" aria-hidden="true"></i>
            </button >
            <button class="btn btn-sm btn-secondary" v-else @click="unSelectPage()">
              <i class="fa fa-check-square fa-2" aria-hidden="true"></i>
            </button >
          </th>
          <th :colspan="columnsSelectedsInOrder.length+(actioncolumn?2:1)">
              <slot name="top-options" :selecteds="selecteds">
              </slot>
              <a v-if="selecteds.length>0" href="#" @click.prevent="csv(getDataFromTable())" width="30px">
                csv
              </a>
              <a v-if="selecteds.length>0" href="#" @click.prevent="excelformat(getDataFromTable(),false)" width="30px">
                xls
              </a>
          </th>
      </tr>
      <tr>
        <th v-if="selectable" class="select-td">Seleccion</th>
        <th v-for="column in columnsSelectedsInOrder" :key="column.order">
          <slot name="column" :column="column">
            <template>
              {{ column.name }}
            </template>
          </slot>
        </th>
        <th v-if="actioncolumn" class="medium-td">Mas</th>
      </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.order"
          @mouseover="handle(item[pkey])"
          @mouseleave="pkeyRowHover = null"
          :class="(isSelected(item)?'row-selected ':'')+rowClassRender(item,item[pkey] == pkeyRowHover)"
        >
          <td
            class="select-td"
            v-if="selectable"
            
          >
            <checkable-item
              ref="rowselectbox"
              :checked="isSelected(item)"
              :value="item"
              @change="handleSelect"
            ></checkable-item>
          </td>
          <td v-for="c in columnsSelectedsInOrder" :key="c.order" @click="handleRowClick(item)">
            <slot
              :name="c.value"
              v-bind:item="interpret(item, c)"
              :row="item"
              :hover="isHover(item[pkey])"
            >
              <slot
                name="cell"
                :row="item"
                :column="c"
                :item="interpret(item, c)"
              >
                <template>
                  {{ interpret(item, c) }}
                </template>
              </slot>
            </slot>
          </td>
          <td v-if="actioncolumn">
            <slot
              name="action"
              :item="item"
              :row="item"
              :hover="isHover(item[pkey])"
            >
              --
            </slot>
          </td>
        </tr>
        <tr v-if="items.length == 0" class="select-td text-center">
          <td v-if="selectable"></td>
          <td :colspan="columnsSelecteds.length">No hay datos</td>
        </tr>
      </tbody>
    </table>
    <slot name="paginate" :perpage="limit"> </slot>
    <modal-component
      v-if="showConfigTable"
      @close="showConfigTable = false"
      title="Configuracion de columnas"
    >
      <template v-slot:body>
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Columna</th>
              <th>Visible</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(col, index) in columns" :key="index">
              <td>{{ col.name }}</td>
              <td>
                <input
                  class="form-control"
                  type="checkbox"
                  v-model="columnsSelecteds"
                  :value="col"
                  @change="handleCheck($event, col)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </modal-component>
    <slot name='append'>
    </slot>
  </div>
</template>

<script>
import _ from 'lodash';
import CheckableItem from '@/lib-components/CheckableItem'
import DropDown from '@/lib-components/DropDown'
import DropDownItem from '@/lib-components/DropDownItem'
import DropDown2 from '@/lib-components/DropDown2'
export default {
  components:{
    'checkable-item':CheckableItem,
    'drop-down':DropDown,
    'drop-down-item':DropDownItem,
    'drop-down2':DropDown2
  },
  props: {
    columns: {
      default: () => [],
    },
    inload: {
      default: false,
    },
    items: {
      default: () => [],
    },
    pkey: { default: "id" },
    page: { type: Number, default: 1 },
    limit: { type: Number, default: 100 },
    actioncolumn: { default: false },
    responsive: { default: true },
    columselecteds: { default: null },
    select: { default: false },
    rowclickeable: { default: false },
    rowClassRender:{type:Function,default:(row,inhover)=>''}
  },
  data() {
    return {
      dpage: this.page,
      dlimit: this.limit,
      selectable: this.select,
      selecteds: [],
      pkeyRowHover: null,
      columnsSelecteds: this.addOrderIndexColumns(this.columns),
      showConfigTable: false,
      loading:this.inload,
      loadingtext:'Cargando ...'
    };
  },
  methods: {
    getDataFromTable(){
      var header = this.$refs.domref.querySelectorAll('thead tr')
      var last_tr = header[header.length-1]
      var th_headers = last_tr.querySelectorAll('th')
      var text_headers = []
      th_headers.forEach(x=>text_headers.push(x.innerHTML.trim()))

      //now get text in cells
      var tr_ows = this.$refs.domref.querySelectorAll('tbody tr.row-selected')
      var data_array = []
      tr_ows.forEach(z=>{
        var temp_row = []
        var row_tds = z.querySelectorAll('td')
        row_tds.forEach(z=>{
          var childtype = z.childNodes.length
          if(z.innerHTML.indexOf("word") != -1){
            temp_row.push('node')
          }else{
            temp_row.push(z.innerHTML.replace(/<[^>]*>?/gm, '').trim())
          }
        })
        data_array.push(temp_row)
      })
      return [text_headers,...data_array]
    },
    excelformat(result_table,isobject = true) {
        var lineArray = []
        result_table.forEach(function(infoArray, index) {
            var line = (isobject?Object.values(infoArray):infoArray).join(" \t")
            lineArray.push(index == 0 ? line : line)
        });
        var csvContent = lineArray.join("\r\n")
        var excel_file = document.createElement('a');
        excel_file.setAttribute('href', 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(csvContent));
        excel_file.setAttribute('download', 'dccexcel.xls');
        document.body.appendChild(excel_file);
        excel_file.click();
        document.body.removeChild(excel_file);
    },
    csv(tabledata){

        let csvContent = "data:text/csv;charset=utf-8,";
        let data = tabledata.slice()
        data.forEach(function(rowArray) {
            
            let row = Object.values(rowArray).join(";")
            csvContent += row + "\r\n";
        });

        var encodedUri = encodeURI(csvContent);

        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "ddata.csv");
        document.body.appendChild(link);
        link.click();

    },
    cleanSelecteds(){
      this.selecteds = []
    },
    updateSelectedForce(){
      let backlist = this.selecteds.filter(x=>!this.idsItems.includes(x[this.pkey]))
      this.selecteds = this.items.filter(x=>this.idsSelecteds.includes(x[this.pkey]))
      this.selecteds.push(...backlist)
    },
    handleRowClick(item) {
      if (this.rowclickeable) this.$emit("rowclick", item);
    },
    handleCheck($event, columna) {
      
    },
    isHover(pkey) {
      return this.pkeyRowHover == pkey;
    },
    handle(keyselected) {
      this.pkeyRowHover = keyselected;
    },
    unSelectPage() {
      this.selecteds = this.selecteds.filter(
        (x) => !this.idsItems.includes(x[this.pkey])
      );
    },
    selectAllPage() {
      this.selecteds.push(
        ...this.items.filter((x) => {
          return !this.idsSelecteds.includes(x[this.pkey]) && !x.noselect  ;
        })
      );
    },
    isSelected(item) {
      return (
        this.selecteds.filter((x) => x[this.pkey] == item[this.pkey]).length > 0
      );
    },
    handleSelect($event, item) {

      if ($event) {
        this.addSelectedList(item);
      } else {
        this.removeSelectedList(item);
      }
    },
    addSelectedList(item) {
      this.selecteds.push(item);
    },
    removeSelectedList(item) {
      this.selecteds = this.selecteds.filter(
        (x) => x[this.pkey] != item[this.pkey]
      );
    },
    interpret(item, column) {
      if (column == "this") {
        return item;
      }

      let tempobject = item;
      let nodes = column.value.split(".");
      let detectUndefined = false;

      nodes.forEach((ele) => {
        if (typeof tempobject[ele] == "undefined") {
          detectUndefined = true;
        }
        tempobject = tempobject[ele];
      });

      return detectUndefined ? item : tempobject;
    },
    intersect(item, column) {
      return item[column.value.split(".")[0]];
    },
    addOrderIndexColumns(items) {
      for (let yy = 0; yy < items.length; yy++) {
        items[yy]["order"] = yy + 1;
      }
      return items;
    },
  },
  computed: {
    classIsLoad(){
      return this.inload?'loading':''
    },
    columnsSelectedsInOrder() {
      return _.orderBy(this.columnsSelecteds, "order");
    },
    idsItems() {
      return this.items.map((x) => x[this.pkey]);
    },
    idsSelecteds() {
      return this.selecteds.map((x) => x[this.pkey]);
    },
    responsiveclass() {
      var classbase = " ";
      if (this.responsive) {
        classbase += "scrollable-y ";
      }
      return classbase;
    },
    haveSomeUnselected() {
      //if(this.selecteds.length==0)return true
      let count = 0;
      let count_selectables = this.items.filter((x) => !x.noselect).length;
      this.items.forEach((i) => {
        if (this.selectable) {
          if (this.idsSelecteds.includes(i[this.pkey]) && !i.noselect) {
            count++;
          }
        } else {
          if (this.idsSelecteds.includes(i[this.pkey])) {
            count++;
          }
        }
      });
      return count < (this.selectable ? count_selectables : this.items.length);
    },
  },
  watch: {
    inload(value){
      this.loading = value
    },
    page() {
      this.$emit("update:page", this.dpage);
    },
    selecteds(value) {
      this.$emit("update:selected", this.selecteds);
    },
    columnsSelecteds() {
      this.$emit("update:columselecteds", this.columnsSelecteds);
    },
    columns(value){
      this.columnsSelecteds = this.addOrderIndexColumns(value)
    }
  },
  mounted() {
    this.$emit("update:columselecteds", this.columnsSelecteds);
  },
};
</script>

<style scoped>


.loading {
  overflow: hidden;
}

.loading::before{
  content: 'Cargando ..';
  display: block;
  text-align: center;
  font-family: Tahoma, sans-serif;
  font-size: 24px;
  color: #eee;
  
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  
  top: 50%;
  transform: translateY(-50%);
     height:20000px;
   line-height:20000px;

}

tbody {
  font-size: 10px;
  font-weight: bold;
}
table {
  max-height: 250px;
  overflow: scroll;
}
input {
  height: 17px;
}
.scrollable-y {
  overflow-y: auto;
}
.select-td {
  width: 60px;
}

.medium-td {
  max-width: 120px;
}

.no-space-left {
  padding-left: 1px;
}
.config-icon {
  padding-left: 0px;
}
.config-icon > i {
  padding-top: 10px;
}
.col-1.config-icon.text-right {
  padding-right: 0px;
}
tr:hover {
  background: linear-gradient(5deg, #efefefab 10%, #adadad26 90%);
}
</style>
