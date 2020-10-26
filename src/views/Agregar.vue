<template>
    <div class="row">
        <div class="col-md-8 col-lg-5">
            <h1 class="mb-3">Agregar</h1>
            <form class="form-group" @submit.prevent="agregarTarea($v.nombre.$model)">
                <input class="form-control" type="text" v-model="$v.nombre.$model" placeholder="Ingrese tarea">
                <small class="text-danger d-block mt-2" v-if="!$v.nombre.required">Campo requerido</small>
                <small class="text-danger d-block mt-2" v-if="!$v.nombre.minLength">Minimo 5 caracteres</small>
                <button 
                    class="btn btn-primary mt-2" 
                    :disabled="$v.$invalid || loading" 
                    type="submit">
                    Agregar
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    name: 'Agregar',
    data() {
        return {
            nombre: ''
        }
    },
    methods:{
        ...mapActions(['agregarTarea'])
    },
    validations: {
        nombre: { required, minLength:minLength(5) }
    },
    computed: {
        ...mapState(['loading'])
    },
}
</script>