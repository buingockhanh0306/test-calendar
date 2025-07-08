<template>
  <VueDatePicker
    week-start="0"
    v-model="pickerDate"
    :auto-apply="false"
    :format="dateFormat"
    :text-input="{ format: dateFormat }"
    :enable-time-picker="isTimePickerOpen"
    :format-locale="ko"
    :class="props.datePickerClass"
    :style="props.datePickerStyle"
    :teleport="true"
    position="left"
    :ui="{ menu: props.isDarkmode ? 'dp-darkmode' : '' }"
    :disabled="props.disabled"
    @cleared="setIsCustomClose(true)"
    @blur="setIsCustomClose(true)"
    @focus="setIsCustomClose(false)"
    @date-update="setIsCustomClose(false)"
    @closed="setIsOpenDP(false)"
    @open="setIsOpenDP(true)"
  >
    <template #dp-input="{ value }">
      <v-text-field
        ref="inputRef"
        v-model="inputDate"
        :class="isOpenDp ? 'custom-border' : {}"
        placeholder="YYYY-MM-DD"
        :key="keyInput"
        :value="value"
        :id="props.id"
        :name="props.name"
        :rules="arrInputRules"
        :hide-details="auto"
      >
        <template #message>
          <div
            v-show="isCustomClose && props.isRules && !isOpenDp"
            style="color: red; font-size: 0.9rem"
          >
            Please enter a date
          </div>
        </template>
      </v-text-field>
    </template>

    <template #action-row="{ selectDate, closePicker }">
      <div class="action-row">
        <button class="btn btn--red" @click="handleClose(closePicker, 'close')">
          Close
        </button>
        <button
          :style="{ marginLeft: '10px' }"
          class="btn btn--green"
          @click="handleClose(selectDate, 'choice')"
        >
          Choice
        </button>
      </div>
    </template>

    <template #year="{ value }"> {{ value }}year </template>

    <template #year-overlay-value="{ value }"> {{ value }}year </template>
  </VueDatePicker>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  defineProps,
  defineEmits,
  inject,
  onMounted,
  readonly,
} from "vue";
import { format, isValid, parseISO } from "date-fns";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";

const props = defineProps({
  modelValue: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  name: String,
  label: String,
  showLabel: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: "YYYY-MM-DD",
  },
  dateGubun: {
    type: String,
    default: "-",
  },
  datePickerClass: String,
  datePickerStyle: String,
  inputClass: String,
  inputStyle: String,
  isAutoAapply: {
    type: Boolean,
    default: false,
  },
  isTimePickerOpen: {
    type: Boolean,
    default: false,
  },
  isRules: {
    type: Boolean,
    default: false,
  },
  inputRule: {
    type: Object,
  },
  isDarkmode: Boolean,
  disabled: Boolean,
  readonly: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const utils = inject("$utils");

const pickerDate = ref(null);
const inputDate = ref(null);
const isCustomClose = ref(true);
const isClickClose = ref(false);
const inputRef = ref(null);
const isOpenDp = ref(false);
const keyInput = ref(0);

const setIsOpenDP = (val) => {
  isOpenDp.value = val;
};
const handleCloseDP = () => {
  isOpenDp.value = false;
};

const dateFormat = ref(
  "yyyy" + props.dateGubun + "MM" + props.dateGubun + "dd"
);

const arrInputRules = reactive([]);

onMounted(() => {
  setRules(props.isRules && isCustomClose.value);
  setInitDate(props.modelValue);
});

watch(
  () => props.modelValue,
  (newValue) => {
    setInitDate(newValue);
  }
);

watch(
  () => props.isRules && isCustomClose.value,
  (newValue) => {
    setRules(newValue);
  }
);

watch(
  () => props.dateGubun,
  (newValue) => {
    dateFormat.value = "yyyy" + newValue + "MM" + newValue + "dd";
  }
);

watch(
  () => props.label,
  (newValue) => {
    arrInputRules.splice(0, arrInputRules.length);
    setRules(props.isRules && isCustomClose.value, newValue);
  }
);

watch(pickerDate, (newDate, oldDate) => {
  if (formatDate(oldDate) !== formatDate(newDate)) {
    let strDate = formatDate(newDate);
    inputDate.value = strDate;
    emit("update:modelValue", strDate);
  }
});

const setInitDate = (date) => {
  if (date && date.length >= 8) {
    const numbers = date.replace(/\D/g, "");
    const year = numbers.slice(0, 4);
    const month = numbers.slice(4, 6);
    const day = numbers.slice(6, 8);
    const formatted = year + "-" + month + "-" + day;
    const parseISODate = parseISO(formatted);
    if (isValid(parseISODate)) {
      pickerDate.value = new Date(formatted);
    } else {
      inputDate.value = date;
    }
  }
};

const focusInput = () => {
  isCustomClose.value = false;
};

const setRules = (isRules, newlabel) => {
  if (isRules && isCustomClose.value) {
    let strLabel = "";
    let label = props?.label;
    if (newlabel) {
      label = newlabel;
    }
    if (label) {
      strLabel = "message.selectRequired";
    } else {
      strLabel = "message.selectRequired";
    }
    if (props?.inputRule && props.inputRule.length > 0) {
      arrInputRules.splice(0, arrInputRules.length, ...props.inputRule);
    } else {
      arrInputRules.push(
        (v) =>
          (!!v && v.length > 0 && v.replace(/\s/g, "").length > 0) || strLabel
      );
    }
  } else {
    arrInputRules.splice(0, arrInputRules.length);
  }
};

const formatDate = (date) => {
  if (!date) return "";
  return format(date, dateFormat.value);
};

const setIsCustomClose = (val) => {
  isCustomClose.value = val;
};
const handleClose = async (fn) => {
  fn();
  setIsCustomClose(true);
};
</script>

<style scoped lang="scss">
.btn {
  font-weight: 500;
  &--red {
    color: rgb(218, 60, 60);
  }
  &--green {
    color: rgb(9, 77, 9);
  }
  &:hover {
    opacity: 0.8;
  }
}
:deep(.custom-border) {
  .v-field__outline::before {
    border-color: black !important;
  }

  .v-field--focused .v-field__outline::before {
    border-color: black !important;
  }

  .v-field--error .v-field__outline::before {
    border-color: black !important;
  }

  .v-field,
  .v-field--error,
  .v-field--focused {
    --v-field-border-color: black !important;
    --v-theme-error: black !important;
  }
  .v-messages__message {
    color: black !important;
  }
}
</style>
