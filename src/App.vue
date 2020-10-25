<template>
  <div class="container mt-3" id="app">
    <div class="mb-4">
        <router-link to="/" v-if="existeUsuario" class="btn btn-dark mr-2">Inicio</router-link>
        <router-link to="/registro" v-if="!existeUsuario" class="btn btn-dark mr-2">Registro</router-link>
        <router-link to="/login" v-if="!existeUsuario" class="btn btn-dark mr-2">Login</router-link>
        <button @click="cerrarSession" v-if="existeUsuario" class="btn btn-dark mr-2">Logout</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
   methods: {
     ...mapActions(['cerrarSession'])
   },
   computed: {
     ...mapGetters(['existeUsuario'])
   },
}
</script>