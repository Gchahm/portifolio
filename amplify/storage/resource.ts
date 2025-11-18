import { defineStorage } from '@aws-amplify/backend'

export const storage = defineStorage({
  name: 'media',
  access: ({ allow }) => ({
    'public/*': [allow.guest.to(['read'])],
  }),
})
