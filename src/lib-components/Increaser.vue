<template>
  <span> 
      <slot :show_value="show_value">{{ show_value }}</slot>
  </span>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            show_value: this.value,
            intervaler:null,
            milseconds:1000,
            steps:10
        }
    },
    methods: {
      runIncreaser(){
        this.show_value = 0
        clearInterval(this.intervaler)
        this.intervaler = setInterval(this.increment,this.milseconds/this.steps)
      },
      increment(args){
           var current_step = Math.abs(Math.ceil(this.value/this.steps))
            if(current_step<=0){
                current_step = 1
            }
             
            if((this.show_value+current_step)>=this.value){
                this.show_value = this.value
            }else{
                this.show_value+=current_step
            }
          
      }
    },
    watch: {
        value(value){
            
            this.runIncreaser()
        }
    }
}
</script>

<style>

</style>