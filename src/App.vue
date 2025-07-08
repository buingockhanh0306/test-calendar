<template>
  <v-form
    ref="formRef"
    class="form-data partition item-fixed"
    validate-on="lazy invalid-input"
  >
    <div style="max-width: 400px; margin: 20px auto">
      <CustomDatePicker
        :id="'startDt'"
        v-model="inputForm.startDt"
        isRules
        :label="'label.startDate'"
        :key="inputForm.startDt"
      />
    </div>
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import CustomDatePicker from "./components/DatePicker.vue";

const inputForm = ref({
  startDt: "",
});
</script>

<style>
.center-wrapper {
  margin: 0px auto;
  width: 400px;
}
.custom-input .v-field__input {
  padding: 0 20px;
}
</style>
