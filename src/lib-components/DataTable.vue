<template>
  <div :class="'card ' + responsiveclass">
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
      <div v-if="selectable" class="row">
        <div class="col-2 no-space-left">
          <drop-down>
            <template v-slot:primary>
              <div class="group-control">
                <div
                  class="btn btn-sm"
                  v-if="haveSomeUnselected"
                  @click="selectAllPage()"
                >
                  <i class="fa fa-check-square fa-2" aria-hidden="true"></i>
                </div>
                <div
                  class="btn btn-sm btn-secondary"
                  v-else
                  @click="unSelectPage()"
                >
                  <i class="fa fa-check-square fa-2" aria-hidden="true"></i>
                </div>
              </div>
            </template>
            <template>
              <drop-down-item v-if="haveSomeUnselected">
                <div class="btn btn-light" @click="selectAllPage()">
                  <i class="fa fa-check-square-o" aria-hidden="true"></i>
                  Seleccionar Pagina
                </div>
              </drop-down-item>
              <drop-down-item v-if="!haveSomeUnselected">
                <div class="btn btn-light" @click="unSelectPage()">
                  <i class="fa fa-check-square-o" aria-hidden="true"></i>
                  Deseleccionar Pagina
                </div>
              </drop-down-item>
            </template>
          </drop-down>
        </div>
        <div class="col-10">
          <slot name="top-options" :selecteds="selecteds"> </slot>
        </div>
      </div>
    </div>

    <table class="table table-responsive-sm table-sm">
      <thead>
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
          @mouseleave="pkeySelected = null"
          @click.stop="handleRowClick(item)"
        >
          <td
            class="select-td"
            v-if="selectable"
            @click.stop="$refs.rowselectbox.click()"
          >
            <checkable-item
              ref="rowselectbox"
              :checked="isSelected(item)"
              :value="item"
              @change="handleSelect"
            ></checkable-item>
          </td>
          <td v-for="c in columnsSelectedsInOrder" :key="c.order">
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
        <tr v-if="items.lenght == 0" class="select-td text-center">
          <td :colspan="items.lenght">No hay datos</td>
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
export default {
  props: {
    columns: {
      default: () => [],
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
  },
  data() {
    return {
      dpage: this.page,
      dlimit: this.limit,
      selectable: this.select,
      selecteds: [],
      pkeySelected: null,
      columnsSelecteds: this.addOrderIndexColumns(this.columns),
      showConfigTable: false,
    };
  },
  methods: {
    handleRowClick(item) {
      if (this.rowclickeable) this.$emit("rowclick", item);
    },
    handleCheck($event, columna) {
      console.log($event, columna);
    },
    isHover(pkey) {
      return this.pkeySelected == pkey;
    },
    handle(keyselected) {
      this.pkeySelected = keyselected;
    },
    unSelectPage() {
      this.selecteds = this.selecteds.filter(
        (x) => !this.idsItems.includes(x[this.pkey])
      );
    },
    selectAllPage() {
      this.selecteds.push(
        ...this.items.filter((x) => {
          return !this.idsSelecteds.includes(x[this.pkey]) && x.selectable;
        })
      );
    },
    isSelected(item) {
      return (
        this.selecteds.filter((x) => x[this.pkey] == item[this.pkey]).length > 0
      );
    },
    handleSelect($event, item) {
      console.log(item);
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
      let count = 0;
      let count_selectables = this.items.filter((x) => x.selectable).length;
      this.items.forEach((i) => {
        if (this.selectable) {
          if (this.idsSelecteds.includes(i[this.pkey]) && i.selectable) {
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
    page() {
      this.$emit("update:page", this.dpage);
    },
    selecteds(value) {
      this.$emit("update:selected", this.selecteds);
    },
    columnsSelecteds() {
      this.$emit("update:columselecteds", this.columnsSelecteds);
    },
  },
  mounted() {
    this.$emit("update:columselecteds", this.columnsSelecteds);
  },
};
</script>

<style scoped>
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
