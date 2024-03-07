// store.js

import {createStore} from 'vuex';


export default createStore({
    state: {
        user: null,
    },
    getters: {
        getUser: (state) => state.user,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = null;
        },

    },
    actions: {
        // Ваши другие действия могут быть добавлены здесь
    },
});
