<script setup>
import { reactive, watch } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import * as Yup from 'yup';
import axios from 'axios';
import { useForm, useField, ErrorMessage } from 'vee-validate';

import Toast from '../components/ToastPage.vue';

const api = axios.create({
  baseURL: "https://mockdata-93rw.onrender.com",
});

const toast = reactive({
  message: "",
  type: "",
});

const setToast = ({ message, type }) => {
  toast.message = message;
  toast.type = type;
};

const closeToast = () => {
  setToast({ message: "", type: "" });
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required."),
});

const { handleSubmit, isSubmitting, errors, submitCount } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const { value: email } = useField('email');
const { value: password } = useField('password');

watch([submitCount, errors], ([newSubmitCount]) => {
  if (newSubmitCount > 0) {
    const firstErrorKey = Object.keys(errors.value)[0];
    if (firstErrorKey) {
      const firstError = errors.value[firstErrorKey];
      setToast({ message: firstError, type: "error" });
    }
  }
}, { immediate: true });

const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await api.get(
      `/users?email=${values.email}&password=${values.password}`
    );

    if (response.data.length > 0) {
      const user = response.data[0];
      localStorage.setItem("user", JSON.stringify(user));
      setToast({ message: "Login successful!", type: "success" });
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      setToast({
        message: "Invalid credentials. Please try again.",
        type: "error",
      });
    }
  } catch (error) {
    console.error(error);
    setToast({ message: "Login failed. Server error.", type: "error" });
  } 
});

</script>

<template>
  <div class="login-page">
    <Toast 
      v-if="toast.message"
      :message="toast.message"
      :type="toast.type"
      @close="closeToast"
    />

    <form @submit.prevent="onSubmit" class="login-form">
      
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        v-model="email"
      />
      <ErrorMessage name="email" as="div" class="error" />

      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        v-model="password"
      />
      <ErrorMessage name="password" as="div" class="error" />

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Logging in..." : "Login" }}
      </button>
    </form>

    <p>
      Don’t have an account? 
      <RouterLink to="/register">Register</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.9em;
  margin-top: -5px;
  margin-bottom: 10px;
}
</style>