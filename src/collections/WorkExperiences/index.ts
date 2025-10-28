import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { getTechStackIconOptions } from '@/util/techStackIcons'

export const WorkExperiences: CollectionConfig = {
  slug: 'work-experiences',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'startDate', 'endDate', 'updatedAt'],
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
      required: true,
    },
    {
      name: 'jobTitle',
      type: 'text',
      label: 'Job Title',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'techStack',
      type: 'array',
      label: 'Tech Stack',
      labels: {
        singular: 'Technology',
        plural: 'Technologies',
      },
      fields: [
        {
          name: 'name',
          type: 'select',
          label: 'Icon',
          required: true,
          options: getTechStackIconOptions(),
          admin: {
            isClearable: true,
          },
        },
      ],
    },
  ],
}
