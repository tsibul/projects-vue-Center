'use strict'

import axios from "axios";

export async function fetchData(url, tokenName){
    const token = localStorage.getItem(tokenName);
    if (token) {
        const backendResponse = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return  backendResponse.data;
    } else {
        return null
    }
}
