<template>
    <div>
        <div v-for="(value,index) in internal_items" :key="index">
            <label :for="random_id+index+'chbx'">
                <slot :name="'label_'+value" :value="value">
                    {{ value }}
                </slot> 
            </label>
            <input type="checkbox" name="" :id="random_id+index+'chbx'" :value="value" @change="handleChange($event)" ref='inputs' :checked="internal_selecteds.includes(value)">
        </div>
    </div>
  
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default: ()=>[]
        },
        items: {
            type: Array,
            default: ()=>[]
        }
    },
    data() {
        return {
            random_id:Math.floor(Math.random() * 100),
            internal_items:this.items,
            internal_selecteds:this.value
        }
    },
    methods: {
        handleChange($event){
            console.log($event)
            var acumulator = []
            for (let index = 0; index < this.$refs.inputs.length; index++) {
                
                if(this.$refs.inputs[index].checked){
                    acumulator.push(this.$refs.inputs[index].value)
                }
                
            }

            this.$emit('input',this.internal_selecteds)
        }
    }
}
</script>

<style>

</style>