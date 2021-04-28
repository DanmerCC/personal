<template>
  <div @keydown.esc="clearVirtualInput()">
    <span v-bind="$attrs">
      <span class="select_value" v-if="value!=null" @click="clearVirtualInput()">
        <span class="">
          <slot name='option' :option="value">
            {{ value }} 
          </slot>
          </span> <!--<span @click="$emit('input',null)"> x</span>-->
      </span>
      <input v-else v-model="text" @input="$emit('search',text)" ref='myinput'>
    </span>
      
      <div v-if="text!=null && text!=''" class="listcontainer card" :style="styleList" top="0" @mouseleave="clearBefore()">
        <ul>
          <li v-for="(o,key) in options" @click="$emit('input',o);text=''" :key="key">
            <slot name='option' :option="o">
              {{ o }}
            </slot>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value:{
      default:null
    },
    options: {
      type: Array,
      default: ()=>[]
    },
  },
  data() {
    return {
      text: null
    }
  },
  watch: {
    value(value){

    }
  },
  methods: {
    clearBefore(){
      /*this.$emit('input',null)
      this.text = null*/
      this.$nextTick(()=>{
        this.$emit('input',null)
      })
    },
    clearVirtualInput(value){
      this.text = null
      this.$emit('input',null);
      this.$nextTick(()=>{
        this.$refs.myinput.select()
      })
      
    }
  },
  computed: {
    top() {
      const el  = this.$el
      var rect
      if(!el){
        
        return 0
      }
      rect = el.getBoundingClientRect()
      return rect.top;
    },
    styleList(){
      return "position:absolute;top:"+this.x+";width:100%"
    }
  },
}
</script>

<style scoped>
.select_value{
    min-width: 174px;
    min-height: 30px;
    box-sizing: border-box;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 18.3333px Arial;
    padding: 1px 2px;
    border-width: 1px;
    border-style: inset;
    border-color: black;
    border-image: initial;
    border-radius: 5%;
}
ul{
  padding:0px 0px;
  margin:0px;
}
.listcontainer {
  background-color:rgb(255, 255, 255);
  max-width: 300px;
  -webkit-box-shadow: 4px 7px 18px -2px rgba(0,0,0,0.5); 
box-shadow: 4px 7px 18px -2px rgba(0,0,0,0.5);
z-index:99
}
li:hover{
  background-color:rgb(252, 250, 250);
  
}
li{
  list-style-type:none;
  padding: 4px;
}
</style>