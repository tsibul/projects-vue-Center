'use strict';

import {markRaw} from "vue";
import PenFrameComponent from "@/components/maket/maket_layout/layout_content/pen_component/PenFrameComponent.vue";
import NoteFrameComponent from "@/components/maket/maket_layout/layout_content/note_component/NoteFrameComponent.vue";
import CupFrameComponent from "@/components/maket/maket_layout/layout_content/cup_component/CupFrameComponent.vue";
import SingleDetailFrameComponent from "@/components/maket/maket_layout/layout_content/SingleDetailFrameComponent.vue";

export const goodsLayout = {
    'блокнот': markRaw(NoteFrameComponent),
    'кружка': markRaw(CupFrameComponent),
    'одиночная деталь': markRaw(SingleDetailFrameComponent),
    'ручка': markRaw(PenFrameComponent),
}
