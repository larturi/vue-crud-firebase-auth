<template>
    <div class="row">
        <div class="col-md-8 col-lg-5">
            <h1 class="mb-3">Agregar</h1>
            <form class="form-group" @submit.prevent="agregarTarea(nombre)">
                <input class="form-control" type="text" v-model="nombre" placeholder="Ingrese tarea">
                <button class="btn btn-primary mt-2" type="submit">Agregar</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Agregar',
    data() {
        return {
            nombre: ''
        }
    },
    methods:{
        ...mapActions(['agregarTarea'])
    }
}
</script>