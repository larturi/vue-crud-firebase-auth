<template>
    <div class="row">
        <div class="col-md-8 col-lg-5">
            <h1 class="mb-3">Login</h1>

            <form class="form-group" @submit.prevent="loginUsuario( {email: $v.email.$model, password: $v.password.$model} )">
                <input 
                    type="email" 
                    placeholder="Ingrese email"
                    v-model="$v.email.$model"
                    class="form-control mb-2"
                >
                <small class="text-danger d-block my-2" v-if="!$v.email.required">Email es requerido</small>
                <small class="text-danger d-block my-2" v-if="!$v.email.email">Email no valido</small>

                <input 
                    type="password" 
                    placeholder="Ingrese su contraseña"
                    v-model="$v.password.$model"
                    class="form-control mb-2"
                >
                <small class="text-danger d-block my-2" v-if="!$v.password.required">Password es requerido</small>
                <small class="text-danger d-block my-2" v-if="!$v.password.minLength">Minimo 6 caracteres</small>

                <button 
                   class="btn btn-primary btn-block"
                   :disabled="$v.$invalid" 
                   type="submit">
                   Acceder
                </button>
            </form>

            <p v-if="error">Usuario y contraseña incorrectos</p>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import { required, minLength, email } from 'vuelidate/lib/validators';

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
    validations: {
        email: { required, email },
        password: { required, minLength:minLength(6) }
    }
}
</script>