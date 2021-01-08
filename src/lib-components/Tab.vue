<template>
    <div class="card card-primary card-outline card-tabs">
        <div class="card-header p-0 pt-1 border-bottom-0">
            <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                <li v-for="(tab,index) in tabs" :key="index" class="nav-item noselect" @click="handleClickTab($event,tab)">
                    <div
                        v-if="value==tab"
                        class="nav-link active"
                        id="custom-tabs-three-home-tab"
                        data-toggle="pill"
                        href="#custom-tabs-three-home"
                        role="tab"
                        aria-controls="custom-tabs-three-home"
                        aria-selected="true"
                    >
                        <slot name='label' :label='tab'>
                            <slot :name='"label_"+tab' :label='tab'>
                                {{ tab }}
                            </slot>
                        </slot>

                    </div>
                    <div
                        v-else
                        class="nav-link"
                        id="custom-tabs-three-home-tab"
                        data-toggle="pill"
                        href="#custom-tabs-three-home"
                        role="tab"
                        aria-controls="custom-tabs-three-home"
                        aria-selected="true"
                    >
                        <slot name='label' :label='tab'>
                            <slot :name='"label_"+tab' :label='tab'>
                                {{ tab }}
                            </slot>
                        </slot>
                    </div>
                </li>
            </ul>
        </div>
        <div :class="noborder?'':'card-body'">
            <div class='tab-content' id="custom-tabs-three-tabContent">
                <div v-for="(tab,index) in tabs" :key="index" class="tab-pane fade active show" id="custom-tabs-three-home" role="tabpanel" aria-labelledby="custom-tabs-three-home-tab">
                    <div v-show="value==tab">
                        <slot :name="tab" :selected="selected">
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-end">
            <slot name='footer'>
            </slot>
        </div>
        <!-- /.card -->
    </div>
</template>

<script>
export default {
    props: {
        tabs:{default:()=>[]},
        value:null,
        noborder:{default:false}
    },
    data() {
        return {
            selected:this.value
        }
    },
    methods: {
        handleClickTab($event,tab){
            this.$emit('input',tab)
        }
    }
}
</script>

<style scoped>
    .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
    }
    .nav-item {
        cursor: pointer;
    }
</style>
