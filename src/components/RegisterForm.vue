<script setup>
import { reactive, watch } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import * as Yup from 'yup';
import axios from 'axios';
import { useForm, useField, ErrorMessage } from 'vee-validate';
import Toast from '../Components/ToastPage.vue'; 


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
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required."),
  fullName: Yup.string().required("Full name is required."),
  phone: Yup.string().required("Phone number is required."),
  address: Yup.string().required("Address is required."),
});


const { handleSubmit, isSubmitting, errors, submitCount, resetForm } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
  },
});


const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: fullName } = useField('fullName');
const { value: phone } = useField('phone');
const { value: address } = useField('address');

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
    
    const res = await api.get("/users");
    const userExists = res.data.find((user) => user.email === values.email);

    if (userExists) {
      setToast({ message: "User already exists with this email.", type: "error" });
      return;
    }

  
    const response = await api.post("/users", {
      ...values,
      tickets: [], 
    });

    localStorage.setItem("user", JSON.stringify(response.data));
    setToast({ message: "Registration successful!", type: "success" });

    setTimeout(() => router.push("/dashboard"), 1000);
    resetForm();

  } catch (error) {
    console.error(error);
    setToast({ message: "Error submitting form. Please try again.", type: "error" });
  } 
  
});
</script>

<template>
  <div class="register-page">
    <Toast 
      v-if="toast.message"
      :message="toast.message"
      :type="toast.type"
      @close="closeToast"
    />

    <form @submit.prevent="onSubmit" class="register-form">
      
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
      
      <input 
        type="text" 
        name="fullName" 
        placeholder="Full Name" 
        v-model="fullName"
      />
      <ErrorMessage name="fullName" as="div" class="error" />

      <input 
        type="text" 
        name="phone" 
        placeholder="Phone Number" 
        v-model="phone"
      />
      <ErrorMessage name="phone" as="div" class="error" />

      <input 
        type="text" 
        name="address" 
        placeholder="Address" 
        v-model="address"
      />
      <ErrorMessage name="address" as="div" class="error" />

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Submitting..." : "Register" }}
      </button>
    </form>

    <p>
      Already have an account? 
      <RouterLink to="/login">Login</RouterLink>
    </p>
  </div>
</template>

