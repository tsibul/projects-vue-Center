// store.js

import {createStore} from 'vuex';


export default createStore({
    state: {
        user: null,
        fieldData: null
    },
    getters: {
        getUser: (state) => state.user,
        getFieldData: (state) => state.fieldData
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = null;
        },
        setFieldData(state, fieldData){
            state.fieldData = fieldData;
        },
        clearFieldData(state){
            state.fieldData = null;
        }

    },
    actions: {
        // Ваши другие действия могут быть добавлены здесь
    },
});
