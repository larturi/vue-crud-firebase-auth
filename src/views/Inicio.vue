<template>
  <div class="row">
      <div class="col">
            <h1 class="mb-3">Tareas</h1>
            <p>Usuario: {{ usuario.email }}</p>

            <router-link to='/agregar'>
                <button class="btn btn-primary btn-sm mb-3">Agregar</button>
            </router-link>

            <ul class="list-group">
                <li v-for="(item, index) in tareas" :key="index" class="list-group-item">
                    
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
import {mapState, mapActions} from 'vuex';

export default {
    name: 'Inicio',
    computed: {
        ...mapState(['usuario', 'tareas'])
    },
    methods: {
        ...mapActions(['getTareas', 'eliminarTarea'])
    },
    created() {
        this.getTareas()
    },

}
</script>