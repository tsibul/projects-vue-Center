'use strict'

import axios from "axios";

export async function submitForm(url, tokenName) {
    const token = localStorage.getItem(tokenName);
    if (token) {
        await axios.post(url, this.formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }
}
