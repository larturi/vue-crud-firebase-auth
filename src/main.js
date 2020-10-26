import { createApp } from 'vue';
import { auth } from './firebase';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

Vue.config.productionTip = false;

auth.onAuthStateChanged(user => {

    if (user) {
        store.dispatch('detectarUsuario', {email: user.email, uid: user.uid});
    } else {
        store.dispatch('detectarUsuario', user);
    }

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
    
});


