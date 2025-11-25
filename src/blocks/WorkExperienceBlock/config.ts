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
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'CV File',
      admin: {
        description: 'Upload your CV (PDF recommended). This will show a "View full CV" button.',
      },
    },
  ],
}
