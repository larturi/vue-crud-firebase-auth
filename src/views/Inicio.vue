<template>
  <div class="row">
      <div class="col">
            <h1 class="mb-3">Tareas</h1>
            <p>Usuario: {{ usuario.email }}</p>

            <router-link to='/agregar'>
                <button class="btn btn-primary btn-sm mb-3">Agregar</button>
            </router-link>

            <form @submit.prevent="buscador(texto)">
                <input type="text" 
                       placeholder="Buscar" 
                       class="form-control mb-3" 
                       v-model="texto"
                       v-on:keyup="buscador(texto)">
            </form>

            <div v-if="loading" class="text-center mt-4">
                <h6>Cargando contenido...</h6>
                <pulse-loader :loading="loading"></pulse-loader>
            </div>

            <ul class="list-group" v-if="!loading">
                <li v-for="(item, index) in arrayFiltrado" :key="index" class="list-group-item">
                    
                    {{ item.nombre }}

                    <span class="badge badge-pill badge-secondary">{{ item.id }}</span>

                    <router-link :to="{ name: 'Editar', params: {id: item.id} }" class="float-right">
                        <button class="btn btn-warning btn-sm ml-2">Editar</button>
                    </router-link>

                    <button @click="eliminarTarea(item.id)" class="btn btn-danger btn-sm ml-2 float-right">Eliminar</button>
                </li>
            </ul>
      </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: 'Inicio',
    data() {
        return {
            texto: ''
        }
    },
    computed: {
        ...mapState(['usuario', 'tareas', 'loading']),
        ...mapGetters(['arrayFiltrado'])
    },
    methods: {
        ...mapActions(['getTareas', 'eliminarTarea', 'buscador'])
    },
    created() {
        this.getTareas()
    },
    components: {
        PulseLoader
    }

}
</script>