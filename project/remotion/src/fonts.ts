import {continueRender, delayRender, staticFile} from 'remotion';

const faces: [string, string][] = [
	['500', 'tajawal-arabic-500-normal.woff2'],
	['700', 'tajawal-arabic-700-normal.woff2'],
	['800', 'tajawal-arabic-800-normal.woff2'],
	['500', 'tajawal-latin-500-normal.woff2'],
	['700', 'tajawal-latin-700-normal.woff2'],
	['800', 'tajawal-latin-800-normal.woff2'],
];

let loaded = false;
export const loadFonts = () => {
	if (loaded) return;
	loaded = true;
	const handle = delayRender('fonts');
	Promise.all(
		faces.map(([w, f]) => {
			const face = new FontFace('Tajawal', `url(${staticFile(f)})`, {weight: w});
			document.fonts.add(face);
			return face.load();
		})
	)
		.then(() => continueRender(handle))
		.catch((e) => {
			console.error(e);
			continueRender(handle);
		});
};

export const FONT = "'Tajawal', sans-serif";
