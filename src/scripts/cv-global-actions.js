/**
 * CV global actions
 *
 * Smooth scrolling is handled in CSS (`scroll-behavior: smooth`).
 * Shared helpers live here so components can call them from HTML (onclick).
 *
 * Confetti: https://github.com/loonywizard/js-confetti
 */

import JSConfetti from 'js-confetti';

// --- DATA --------------------------------------------------------------------
const jsConfetti = new JSConfetti();

/** Default look when you call fireConfetti() with no options */
const DEFAULT_CONFETTI = {
	emojis: ['🎉', '✨', '💥'],
	confettiNumber: 100,
};

// --- ACTIONS -----------------------------------------------------------------
/**
 * Fire confetti. Call from HTML: onclick="fireConfetti()"
 *
 * Same options as js-confetti `addConfetti` (all optional):
 * - emojis: string[]
 * - emojiSize: number
 * - confettiColors: string[]
 * - confettiRadius: number
 * - confettiNumber: number
 *
 * @param {object} [options]
 */
function fireConfetti(options = {}) {
	const config = {
		...DEFAULT_CONFETTI,
		...options,
	};

	// Colored paper mode: if colors are set and emojis are not, drop default emojis
	if (options.confettiColors && options.emojis === undefined) {
		delete config.emojis;
	}

	jsConfetti.addConfetti(config);
}

// Needed so onclick="fireConfetti()" works (Astro scripts are modules)
window.fireConfetti = fireConfetti;
