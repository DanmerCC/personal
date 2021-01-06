<template>
    <span>
        <button @click="configuring=true">Configurar</button>
        <modal-component v-if="configuring==true" @close="configuring=false">
            <template #body>
                <div v-for="(column,index) in columnconfig" :key="index">
                <label :for="index">
                    {{ column.name }}
                    <input type="checkbox" :id="index" v-model="column.visible">
                </label>
            </div>
            </template>
            <template #footer>
                <button @click="saveChanges()">Guardar</button>
            </template>
        </modal-component>
    </span>
</template>

<script>
import ModalComponent from '@/lib-components/ModalComponent'
export default {
    components:{
        ModalComponent
    },
    name:'config-columns',
    props: {
        value: {
            type: Array,
            default: ()=>[]
        },
       
    },
    data() {
        return {
            columnconfig: this.value,
            configuring:false
        }
    },
    methods: {
        saveChanges() {
            this.columnconfig =  this.value
            this.configuring = false
            this.$emit('input',this.columnconfig)
        }
    },
}
</script>

<style>

</style>