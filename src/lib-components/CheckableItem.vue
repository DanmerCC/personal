<template>
      <input class="form-control " type="checkbox" v-model="ischecked" @change="handleChange" ref="myinput">
</template>

<script>
export default {
    props: {
        checked:{default:false},
        value:{
            type:Object,
            default:null
        }
    },
    methods: {
        handleChange() {
            this.$emit('change',this.ischecked,this.value)
        }
    },
    data() {
        return {
            ischecked: this.checked
        }
    },
    watch:{
        checked(value){
            this.ischecked = value
        }
    },
    computed:{
        inputStyles(){
            //return {"max-width":this.$refs.myinput.clientHeight+"px;"}
            if(this.$refs.myinput == undefined){
                return {}
            }else{
                return {"max-width":this.$refs.myinput.clientHeight+"px;"}
            }
        }
    },
    mounted(){
        console.log(this.$refs.myinput.clientHeight)
    }
}
</script>

<style scoped>
input {
    max-width: 60px;
}
</style>
