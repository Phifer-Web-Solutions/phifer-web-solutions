<script setup>
import { computed, onMounted, ref } from 'vue';
import { Phone } from 'lucide-vue-next';

const props = defineProps({
  phone: { type: String, required: true },
  showIcon: { type: Boolean, default: true },
});

const hydrated = ref(false);
onMounted(() => { hydrated.value = true; });

const formatted = computed(() => {
  const digits = (props.phone || '').replace(/\D/g, '');
  const ten = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits;
  if (ten.length !== 10) return props.phone;
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
});

const telHref = computed(() => 'tel:' + (props.phone || '').replace(/\D/g, ''));
</script>

<template>
  <span class="phone-display">
    <Phone v-if="showIcon" :size="14" class="phone-display__icon" aria-hidden="true" />
    <a
      v-if="hydrated"
      :href="telHref"
      class="phone-display__link"
      :data-phone="formatted"
      aria-label="Call us"
    ></a>
    <span v-else class="phone-display__link" aria-hidden="true">&hellip;</span>
  </span>
</template>

<style scoped>
.phone-display {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--color-primary);
}

.phone-display__icon {
  flex-shrink: 0;
}

.phone-display__link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 0.25rem;
}

a.phone-display__link::before {
  content: attr(data-phone);
}

a.phone-display__link:hover::before {
  text-decoration: underline;
}

a.phone-display__link:focus-visible {
  outline: 3px dashed var(--color-primary);
  outline-offset: 2px;
}
</style>
