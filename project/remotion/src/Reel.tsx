import React from 'react';
import {AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, Easing} from 'remotion';
import {Cursor, EmailUI} from './EmailUI';
import {FONT, loadFonts} from './fonts';

export const FPS = 30;
export const DURATION = 537; // 17.9 s

export const HOOKS: Record<string, string[]> = {
	A: ['في موظف بشركتك…', 'كاتب استقالته', 'وما بعتها لسا.'],
	B: ['أحسن موظف عندك…', 'ممكن يكون هسّا', 'بكتب استقالته.'],
	C: ['الاستقالة…', 'ما بتيجي', 'فجأة.'],
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
const Clip: React.FC<{origin?: string; rate?: number; src: string; start?: number; filter?: string; zoom?: [number, number]; dur: number; objectPosition?: string}> = ({
	src,
	start = 0,
	filter,
	zoom = [1, 1],
	dur,
	objectPosition = 'center',
	rate = 1,
	origin,
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
				style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition, transform: `scale(${s})`, transformOrigin: origin ?? (objectPosition === 'center' ? 'center' : '50% 8%'), filter}}
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
	screenNight: [0, 45],
	office: [45, 120],
	meeting: [120, 195],
	edge: [195, 270],
	descent: [270, 300],
	cheer: [300, 330],
	hug: [330, 378],
	screenMorning: [378, 438],
	end: [438, 537],
} as const;

const S: React.FC<{k: keyof typeof SHOTS; children: React.ReactNode}> = ({k, children}) => (
	<Sequence from={SHOTS[k][0]} durationInFrames={SHOTS[k][1] - SHOTS[k][0]}>
		{children}
	</Sequence>
);
const d = (k: keyof typeof SHOTS) => SHOTS[k][1] - SHOTS[k][0];

const WARM_REAL = 'saturate(1.08) contrast(1.06) sepia(0.22) brightness(0.98) hue-rotate(-6deg)';

export const Reel: React.FC<{hook: string}> = ({hook}) => {
	loadFonts();
	return (
		<AbsoluteFill style={{background: '#000', width: W, height: H}}>
			<S k="screenNight"><ScreenNight dur={d('screenNight')} /></S>
			<S k="office"><Clip src="office_comp.mp4" start={0.2} dur={d('office')} zoom={[1.0, 1.04]} filter="saturate(0.9) contrast(1.05)" /><Vignette /></S>
			<S k="meeting"><Clip src="meeting.mp4" start={0.4} dur={d('meeting')} zoom={[1.55, 1.6]} origin="22% 42%" filter="saturate(0.9)" /><Vignette strength={0.35} /></S>
			<S k="edge"><Clip src="edge.mp4" start={0.3} dur={d('edge')} zoom={[1.72, 1.8]} objectPosition="50% 0%" filter="saturate(1.02) contrast(1.04)" /><Vignette strength={0.4} /></S>
			<S k="descent"><Clip src="descent.mp4" start={0.1} dur={d('descent')} zoom={[1.0, 1.05]} filter="brightness(0.78) contrast(1.15)" /><Vignette strength={0.4} /></S>
			<S k="cheer"><Clip src="cheer.mp4" start={1.7} dur={d('cheer')} zoom={[1.0, 1.04]} /><Vignette strength={0.4} /></S>
			<S k="hug"><Clip src="hug.mp4" start={1.0} dur={d('hug')} zoom={[1.02, 1.07]} /><Vignette strength={0.4} /></S>
			<S k="screenMorning"><ScreenMorning dur={d('screenMorning')} /></S>
			<S k="end"><EndCard dur={d('end')} /></S>

			{/* fiction disclosure */}
			<div style={{position: 'absolute', top: 262, left: 70, direction: 'rtl', fontFamily: FONT, fontWeight: 700, fontSize: 26, color: 'rgba(255,255,255,0.78)', background: 'rgba(0,0,0,0.35)', padding: '4px 14px', borderRadius: 8}}>قصة تمثيلية</div>
			{/* captions */}
			<Sequence from={0} durationInFrames={75}><Caption lines={HOOKS[hook]} dur={75} y={315} size={62} instant /></Sequence>
			<Sequence from={75} durationInFrames={45}><Caption lines={['مش عشان الراتب…']} dur={45} /></Sequence>
			<Sequence from={120} durationInFrames={75}><Caption lines={['عشان حاسس إنه', 'ما حدا شايفه.']} dur={75} /></Sequence>
			<Sequence from={195} durationInFrames={75}><Caption lines={['لحد ما إجا يوم…']} dur={75} /></Sequence>
			<Sequence from={270} durationInFrames={60}><Caption lines={['والكل صار ينادي باسمه.']} dur={60} /></Sequence>
			<Sequence from={330} durationInFrames={48}><Caption lines={['يوم واحد…', 'رجّعله روح الفريق.']} dur={48} size={64} /></Sequence>
			<Sequence from={378} durationInFrames={60}><Caption lines={['وضلّ…', 'بدل ما يروح.']} dur={60} y={300} size={76} /></Sequence>
		</AbsoluteFill>
	);
};

// texture for compositing onto the laptop screen in the office shot
export const EmailStill: React.FC = () => {
	loadFonts();
	return <EmailUI state="compose" />;
};
