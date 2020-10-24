<template>
  <div>
      <h1>Tareas</h1>
      <p>{{ usuario.email }}</p>

      <router-link to='/agregar'>
            <button class="btn btn-primary btn-block">Agregar</button>
      </router-link>

      <ul>
         <li v-for="(item, index) in tareas" :key="index">
            {{ item.id }} - {{ item.nombre }}
            <router-link :to="{ name: 'Editar', params: {id: item.id} }">
                <button class="btn btn-warning btn-sm ml-2">Editar</button>
            </router-link>
         </li>
      </ul>
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
        ...mapActions(['getTareas'])
    },
    created() {
        this.getTareas()
    },

}
</script>