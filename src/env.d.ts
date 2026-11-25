/// <reference types="astro/client" />

interface Window {
	fireConfetti: (options?: import('./types/cv').ConfettiOptions) => void;
}
