// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [
		icon({
			// Only bundle the Lucide icons we use (keeps builds small)
			include: {
				lucide: ['mail', 'phone', 'map-pin'],
			},
		}),
	],
});
