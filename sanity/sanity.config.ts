// import {defineConfig} from 'sanity'
// import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas/schema'
// import { visionTool } from '@sanity/vision'

// export default defineConfig({
//   name: 'default',
//   title: 'twitter-1',

//   projectId: 'rdtlcgee',
//   dataset: 'production',

//   plugins: [deskTool(), visionTool()],

//   schema: {
//     types: schemaTypes,
//   },
// })

// Single workspace configuration

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
// import {schemaTypes} from './schemas'

export default defineConfig({
  projectId: 'rdtlcgee',
	dataset: 'production',
  plugins: [deskTool()],
  schema: {
	  types: schemaTypes,
  },
})