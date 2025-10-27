import type { Block } from 'payload'

export const WorkExperienceBlock: Block = {
  slug: 'workExperienceBlock',
  interfaceName: 'WorkExperienceBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
