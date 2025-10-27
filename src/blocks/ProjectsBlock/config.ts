import type { Block } from 'payload'

export const ProjectsBlock: Block = {
  slug: 'projectsBlock',
  interfaceName: 'ProjectsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
