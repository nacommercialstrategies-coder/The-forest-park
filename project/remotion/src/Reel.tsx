import React from 'react';
import {AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, Easing} from 'remotion';
import {Cursor, EmailUI} from './EmailUI';
import {FONT, loadFonts} from './fonts';

export const FPS = 30;
export const DURATION = 540; // 18.0 s

export const HOOKS: Record<string, string[]> = {
	A: ['60 متر…', 'وواقف على الحافة.'],
	B: ['أحسن موظف بالشركة…', 'واقف على حافة 60 متر.'],
	C: ['شو اللي بيوصّل موظف…', 'لحافة 60 متر؟'],
};

const W = 1080;
const H = 1920;

// ---------- captions ----------
const Caption: React.FC<{lines: string[]; dur: number; y?: number; size?: number; instant?: boolean}> = ({lines, dur, y = 300, size = 74, instant = false}) => {
	const f = useCurrentFrame();
	const inO = instant ? 1 : interpolate(f, [0, 6], [0, 1], {extrapolateRight: 'clamp'});
	const outO = interpolate(f, [dur - 5, dur], [1, 0], {extrapolateLeft: 'clamp'});
	const rise = instant ? 0 : interpolate(f, [0, 8], [18, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
	return (
		<div
			style={{
				position: 'absolute',
				top: y,
				left: 70,
				right: 150, // keep clear of the right-side action buttons
				direction: 'rtl',
				textAlign: 'center',
				fontFamily: FONT,
				fontWeight: 800,
				fontSize: size,
				lineHeight: 1.35,
				color: '#ffffff',
				opacity: Math.min(inO, outO),
				transform: `translateY(${rise}px)`,
				textShadow: '0 4px 18px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.9)',
			}}
		>
			{lines.map((l, i) => (
				<div key={i}>
					<span style={{background: 'rgba(0,0,0,0.55)', padding: '0 18px', borderRadius: 12, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>{l}</span>
				</div>
			))}
		</div>
	);
};

// ---------- footage ----------
const Clip: React.FC<{shake?: number; origin?: string; rate?: number; src: string; start?: number; filter?: string; zoom?: [number, number]; dur: number; objectPosition?: string}> = ({
	src,
	start = 0,
	filter,
	zoom = [1, 1],
	dur,
	objectPosition = 'center',
	rate = 1,
	origin,
	shake = 0,
}) => {
	const f = useCurrentFrame();
	const s = interpolate(f, [0, dur], zoom);
	return (
		<AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
			<OffthreadVideo
				src={staticFile(src)}
				startFrom={Math.round(start * FPS)}
				playbackRate={rate}
				muted
				style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition, transform: `translate(${Math.sin(f * 0.9) * shake + Math.sin(f * 2.3) * shake * 0.4}px, ${Math.cos(f * 1.1) * shake * 0.8}px) scale(${s})`, transformOrigin: origin ?? (objectPosition === 'center' ? 'center' : '50% 8%'), filter}}
			/>
		</AbsoluteFill>
	);
};

const Vignette: React.FC<{strength?: number}> = ({strength = 0.55}) => (
	<AbsoluteFill style={{background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,${strength}) 100%)`}} />
);

// ---------- screen close-ups (full frame) ----------
const ScreenNight: React.FC<{dur: number}> = ({dur}) => {
	const f = useCurrentFrame();
	const s = interpolate(f, [0, dur], [1.0, 1.08]);
	// cursor drifts onto the send button and hesitates with a small tremble
	const cx = interpolate(f, [0, 22, dur], [760, 1235, 1240], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
	const cy = interpolate(f, [0, 22, dur], [640, 850, 852], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
	const tremble = Math.sin(f * 1.7) * 2.2;
	const hover = interpolate(f, [18, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<AbsoluteFill style={{background: '#05070a', overflow: 'hidden'}}>
			<div
				style={{
					position: 'absolute',
					left: 1080 - 60 - 1600,
					top: 600,
					width: 1600,
					height: 1000,
					transform: `scale(${1.0 * s}) perspective(2400px) rotateX(4deg) rotateY(-9deg)`,
					transformOrigin: '85% 60%',
					filter: 'brightness(0.92) contrast(1.02) blur(0.4px)',
				}}
			>
				<EmailUI state="compose" sendHover={hover} />
				<Cursor x={cx + tremble} y={cy + tremble * 0.6} scale={1.2} />
			</div>
			{/* screen glow + dark room falloff */}
			<AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 38% at 50% 58%, rgba(170,200,255,0.10), rgba(0,0,0,0) 60%)'}} />
			<Vignette strength={0.85} />
		</AbsoluteFill>
	);
};

const ScreenMorning: React.FC<{dur: number}> = ({dur}) => {
	const f = useCurrentFrame();
	const s = interpolate(f, [0, dur], [1.04, 1.0]);
	const cx = interpolate(f, [0, 30], [1300, 1035], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
	const cy = interpolate(f, [0, 30], [760, 858], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
	const hover = interpolate(f, [24, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const pressed = f >= 36 && f < 40;
	const del = interpolate(f, [40, 58], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<AbsoluteFill style={{background: '#d9d4c8', overflow: 'hidden'}}>
			<div
				style={{
					position: 'absolute',
					left: 1080 - 60 - 1600,
					top: 600,
					width: 1600,
					height: 1000,
					transform: `scale(${1.0 * s}) perspective(2400px) rotateX(4deg) rotateY(-9deg)`,
					transformOrigin: '85% 60%',
					filter: 'brightness(1.0) contrast(1.0) blur(0.4px)',
				}}
			>
				<EmailUI state={del > 0 ? 'deleted' : 'compose'} deleteHover={hover} deletedProgress={del} theme="day" />
				<Cursor x={cx} y={cy} pressed={pressed} scale={1.2} />
			</div>
			{/* warm morning light from a window */}
			<AbsoluteFill style={{background: 'linear-gradient(120deg, rgba(255,214,150,0.32) 0%, rgba(255,214,150,0) 45%)'}} />
			<Vignette strength={0.5} />
		</AbsoluteFill>
	);
};

// ---------- end card ----------
const EndCard: React.FC<{dur: number}> = ({dur}) => {
	const f = useCurrentFrame();
	const logoO = interpolate(f, [0, 10], [0, 1], {extrapolateRight: 'clamp'});
	const logoS = interpolate(f, [0, 14], [0.92, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
	const t1 = interpolate(f, [6, 14], [0, 1], {extrapolateRight: 'clamp'});
	const t2 = interpolate(f, [8, 16], [0, 1], {extrapolateRight: 'clamp'});
	const out = interpolate(f, [dur - 6, dur], [1, 0], {extrapolateLeft: 'clamp'});
	return (
		<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, #24533b 0%, #12301f 70%, #0b1f14 100%)', opacity: out}}>
			<div style={{position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: logoO, transform: `scale(${logoS})`}}>
				<Img src={staticFile('logo_white.png')} style={{width: 430}} />
			</div>
			<div style={{position: 'absolute', top: 820, left: 80, right: 150, direction: 'rtl', textAlign: 'center', fontFamily: FONT, color: '#fff'}}>
				<div style={{fontSize: 58, fontWeight: 800, lineHeight: 1.35, opacity: t1}}>
					<div>قبل ما تخسر أحسن موظفينك…</div>
					<div>طلّعهم من المكتب.</div>
				</div>
				<div
					style={{
						marginTop: 46,
						display: 'inline-block',
						background: '#e3b23c',
						color: '#14301f',
						fontSize: 46,
						fontWeight: 800,
						padding: '18px 40px',
						borderRadius: 18,
						opacity: t2,
					}}
				>
					ابعتلنا «فريق» بالخاص
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ---------- timeline ----------
export const SHOTS = {
	hook: [0, 66],          // GoPro POV at the edge of the 60 m wooden tower
	screenNight: [66, 108], // flashback: the unsent resignation
	office: [108, 162],
	meeting: [162, 219],
	edge: [219, 258],       // REAL: back on the tower, he steps back over the edge
	descent: [258, 309],    // GoPro POV: the rappel down
	cheer: [309, 369],      // team at the base of the wooden tower
	hug: [369, 408],
	screenMorning: [408, 465],
	end: [465, 540],
} as const;

const S: React.FC<{k: keyof typeof SHOTS; children: React.ReactNode}> = ({k, children}) => (
	<Sequence from={SHOTS[k][0]} durationInFrames={SHOTS[k][1] - SHOTS[k][0]}>
		{children}
	</Sequence>
);
const d = (k: keyof typeof SHOTS) => SHOTS[k][1] - SHOTS[k][0];
export const POV_TOP = 0;
export const POV_DESC = 4.4;
const REAL = 'saturate(1.12) contrast(1.08) sepia(0.12) brightness(1.0)';

const Flash: React.FC = () => {
	const f = useCurrentFrame();
	return <AbsoluteFill style={{background: '#fff', opacity: interpolate(f, [0, 4], [0.85, 0], {extrapolateRight: 'clamp'})}} />;
};

export const Reel: React.FC<{hook: string}> = ({hook}) => {
	loadFonts();
	const c = (k: keyof typeof SHOTS) => SHOTS[k][0];
	return (
		<AbsoluteFill style={{background: '#000', width: W, height: H}}>
			<Sequence from={0} durationInFrames={42}><Clip src="pov.mp4" start={0} dur={42} zoom={[1.02, 1.05]} filter={REAL} /><Vignette strength={0.45} /></Sequence>
			<Sequence from={42} durationInFrames={24}><Clip src="pov.mp4" start={0.6} rate={0.55} dur={24} zoom={[1.05, 1.08]} shake={3} filter={REAL} /><Vignette strength={0.45} /></Sequence>
			<S k="screenNight"><ScreenNight dur={d('screenNight')} /><Flash /></S>
			<S k="office"><Clip src="office_comp.mp4" start={0.2} dur={d('office')} zoom={[1.0, 1.05]} filter="saturate(0.9) contrast(1.05)" /><Vignette /></S>
			<S k="meeting"><Clip src="meeting.mp4" start={0.4} dur={d('meeting')} zoom={[1.55, 1.6]} origin="22% 42%" filter="saturate(0.9)" /><Vignette strength={0.35} /></S>
			<S k="edge"><Clip src="real_top_edge.mp4" dur={d('edge')} zoom={[1.55, 1.7]} origin="50% 2%" shake={4} filter={REAL} /><Vignette strength={0.5} /><Flash /></S>
			<S k="cheer"><Clip src="cheer.mp4" start={0.3} dur={d('cheer')} zoom={[1.0, 1.04]} filter={REAL} /><Vignette strength={0.4} /></S>
			<S k="descent"><Clip src="pov.mp4" start={POV_DESC} dur={d('descent')} zoom={[1.12, 1.4]} origin="50% 30%" shake={4} filter={REAL} /><Vignette strength={0.45} /><Flash /></S>
			<S k="hug"><Clip src="hug.mp4" start={0.8} dur={d('hug')} zoom={[1.02, 1.07]} filter={REAL} /><Vignette strength={0.4} /></S>
			<S k="screenMorning"><ScreenMorning dur={d('screenMorning')} /></S>
			<S k="end"><EndCard dur={d('end')} /></S>

			{/* captions */}
			<Sequence from={0} durationInFrames={66}><Caption lines={HOOKS[hook]} dur={66} y={315} size={76} instant /></Sequence>
			<Sequence from={c('screenNight')} durationInFrames={42}><Caption lines={['وقبل يومين…', 'كان كاتب استقالته.']} dur={42} y={315} size={70} /></Sequence>
			<Sequence from={c('office')} durationInFrames={54}><Caption lines={['مش عشان الراتب…']} dur={54} /></Sequence>
			<Sequence from={c('meeting')} durationInFrames={57}><Caption lines={['عشان حاسس إنه', 'ما حدا شايفه.']} dur={57} /></Sequence>
			<Sequence from={c('edge')} durationInFrames={39}><Caption lines={['لحد ما وقف هون…']} dur={39} y={1180} /></Sequence>
			<Sequence from={c('descent')} durationInFrames={111}><Caption lines={['والفريق كله تحت', 'بينادي باسمه.']} dur={111} /></Sequence>
			<Sequence from={c('hug')} durationInFrames={39}><Caption lines={['يوم واحد…', 'رجّعله روح الفريق.']} dur={39} size={64} /></Sequence>
			<Sequence from={c('screenMorning')} durationInFrames={57}><Caption lines={['وضلّ…', 'بدل ما يروح.']} dur={57} y={300} size={76} /></Sequence>
		</AbsoluteFill>
	);
};

// texture for compositing onto the laptop screen in the office shot
export const EmailStill: React.FC = () => {
	loadFonts();
	return <EmailUI state="compose" />;
};
