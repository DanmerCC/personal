<template>
    <span>
        <table>
            <thead>
                <tr>
                    <th :colspan="columns.length+1">
                        <button class="btn btn-primary">Opcion</button>
                    </th>
                </tr>
                <tr>
                    <th v-if="select">
                        <input type="checkbox" v-model="allselected">
                    </th>
                    <th v-for="(column,index) in visibleColumns" :key="index">
                        {{ column.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in internal_items" :key="index">
                    <td v-if="select">
                        <input type="checkbox" ref='select' v-model="item.select">
                    </td>
                    <td v-for="(col,index) in visibleColumns" :key="index">
                        <slot :name="col.value" :cel="interpret(item,col)" :row="item">
                            {{ interpret(item,col) }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
        <config-columns v-model="visibilityColumns"/>
        
    </span>
  
</template>

<script>
import ModalComponent from '@/lib-components/ModalComponent'
import ConfigColumns from '@/lib-components/ConfigColumns'
export default {
    components:{
        ModalComponent,
        'config-columns':ConfigColumns
    },
    props: {
        items: {
            type: Array,
            default: ()=>[]
        },
        select: {
            type: Boolean,
            default: false
        },
        columns:{
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            allselected: false,
            internal_columns:this.columns,
            internal_items:this.items,
            inconfig:true
        }
    },
    computed: {
        selecteds(){
            return internal_columns.filter(x=>!x.hidden)
        },
        visibleColumns() {
            return this.internal_columns.filter(x=>!x.hidden)
        },
        visibilityColumns:{
            get(){
                return this.internal_columns.map(x=>{
                    x.visible = !x.hidden
                    return x
                })
            },
            set(value){
                
                this.internal_columns = value.map(x=>{
                    x.hidden = !x.visible
                    return x
                })
            }
        }
    },
    watch:{
        allselected(value){
            this.internal_items = this.internal_items.map(x=>{
                x.select = value
                return x
            })
        }
    },
    filters: {
        onlyVisible: function(list) {
            return list.filter(x=>x.visible);
        }
    },methods: {
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
        }
    },
}
</script>

<style scoped>
    table,td,tr,th{
        border:solid black 1px;
    }
</style>