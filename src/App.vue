<template>
  <div class="center-wrapper">
    <MyDatePicker
      v-model="selectedDate"
      id="my-datepicker"
      name="my-datepicker-name"
      label="Chọn ngày"
      :show-label="true"
      placeholder="YYYY-MM-DD"
      date-picker-class="custom-input"
      date-gubun="-"
      :is-rules="true"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyDatePicker from "./components/DatePicker.vue";

const selectedDate = ref("");
</script>

<style>
.center-wrapper {
  margin: 50px auto;
  width: 400px;
}
.custom-input .v-field__input {
  padding: 0 20px;
}
</style>
