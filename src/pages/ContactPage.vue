<script setup lang="ts">
import { ref } from 'vue';
import SeoHead from '@/components/seo/SeoHead.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useSiteStore } from '@/stores/useSiteStore';

const site = useSiteStore();
const formspreeEndpoint = '';

const name = ref('');
const email = ref('');
const message = ref('');
const submitted = ref(false);
const error = ref('');

async function handleSubmit() {
  error.value = '';
  try {
    const res = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });
    if (res.ok) {
      submitted.value = true;
    } else {
      error.value = 'Something went wrong. Please try again.';
    }
  } catch {
    error.value = 'Network error. Please try again.';
  }
}
</script>

<template>
  <SeoHead
    :title="`Contact | ${site.name}`"
    :description="`Get in touch with ${site.name}.`"
  />
  <main>
    <BaseSection narrow>
      <h1>Contact Us</h1>

      <div v-if="submitted" class="contact-success">
        <p>Thank you! We'll be in touch soon.</p>
      </div>

      <form v-else class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-field">
          <label for="name">Name</label>
          <input id="name" v-model="name" type="text" required />
        </div>

        <div class="form-field">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required />
        </div>

        <div class="form-field">
          <label for="message">Message</label>
          <textarea id="message" v-model="message" rows="5" required></textarea>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>

        <BaseButton type="submit" variant="primary">Send Message</BaseButton>
      </form>
    </BaseSection>
  </main>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-field label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-text);
}

.form-field input,
.form-field textarea {
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--color-text);
  background-color: var(--color-bg);
  transition: border-color 0.2s ease;
}

.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-error {
  color: #dc2626;
  font-size: 0.875rem;
}

.contact-success {
  margin-top: 2rem;
  padding: 2rem;
  text-align: center;
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
}
</style>
