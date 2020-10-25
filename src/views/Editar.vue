<template>
    <div class="row">
        <div class="col-md-8 col-lg-5">
            <h1 class="mb-3">Editar</h1>
            <form  class="form-group" @submit.prevent="editarTarea(tarea)">
                <input class="form-control" type="text" v-model="tarea.nombre">
                <button class="btn btn-primary mt-2">Editar</button>
            </form>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'Editar',
    data(){
        return {
            id: this.$route.params.id
        }
    },
    created(){
        this.getTarea(this.id)
    },
    methods:{
        ...mapActions(['getTarea', 'editarTarea'])
    },
    computed:{
        ...mapState(['tarea'])
    }
}
</script>