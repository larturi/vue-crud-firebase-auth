<template>
    <div>
        <h1>Login</h1>

        <form @submit.prevent="loginUsuario( {email: email, password: password} )">
            <input 
                type="email" 
                placeholder="Ingrese email"
                v-model="email"
            >
            <input 
                type="password" 
                placeholder="Ingrese su contraseña"
                v-model="password"
            >

            <button type="submit">Acceder</button>

        </form>

        <p v-if="error">
            {{ error.message }}
        </p>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['loginUsuario'])
    },
    computed: {
        ...mapState(['error'])
    },
}
</script>