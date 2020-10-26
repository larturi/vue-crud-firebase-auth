<template>
    <div class="row">
        <div class="col-md-8 col-lg-5">
            <h1 class="mb-3">Registro</h1>

            <form @submit.prevent="crearUsuario( {email: email, password: pass1} )">
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
                    v-model="pass1"
                    class="form-control mb-2"
                >
                <small class="text-danger d-block my-2" v-if="!$v.pass1.minLength">Minimo 6 caracteres</small>

                <input 
                    type="password" 
                    placeholder="Repita su contraseña"
                    v-model="pass2"
                    class="form-control mb-2"
                >
                <small class="text-danger d-block my-2" v-if="!$v.pass2.sameAs">Las contraseñas no coinciden</small>

                <button :disabled="desactivar" type="submit" class="btn btn-primary btn-block">Registrar</button>
            </form>
            <p class="mt-2" v-if="error==='auth/email-already-in-use'">
                Email ya registrado! Ingrese otro email
            </p>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

export default {
    name: 'Registro',
    data() {
        return {
            email: '',
            pass1: '',
            pass2: '',
        }
    },
    created() {

    },
    methods: {
        ...mapActions(['crearUsuario'])
    },
    computed: {
        ...mapState(['error']),
        desactivar() {
            return this.pass1 !== this.pass2 || this.pass1.trim() === '' || this.pass1.length < 6;
        }
    },
    validations: {
        email: { email, required },
        pass1: { minLength:minLength(6) },
        pass2: { sameAs:sameAs('pass1') },
    }
}
</script>