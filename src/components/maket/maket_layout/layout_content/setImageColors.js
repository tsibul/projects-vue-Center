'use strict'

import {fetchData} from "@/components/services/fetchData.js";

export async function setImageColors(article, html, appUrl, token) {
    const hexUrl = `${appUrl}item_color_code_list/${article}`
    const response = await fetchData(hexUrl, token)
    const articleColors = response.id
    for (let i = 0; i < articleColors.length; i++){
        const j = i + 1;
        html = html.replaceAll('itemColor_' + j, articleColors[i]);
    }
    return html;

}
