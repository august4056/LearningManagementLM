// Nuxt 3 configuration for the training management backend
const nitroPreset = process.env.NITRO_PRESET || 'vercel';

export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: nitroPreset
  }
});
