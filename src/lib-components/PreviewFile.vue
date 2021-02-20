<template>
<div>
    <input type="file" hidden ref='filecontent' @change="handleDrop">
    <div v-if="b64src!=null" @click="clear()" class="btn btn-primary close-button"><i class="fas fa-window-close"></i></div>
    <div
        v-if="b64src==null"
        :class="classzone+' dropzone'"
        v-on:drop.prevent="handleDrop"
        v-on:dragover.prevent="indrag = true"
        @dragleave="indrag = false"
        @click="handleClick"
    >
        Arrastre aqui el documento digital
    </div>
    <embed v-else :src="b64src" type="" width="100%">
</div>
</template>

<script>
export default {
    props: {
        multiple:{default:false},
        types:{default:()=>['application/pdf']},
        value:{default:null}
    },
data() {
    return {
        file:null,
        files:[],
        indrag:false,
        b64src:null
    }
},
methods: {
    clear(){
        this.$refs.filecontent.value = null
        this.$nextTick(()=>{
            this.b64src = null
        })

        this.$emit('clear')
    },
    handleClick($event){
        this.$refs.filecontent.click()
    },
    handleDrop(event) {
        const { files } = event.dataTransfer
            ? event.dataTransfer
            : this.$refs.filecontent;

        if (files.length > 1) {
            alert("Debes seleccionar solo un archivo");
            return;
        }

        this.$refs.filecontent.files = files;
        const fs = this.$refs.filecontent.files;
        this.file = this.$refs.filecontent.files[0]

        const reader = new FileReader()
        reader.onload = this.completeUrl

        reader.readAsDataURL(new Blob(fs,{type:'application/pdf'}))
    },
     completeUrl(e){
        
        this.b64src= e.target.result
    }
},
    computed: {
        classzone(){
            return ''
        }
    },
    watch:{
        file(value){
            this.$emit('input',value)
        }
    }
}
</script>

<style scoped>
    .dropzone {
    width: 100%;
    height: 150px;
    border: solid grey 1px;
    border-radius: 10px;
    border-spacing: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-style: dashed;
    }
    .close-button{
        position: absolute;
        left: 100%;
        transform: translate(-170%);
    }
</style>
