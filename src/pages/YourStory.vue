<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
});

const route = useRoute();
const token = ref('');
const loading = ref(false);
const submitted = ref(false);
const formError = ref('');

const form = ref({
  frustrationBefore: '',
  whatChanged: '',
  recommendation: '',
  standoutMoment: '',
  submitterName: '',
  submitterTitle: '',
  organizationName: '',
  permissionGranted: false,
});

onMounted(() => {
  token.value = String(route.query.ref || '');
});

async function submitForm() {
  formError.value = '';

  if (!form.value.frustrationBefore || !form.value.whatChanged || !form.value.recommendation || !form.value.submitterName || !form.value.submitterTitle || !form.value.organizationName) {
    formError.value = 'Please fill out all required fields.';
    return;
  }

  if (!form.value.permissionGranted) {
    formError.value = 'Please confirm permission to use your responses as a testimonial.';
    return;
  }

  loading.value = true;

  try {
    const res = await fetch('https://isyourwebsitegood.com/.netlify/functions/receive-testimonial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestToken: token.value,
        ...form.value,
      }),
    });

    if (res.status === 409) {
      submitted.value = true;
      formError.value = 'It looks like this form has already been submitted. Thank you!';
      return;
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Something went wrong.');
    }

    submitted.value = true;
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Something went wrong. Please reply to the original email and let Eric know.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="page page--your-story">
    <!-- No token -->
    <section v-if="!token" class="your-story__container">
      <div class="your-story__empty">
        <h1 class="your-story__heading">Invalid link</h1>
        <p class="your-story__text">This link may be expired or invalid. If you received an email from Eric, please use the link in that email.</p>
      </div>
    </section>

    <!-- Success state -->
    <section v-else-if="submitted && !formError" class="your-story__container">
      <div class="your-story__success">
        <div class="your-story__check">
          <span>&#10003;</span>
        </div>
        <h1 class="your-story__heading">Thank you</h1>
        <p class="your-story__text">This genuinely helps. I'll follow up if I have any questions before using your words anywhere.</p>
        <p class="your-story__text your-story__text--muted">— Eric</p>
      </div>
    </section>

    <!-- Already submitted -->
    <section v-else-if="submitted && formError" class="your-story__container">
      <div class="your-story__success">
        <h1 class="your-story__heading">Already submitted</h1>
        <p class="your-story__text">{{ formError }}</p>
      </div>
    </section>

    <!-- Form -->
    <section v-else class="your-story__container">
      <div class="your-story__intro">
        <h1 class="your-story__heading">How has your site changed things?</h1>
        <p class="your-story__subhead">A few short questions about your experience — before and after. Takes about five minutes.</p>
      </div>

      <form @submit.prevent="submitForm" class="your-story__form">
        <!-- Q1 -->
        <div class="your-story__field">
          <label for="frustration" class="your-story__label">
            Before we worked together, what was your biggest frustration with your web presence?
            <span class="your-story__required">*</span>
          </label>
          <p class="your-story__helper">Think about what was broken, missing, or just always nagging at you.</p>
          <textarea id="frustration" v-model="form.frustrationBefore" rows="4" required class="your-story__textarea"></textarea>
        </div>

        <!-- Q2 -->
        <div class="your-story__field">
          <label for="changed" class="your-story__label">
            What has changed for your organization since your site launched?
            <span class="your-story__required">*</span>
          </label>
          <p class="your-story__helper">This could be practical (easier to update content, more inquiries) or something harder to measure (more confidence, fewer awkward conversations about your site).</p>
          <textarea id="changed" v-model="form.whatChanged" rows="4" required class="your-story__textarea"></textarea>
        </div>

        <!-- Q3 -->
        <div class="your-story__field">
          <label for="recommendation" class="your-story__label">
            What would you tell a similar organization that's considering working with Phifer Web Solutions?
            <span class="your-story__required">*</span>
          </label>
          <p class="your-story__helper">Imagine someone who does what you do just asked you about it over coffee.</p>
          <textarea id="recommendation" v-model="form.recommendation" rows="4" required class="your-story__textarea"></textarea>
        </div>

        <!-- Q4 -->
        <div class="your-story__field">
          <label for="standout" class="your-story__label">
            Is there a specific moment or result that stood out?
          </label>
          <p class="your-story__helper">Optional, but often the most useful thing you can share.</p>
          <textarea id="standout" v-model="form.standoutMoment" rows="3" class="your-story__textarea"></textarea>
        </div>

        <!-- Contact info -->
        <div class="your-story__row">
          <div class="your-story__field">
            <label for="name" class="your-story__label">Your name <span class="your-story__required">*</span></label>
            <input id="name" v-model="form.submitterName" type="text" required class="your-story__input" />
          </div>
          <div class="your-story__field">
            <label for="title" class="your-story__label">Your role or title <span class="your-story__required">*</span></label>
            <input id="title" v-model="form.submitterTitle" type="text" required class="your-story__input" />
          </div>
        </div>

        <div class="your-story__field">
          <label for="org" class="your-story__label">Organization <span class="your-story__required">*</span></label>
          <input id="org" v-model="form.organizationName" type="text" required class="your-story__input" />
        </div>

        <!-- Permission -->
        <div class="your-story__field your-story__checkbox-field">
          <label class="your-story__checkbox-label">
            <input type="checkbox" v-model="form.permissionGranted" class="your-story__checkbox" />
            <span>Phifer Web Solutions may use my responses as a testimonial on the website and social media. My name, title, and organization will be attributed.</span>
          </label>
        </div>

        <p v-if="formError" class="your-story__error" role="alert">{{ formError }}</p>

        <button type="submit" :disabled="loading" class="your-story__submit">
          {{ loading ? 'Submitting...' : 'Share my experience' }}
        </button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.your-story__container {
  max-width: 640px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.your-story__empty,
.your-story__success {
  text-align: center;
  padding: 4rem 0;
}

.your-story__check {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
}

.your-story__heading {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  margin: 0 0 0.75rem;
  font-family: var(--font-heading);
}

.your-story__subhead {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 2.5rem;
}

.your-story__text {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 0.75rem;
}
.your-story__text--muted { color: var(--color-text-secondary); opacity: 0.7; }

.your-story__intro { margin-bottom: 2rem; }

.your-story__form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.your-story__field { display: flex; flex-direction: column; }

.your-story__label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.375rem;
  line-height: 1.5;
}

.your-story__required { color: #ef4444; }

.your-story__helper {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0 0 0.5rem;
  line-height: 1.5;
}

.your-story__textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.9375rem;
  line-height: 1.6;
  font-family: inherit;
  resize: vertical;
}
.your-story__textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
}

.your-story__input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.9375rem;
  font-family: inherit;
}
.your-story__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
}

.your-story__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 480px) {
  .your-story__row { grid-template-columns: 1fr; }
}

.your-story__checkbox-field { margin-top: 0.5rem; }

.your-story__checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.6;
  cursor: pointer;
}

.your-story__checkbox {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.your-story__error {
  color: #ef4444;
  font-size: 0.875rem;
  margin: 0;
}

.your-story__submit {
  width: 100%;
  padding: 0.875rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}
.your-story__submit:hover { opacity: 0.9; }
.your-story__submit:disabled { opacity: 0.5; cursor: not-allowed; }
.your-story__submit:focus-visible {
  outline: 3px dashed var(--color-primary);
  outline-offset: 2px;
}
</style>
