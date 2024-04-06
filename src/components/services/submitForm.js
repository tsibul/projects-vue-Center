'use strict'

import axios from "axios";

export async function submitForm(url, tokenName, formData) {
    const token = localStorage.getItem(tokenName);
    if (token) {
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseData = response.data;
            return responseData.id;
        } catch (error){
            return null;
        }

    }
}
