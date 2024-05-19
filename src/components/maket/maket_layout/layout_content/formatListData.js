'use strict'

import A4MarkingComponent from "@/components/maket/maket_layout/layout_settings/A4MarkingComponent.vue";
import A3VerticalMarkingComponent from "@/components/maket/maket_layout/layout_settings/A3VerticalMarkingComponent.vue";
import A3HorizontalMarkingComponent
    from "@/components/maket/maket_layout/layout_settings/A3HorizontalMarkingComponent.vue";
import {markRaw} from "vue";

export const formatList = {
    1: ['A4 портрет', markRaw(A4MarkingComponent), 'width__a4', 'height__a4'],
    2: ['A3 портрет', markRaw(A3VerticalMarkingComponent), 'width__a3-v', 'height__a3-v'],
    3: ['A3 ландшафт', markRaw(A3HorizontalMarkingComponent), 'width__a3-h1', 'height__a3-h'],
    4: ['A3 ландшафт (2 колонки)', markRaw(A3HorizontalMarkingComponent), 'width__a3-h', 'height__a3-h'],
}
