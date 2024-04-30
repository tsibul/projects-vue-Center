'use strict';

import axios from "axios";

export async function showDownloadFile(url, token) {
    if (token) {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response) {
            const fileType = response.headers.get('content-type');
            if (fileType === 'application/pdf') {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
        } else {
            alert('ошибка загрузки')
        }
    }
}
