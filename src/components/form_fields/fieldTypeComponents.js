'use strict'

import FormInputComponent from "@/components/form_fields/FormInputComponent.vue";
import DropDownComponent from "@/components/form_fields/DropDownComponent.vue";
import FormBooleanComponent from "@/components/form_fields/FormBooleanComponent.vue";
import FormChoicesComponent from "@/components/form_fields/FormChoicesComponent.vue";
import FormFileComponent from "@/components/form_fields/FormFileComponent.vue";
import FormInputNumberComponent from "@/components/form_fields/FormInputNumberComponent.vue";

export const fieldTypeComponent = {
    'string': {
        component: FormInputComponent,
        props: ['value', 'readonly']
    },
    'foreign': {
        component: DropDownComponent,
        props: ['value', 'readonly', 'foreignClass']
    },
    'boolean': {
        component: FormBooleanComponent,
        props: ['value', 'readonly']
    },
    'choices': {
        component: FormChoicesComponent,
        props: ['value', 'readonly']
    },
    'svgFile': {
        component: FormFileComponent,
        props: ['value', 'readonly']
    },
    'file': {
        component: FormFileComponent,
        props: ['value', 'readonly']
    },
}
