export const authMixin = {
    methods: {
        closeForm() {
            this.$emit('closeForm');
        }
    }
};
