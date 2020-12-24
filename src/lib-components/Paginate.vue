<template>
    <nav >
        <ul class="pagination">
            <li :disabled="true" :class="(value-2)<0?'page-item disabled':'page-item'" @click="nextPage(value-1)"> <span class="page-link"> Anterior</span></li>
            <li v-if="(value-1)>0" class="page-item" @click="nextPage(value-1)"><span class="page-link"> {{ value-1 }}</span></li>
            <li class="page-item active" @click="nextPage(value)"><span class="page-link"> {{ value }}</span></li>
            <li class="page-item" @click="nextPage(value+1)"><span class="page-link"> {{ value+1 }}</span></li>
            <li class="page-item" @click="nextPage(value+1)"><span class="page-link"> Siguiente</span></li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        value:{default:true}
    },
    methods: {
        nextPage(topage){
            if(topage<=0){
                return
            }
            this.$emit('change',topage)
        }
    }

}
</script>

<style scoped>
    li.page-item{
        cursor: pointer;
    }
    li.page-item.disabled{
        cursor: not-allowed;
    }

</style>
