import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { getTechStackIconOptions } from '@/util/techStackIcons'
import { slugField } from 'payload'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    slug: true,
  },
  orderable: true,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'githubUrl', 'demoUrl', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Is featured',
    },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'githubUrl',
      type: 'text',
      label: 'GitHub URL',
    },
    {
      name: 'demoUrl',
      type: 'text',
      label: 'Demo URL',
    },
    {
      name: 'keywords',
      type: 'text',
      hasMany: true, // This makes the field store an array of strings
    },
  ],
}
