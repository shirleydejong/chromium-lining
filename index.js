/**
 * Chromium lining
 * A silver lining for chromium
 *
 * Main process
 * 
 *
 * @category	Javascript
 * @package		Chromium-lining
 * @author		Shirley de Jong/Nogonad
 * 
 * @remarks:
 * See ./readme.md
 * 
 * @todo:
 * 
 * 
 */
// @ts-check
'use strict';

import { config } from 'dotenv';
import puppeteer from 'puppeteer-core';

const env = config({ path: './.env' });
const width = env?.parsed?.VIEWPORT_WIDTH ? Number(env.parsed.VIEWPORT_WIDTH) : 1920;
const height = env?.parsed?.VIEWPORT_HEIGHT ? Number(env.parsed.VIEWPORT_HEIGHT) : 1080;
const url = env?.parsed?.URL ?? 'about:blank';
const insecureOrigin = env?.parsed?.INSECURE_ORIGIN ?? 'http://localhost';
const executablePath = env?.parsed?.CHROME_BIN ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const args = [
	'--kiosk',
	'--disable-pinch',
	'--allow-running-insecure-content',
	'--disable-web-security',
	'--disable-infobars',
	'--force-dark-mode',
	`--unsafely-treat-insecure-origin-as-secure=${insecureOrigin}`
];

console.log('🌍 Opening browser kiosk with the following settings:');
console.log(`URL: ${url}`);
console.log(`Viewport: ${width} x ${height}`);

if( typeof Deno === 'undefined' ) {
	args.push('--remote-debugging-port=9222');
} else {
	console.log('🦕 Remote debugging is disabled for Deno');
}

const browser = await puppeteer.launch({
	executablePath,
	args,
	headless: false,
	ignoreDefaultArgs: ['--enable-automation'],
});
const page = await browser.newPage();

await page.setViewport({ width, height });

await page.goto(url);
