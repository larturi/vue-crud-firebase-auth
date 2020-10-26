import Vue from 'vue';
import Vuex from 'vuex';
import { createStore } from 'vuex';
import { auth, db } from '../firebase';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    tareas: [],
    tarea: {nombre: '', id: ''},
    loading: false,
    texto: ''
  },
  mutations: {
    setUsuario(state, payload) {  
      state.usuario = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setTareas(state, payload) {
      state.tareas = payload;
    },
    setTarea(state, payload){
      state.tarea = payload;
    },
    setEliminarTarea(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload);
    },
    cargarFirebase(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    buscador({commit, state}, payload) {
      state.texto = payload.toLowerCase();
    },
    getTareas({commit, state}) {
      commit('cargarFirebase', true);
      const tareas = [];
      db.collection(state.usuario.email).get()
        .then(res => {
          res.forEach(doc => {
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
          });
          commit('cargarFirebase', false);
          commit('setTareas', tareas);
        });
    },
    crearUsuario({commit}, usuario) {
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          console.log(res);
          const usuarioCreado = {
            email: res.user.email,
            uid: res.user.uid
          };

          db.collection(res.user.email).add({
            nombre: 'Ejemplo'
          })
          .then(doc => {
            commit('setUsuario', usuarioCreado);
            router.push('/');
          })
          .catch(error => {
            console.error(error);
          });

        })
        .catch(error => {
          console.error(error);
          commit('setError', error.code);
        });
    },
    loginUsuario({commit}, usuario) {
      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(res => {
        const usuarioLogeado = {
          email: res.user.email,
          uid: res.user.uid
        };
        commit('setUsuario', usuario);
        router.push('/');
      })
      .catch(error => {
        console.error(error);
        commit('setError', error);
      });
    },
    cerrarSession({commit}) {
      auth.signOut()
        .then(() => {
          if (router.currentRoute.path !== '/login') {
            router.push('/login');
            // router.push({ path: '/login' });
          }
      });
    },
    detectarUsuario({commit}, usuario) {
      commit('setUsuario', usuario);
    },
    getTarea({commit, state}, id){
      db.collection(state.usuario.email).doc(id).get()
      .then(doc => {
          let tarea = doc.data();
          tarea.id = doc.id;
          commit('setTarea', tarea);
      })
      .catch(error => console.log(error));
    },
    editarTarea({commit, state}, tarea){
      db.collection(state.usuario.email).doc(tarea.id).update({
          nombre: tarea.nombre
      })
      .then(() => {
          router.push({name: 'Inicio'});
      })
      .catch(error => console.log(error));
    },
    agregarTarea({commit, state}, nombreTarea){
      commit('cargarFirebase', true);
      db.collection(state.usuario.email).add({
          nombre: nombreTarea
      })
      .then(doc => {
          router.push({name: 'Inicio'});
          commit('cargarFirebase', false);
      })
      .catch(error => console.log(error));
    },
    eliminarTarea({commit, state}, id){
      db.collection(state.usuario.email).doc(id).delete()
      .then(() => {
          commit('setEliminarTarea', id);
      })
      .catch(error => console.log(error));
  },
  },
  getters: {
    existeUsuario(state) {
      if(state.usuario === null) {
        return false;
      } else {
        return true;
      }
    },
    arrayFiltrado(state) {
      let arregloFilrado = [];

      for (let tarea of state.tareas) {
        let nombre = tarea.nombre.toLowerCase();
        if (nombre.indexOf(state.texto) >= 0) {
          arregloFilrado.push(tarea);
        }
      }

      return arregloFilrado;
    }
  },
  modules: {
  }
});
