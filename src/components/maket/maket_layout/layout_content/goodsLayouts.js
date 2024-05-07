'use strict';

import {markRaw} from "vue";
import PenFrameComponent from "@/components/maket/maket_layout/layout_content/PenFrameComponent.vue";
import NoteFrameComponent from "@/components/maket/maket_layout/layout_content/NoteFrameComponent.vue";
import CupFrameComponent from "@/components/maket/maket_layout/layout_content/CupFrameComponent.vue";
import SingleDetailFrameComponent from "@/components/maket/maket_layout/layout_content/SingleDetailFrameComponent.vue";

export const goodsLayout = {
    'блокнот': markRaw(NoteFrameComponent),
    'кружка': markRaw(CupFrameComponent),
    'одиночная деталь': markRaw(SingleDetailFrameComponent),
    'ручка': markRaw(PenFrameComponent),
}
