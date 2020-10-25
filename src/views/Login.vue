<template>
    <div class="row">
        <div class="col-md-8 col-lg-5">
            <h1 class="mb-3">Login</h1>

            <form class="form-group" @submit.prevent="loginUsuario( {email: email, password: password} )">
                <input 
                    type="email" 
                    placeholder="Ingrese email"
                    v-model="email"
                    class="form-control mb-2"
                >
                <input 
                    type="password" 
                    placeholder="Ingrese su contraseña"
                    v-model="password"
                    class="form-control mb-2"
                >

                <button class="btn btn-primary btn-block" type="submit">Acceder</button>
            </form>

            <p v-if="error">
                {{ error.message }}
            </p>
        </div>
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