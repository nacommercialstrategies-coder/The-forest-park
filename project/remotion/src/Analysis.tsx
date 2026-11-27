import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, loadFonts} from './fonts';

// «تحليل يوم الفريق» — sports-analysis motion graphic built only from REAL park photos.
export const AN_FPS = 30;
export const AN_DURATION = 600; // 20 s

const W = 1080;
const H = 1920;
const LIME = '#C8FF2E';
const INK = '#0B1410';

type Shot = {src: string; w: number; h: number; fx: number; fy: number; tx?: number; ty?: number; z: [number, number]};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

// Places an image so the focus point (fx, fy) sits at (tx, ty) on screen, zooming around it.
// Returns the on-screen position of the focus point (after clamping so the frame stays covered).
const place = (s: Shot, z: number) => {
	const scale = Math.max(W / s.w, H / s.h) * z;
	const iw = s.w * scale;
	const ih = s.h * scale;
	let x = (s.tx ?? W / 2) - s.fx * iw;
	let y = (s.ty ?? H / 2) - s.fy * ih;
	x = Math.min(0, Math.max(W - iw, x));
	y = Math.min(0, Math.max(H - ih, y));
	return {x, y, iw, ih, px: x + s.fx * iw, py: y + s.fy * ih, scale};
};

const Photo: React.FC<{shot: Shot; dur: number; children?: (p: {px: number; py: number; scale: number}) => React.ReactNode}> = ({shot, dur, children}) => {
	const f = useCurrentFrame();
	const z = interpolate(f, [0, dur], shot.z, {...clamp, easing: Easing.inOut(Easing.quad)});
	const p = place(shot, z);
	// punch-in on the cut
	const punch = interpolate(f, [0, 5], [1.06, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	return (
		<AbsoluteFill style={{overflow: 'hidden', background: INK}}>
			<div style={{position: 'absolute', inset: 0, transform: `scale(${punch})`}}>
				<Img src={staticFile(shot.src)} style={{position: 'absolute', left: p.x, top: p.y, width: p.iw, height: p.ih, filter: 'contrast(1.08) saturate(1.1)'}} />
				{children?.(p)}
			</div>
		</AbsoluteFill>
	);
};

// ---------- HUD pieces ----------
const Grid: React.FC = () => (
	<AbsoluteFill
		style={{
			backgroundImage: `linear-gradient(rgba(200,255,46,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,46,0.07) 1px, transparent 1px)`,
			backgroundSize: '90px 90px',
			pointerEvents: 'none',
		}}
	/>
);

const Vignette: React.FC = () => (
	<AbsoluteFill
		style={{
			background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.7) 100%)',
		}}
	/>
);

const Reticle: React.FC<{x: number; y: number; r?: number; delay?: number; label?: string; labelSide?: 'left' | 'right'; labelDy?: number}> = ({x, y, r = 120, delay = 0, label, labelSide = 'left', labelDy = 0}) => {
	const f = useCurrentFrame() - delay;
	const {fps} = useVideoConfig();
	if (f < 0) return null;
	const s = spring({frame: f, fps, config: {damping: 14, stiffness: 160}});
	const rr = interpolate(s, [0, 1], [r * 2.4, r]);
	const rot = interpolate(f, [0, 60], [0, 90]);
	const dash = 2 * Math.PI * rr;
	const draw = interpolate(f, [0, 12], [dash, 0], clamp);
	const lo = interpolate(f, [8, 14], [0, 1], clamp);
	return (
		<svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
			<circle cx={x} cy={y} r={rr} fill="none" stroke={LIME} strokeWidth={6} strokeDasharray={dash} strokeDashoffset={draw} transform={`rotate(${rot} ${x} ${y})`} />
			<circle cx={x} cy={y} r={rr + 22} fill="none" stroke={LIME} strokeOpacity={0.45} strokeWidth={3} strokeDasharray="14 18" transform={`rotate(${-rot} ${x} ${y})`} />
			{[0, 90, 180, 270].map((a) => (
				<line
					key={a}
					x1={x + Math.cos((a * Math.PI) / 180) * (rr + 8)}
					y1={y + Math.sin((a * Math.PI) / 180) * (rr + 8)}
					x2={x + Math.cos((a * Math.PI) / 180) * (rr + 40)}
					y2={y + Math.sin((a * Math.PI) / 180) * (rr + 40)}
					stroke={LIME}
					strokeWidth={6}
				/>
			))}
			{label ? (
				<g opacity={lo}>
					<line x1={x + (labelSide === 'left' ? -rr * 0.7 : rr * 0.7)} y1={y - rr * 0.7} x2={x + (labelSide === 'left' ? -rr - 80 : rr + 80)} y2={y - rr - 80 + labelDy} stroke={LIME} strokeWidth={4} />
					<foreignObject x={labelSide === 'left' ? x - rr - 80 - 360 : x + rr + 80} y={y - rr - 80 - 34 + labelDy} width={360} height={70}>
						<div
							style={{
								fontFamily: FONT,
								fontWeight: 800,
								fontSize: 38,
								color: INK,
								background: LIME,
								padding: '6px 18px',
								borderRadius: 10,
								direction: 'rtl',
								display: 'inline-block',
								float: labelSide === 'left' ? 'right' : 'left',
								whiteSpace: 'nowrap',
							}}
						>
							{label}
						</div>
					</foreignObject>
				</g>
			) : null}
		</svg>
	);
};

const Chip: React.FC<{n: string; title: string}> = ({n, title}) => {
	const f = useCurrentFrame();
	const x = interpolate(f, [0, 9], [-500, 0], {...clamp, easing: Easing.out(Easing.cubic)});
	return (
		<div style={{position: 'absolute', top: 270, right: 150, transform: `translateX(${-x}px)`, display: 'flex', direction: 'rtl', fontFamily: FONT, fontWeight: 800}}>
			<div style={{background: LIME, color: INK, fontSize: 40, padding: '8px 22px', borderRadius: '12px 0 0 12px'}}>{n}</div>
			<div style={{background: 'rgba(11,20,16,0.85)', color: '#fff', fontSize: 40, padding: '8px 26px', borderRadius: '0 12px 12px 0', border: `3px solid ${LIME}`, borderLeft: 'none'}}>{title}</div>
		</div>
	);
};

const Caption: React.FC<{lines: string[]; y?: number; size?: number; dur: number; accent?: number}> = ({lines, y = 380, size = 76, dur, accent = -1}) => {
	const f = useCurrentFrame();
	const o = Math.min(interpolate(f, [0, 5], [0, 1], clamp), interpolate(f, [dur - 5, dur], [1, 0], clamp));
	return (
		<div style={{position: 'absolute', top: y, left: 70, right: 150, direction: 'rtl', textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.32, color: '#fff', opacity: o}}>
			{lines.map((l, i) => {
				const d = i * 5;
				const ty = interpolate(f - d, [0, 8], [24, 0], {...clamp, easing: Easing.out(Easing.cubic)});
				const lo = interpolate(f - d, [0, 6], [0, 1], clamp);
				return (
					<div key={i} style={{transform: `translateY(${ty}px)`, opacity: lo}}>
						<span
							style={{
								background: i === accent ? LIME : 'rgba(11,20,16,0.78)',
								color: i === accent ? INK : '#fff',
								padding: '2px 20px',
								borderRadius: 12,
								boxDecorationBreak: 'clone',
								WebkitBoxDecorationBreak: 'clone',
							}}
						>
							{l}
						</span>
					</div>
				);
			})}
		</div>
	);
};

const TopBar: React.FC = () => {
	const f = useCurrentFrame();
	const sec = f / AN_FPS;
	const tc = `00:${String(Math.floor(sec)).padStart(2, '0')}:${String(Math.floor((sec % 1) * 30)).padStart(2, '0')}`;
	const blink = Math.floor(f / 15) % 2 === 0;
	return (
		<div style={{position: 'absolute', top: 200, left: 70, right: 150, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 30, color: '#fff'}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(11,20,16,0.7)', padding: '4px 16px', borderRadius: 8, direction: 'ltr'}}>
				<div style={{width: 16, height: 16, borderRadius: 8, background: blink ? '#ff3b3b' : 'transparent', border: '2px solid #ff3b3b'}} />
				<span style={{letterSpacing: 2}}>{tc}</span>
			</div>
			<div style={{background: 'rgba(11,20,16,0.7)', padding: '4px 16px', borderRadius: 8, color: LIME, direction: 'rtl'}}>تحليل الأداء • يوم الفريق</div>
		</div>
	);
};

const Flash: React.FC = () => {
	const f = useCurrentFrame();
	const o = interpolate(f, [0, 4], [0.55, 0], clamp);
	return <AbsoluteFill style={{background: '#fff', opacity: o, pointerEvents: 'none'}} />;
};

// ---------- scene-specific graphics ----------
const HeightGauge: React.FC<{x: number; yTop: number; yBot: number}> = ({x, yTop, yBot}) => {
	const f = useCurrentFrame();
	const p = interpolate(f, [6, 50], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const y = yBot - (yBot - yTop) * p;
	const ticks = 12;
	return (
		<>
			<svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
				<line x1={x} y1={yBot} x2={x} y2={y} stroke={LIME} strokeWidth={6} />
				{Array.from({length: ticks + 1}).map((_, i) => {
					const ty = yBot - ((yBot - yTop) * i) / ticks;
					if (ty < y) return null;
					return <line key={i} x1={x} y1={ty} x2={x + (i % 3 === 0 ? 50 : 26)} y2={ty} stroke={LIME} strokeWidth={4} />;
				})}
				<polygon points={`${x - 18},${y + 10} ${x + 18},${y + 10} ${x},${y - 18}`} fill={LIME} />
			</svg>
			<div
				style={{
					position: 'absolute',
					left: x + 70,
					top: y - 50,
					fontFamily: FONT,
					fontWeight: 800,
					color: INK,
					background: LIME,
					fontSize: 52,
					padding: '4px 22px',
					borderRadius: 12,
					direction: 'rtl',
					whiteSpace: 'nowrap',
				}}
			>
				الارتفاع: ؟؟ م
			</div>
		</>
	);
};

const Checklist: React.FC<{items: string[]; delay?: number}> = ({items, delay = 0}) => {
	const f = useCurrentFrame() - delay;
	return (
		<div style={{position: 'absolute', top: 1060, left: 70, fontFamily: FONT, fontWeight: 800, fontSize: 40, direction: 'rtl', display: 'flex', flexDirection: 'column', gap: 12}}>
			{items.map((it, i) => {
				const o = interpolate(f - i * 6, [0, 6], [0, 1], clamp);
				const x = interpolate(f - i * 6, [0, 8], [-60, 0], {...clamp, easing: Easing.out(Easing.cubic)});
				return (
					<div key={it} style={{opacity: o, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(11,20,16,0.82)', border: `2px solid ${LIME}`, borderRadius: 12, padding: '6px 20px', color: '#fff'}}>
						<span style={{color: LIME}}>✓</span>
						<span>{it}</span>
					</div>
				);
			})}
		</div>
	);
};

const Meter: React.FC<{label: string; from: number; to: number; y: number; color: string; delay?: number; side?: 'left' | 'right'}> = ({label, from, to, y, color, delay = 0, side = 'right'}) => {
	const f = useCurrentFrame() - delay;
	const v = interpolate(f, [0, 40], [from, to], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const o = interpolate(f, [0, 6], [0, 1], clamp);
	return (
		<div style={{position: 'absolute', top: y, ...(side === 'right' ? {right: 150} : {left: 70}), width: 420, fontFamily: FONT, fontWeight: 800, direction: 'rtl', opacity: o}}>
			<div style={{color: '#fff', fontSize: 34, marginBottom: 8, textShadow: '0 2px 8px #000'}}>{label}</div>
			<div style={{height: 26, background: 'rgba(11,20,16,0.8)', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 14, overflow: 'hidden'}}>
				<div style={{width: `${v}%`, height: '100%', background: color, marginRight: 0, marginLeft: 'auto'}} />
			</div>
		</div>
	);
};

const Trajectory: React.FC<{x: number; y1: number; y2: number}> = ({x, y1, y2}) => {
	const f = useCurrentFrame();
	const p = interpolate(f, [4, 34], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
	const len = y2 - y1;
	return (
		<svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
			<path d={`M ${x} ${y1} C ${x + 60} ${y1 + len * 0.35}, ${x - 60} ${y1 + len * 0.65}, ${x} ${y2}`} fill="none" stroke={LIME} strokeWidth={8} strokeDasharray="22 16" strokeDashoffset={-f * 3} pathLength={1000} style={{strokeDasharray: `${1000 * p} 1000`}} />
			<path d={`M ${x} ${y1} C ${x + 60} ${y1 + len * 0.35}, ${x - 60} ${y1 + len * 0.65}, ${x} ${y2}`} fill="none" stroke={LIME} strokeWidth={8} strokeDasharray="22 16" strokeDashoffset={-f * 3} opacity={p > 0.98 ? 1 : 0} />
			<polygon points={`${x - 26},${y2 - 30} ${x + 26},${y2 - 30} ${x},${y2 + 10}`} fill={LIME} opacity={p} />
		</svg>
	);
};

const Wave: React.FC<{x: number; y: number}> = ({x, y}) => {
	const f = useCurrentFrame();
	return (
		<div style={{position: 'absolute', left: x, top: y, display: 'flex', alignItems: 'center', gap: 10, direction: 'rtl', fontFamily: FONT, fontWeight: 800, fontSize: 38, color: INK, background: LIME, borderRadius: 14, padding: '8px 22px'}}>
			<span>تصفيق</span>
			<div style={{display: 'flex', gap: 6, alignItems: 'center', height: 44}}>
				{Array.from({length: 9}).map((_, i) => (
					<div key={i} style={{width: 7, borderRadius: 4, background: INK, height: 10 + Math.abs(Math.sin(f * 0.45 + i * 0.9)) * 34}} />
				))}
			</div>
		</div>
	);
};

const Scoreboard: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: f, fps, config: {damping: 12}});
	const flip = interpolate(f, [14, 22], [0, 1], clamp);
	return (
		<div style={{position: 'absolute', top: 560, left: 90, right: 150, transform: `scale(${s})`, fontFamily: FONT, fontWeight: 800}}>
			<div style={{textAlign: 'center', color: LIME, fontSize: 40, marginBottom: 14, direction: 'rtl'}}>النتيجة النهائية</div>
			<div style={{display: 'flex', direction: 'rtl', alignItems: 'stretch', borderRadius: 20, overflow: 'hidden', border: `4px solid ${LIME}`, background: 'rgba(11,20,16,0.92)'}}>
				<div style={{flex: 1, color: '#fff', fontSize: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '22px 0'}}>الفريق</div>
				<div style={{background: LIME, color: INK, fontSize: 96, padding: '0 34px', display: 'flex', alignItems: 'center', direction: 'ltr', letterSpacing: 6}}>
					<span>0</span>
					<span style={{margin: '0 12px'}}>:</span>
					<span style={{display: 'inline-block', transform: `rotateX(${(1 - flip) * 90}deg)`}}>1</span>
				</div>
				<div style={{flex: 1, color: 'rgba(255,255,255,0.75)', fontSize: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '22px 0'}}>الروتين</div>
			</div>
		</div>
	);
};

const EndCard: React.FC = () => {
	const f = useCurrentFrame();
	const o = interpolate(f, [0, 8], [0, 1], clamp);
	const pulse = 1 + Math.sin(f * 0.25) * 0.025;
	return (
		<div style={{position: 'absolute', top: 900, left: 70, right: 150, opacity: o, fontFamily: FONT, fontWeight: 800, direction: 'rtl', textAlign: 'center'}}>
			<Img src={staticFile('logo_white.png')} style={{height: 150, objectFit: 'contain', marginBottom: 18}} />
			<div style={{color: '#fff', fontSize: 40, marginBottom: 26}}>+15 تجربة • 260,000 م² من الطبيعة</div>
			<div style={{display: 'inline-block', transform: `scale(${pulse})`, background: LIME, color: INK, fontSize: 52, padding: '14px 34px', borderRadius: 18, lineHeight: 1.3}}>
				اكتب «تحليل» بالتعليقات
				<div style={{fontSize: 38, fontWeight: 700}}>ونبعتلك برنامج يوم الفريق</div>
			</div>
		</div>
	);
};

// ---------- shots (real photos only) ----------
const S = {
	descent: {src: 'an/R02_wooden_tower_descent.jpg', w: 720, h: 1280, fx: 0.57, fy: 0.15, ty: 820, z: [1.0, 1.55]} as Shot,
	tower: {src: 'an/R01_wooden_tower_base_up.jpg', w: 720, h: 1280, fx: 0.5, fy: 0.5, z: [1.0, 1.08]} as Shot,
	edge1: {src: 'an/IMG_6689.jpg', w: 1440, h: 1920, fx: 0.47, fy: 0.46, ty: 980, z: [1.05, 1.25]} as Shot,
	edge2: {src: 'an/IMG_6685.jpg', w: 1440, h: 1794, fx: 0.5, fy: 0.5, ty: 980, z: [1.05, 1.22]} as Shot,
	down: {src: 'an/IMG_6691.jpg', w: 720, h: 960, fx: 0.53, fy: 0.62, ty: 900, z: [1.0, 1.15]} as Shot,
	drone: {src: 'an/R05_drone_topdown_people.jpg', w: 1280, h: 720, fx: 0.4, fy: 0.35, ty: 950, z: [1.0, 1.1]} as Shot,
	team: {src: 'an/R06_team_clapping_harness.jpg', w: 720, h: 1280, fx: 0.5, fy: 0.55, z: [1.0, 1.08]} as Shot,
	food: {src: 'an/IMG_6684.jpg', w: 720, h: 960, fx: 0.5, fy: 0.55, z: [1.0, 1.08]} as Shot,
	sunset: {src: 'an/IMG_6694.jpg', w: 1440, h: 1920, fx: 0.5, fy: 0.45, z: [1.0, 1.1]} as Shot,
	crew: {src: 'an/IMG_6690.jpg', w: 1080, h: 1080, fx: 0.5, fy: 0.6, z: [1.15, 1.25]} as Shot,
};

// screen position of an image point for a shot at zoom z (used to pin graphics to people)
const at = (s: Shot, z: number, ix: number, iy: number) => {
	const p = place(s, z);
	return {x: p.x + ix * p.iw, y: p.y + iy * p.ih};
};

export const Analysis: React.FC = () => {
	loadFonts();
	const T = (a: number, b: number) => ({from: Math.round(a * AN_FPS), durationInFrames: Math.round((b - a) * AN_FPS)});
	const teamA = at(S.team, 1.04, 0.37, 0.52);
	const teamB = at(S.team, 1.04, 0.74, 0.47);
	return (
		<AbsoluteFill style={{background: INK}}>
			{/* 0–2.5 HOOK */}
			<Sequence {...T(0, 2.5)}>
				<Photo shot={S.descent} dur={75}>
					{(p) => <Reticle x={p.px} y={p.py} r={95} delay={14} label="الهدف: الثقة" labelSide="right" labelDy={260} />}
				</Photo>
				<Grid />
				<Vignette />
				<Caption dur={75} y={1080} lines={['عطيت Claude', 'صور يوم فريق…', 'وحلّلها مثل مباراة']} accent={2} size={78} />
			</Sequence>
			{/* 2.5–5.5 Phase 1 */}
			<Sequence {...T(2.5, 5.5)}>
				<Photo shot={S.tower} dur={90} />
				<Grid />
				<Vignette />
				<HeightGauge x={210} yTop={560} yBot={1500} />
				<Chip n="01" title="الصعود" />
				<Caption dur={90} y={1560} size={56} lines={['خمّن الارتفاع بالتعليقات']} />
				<Flash />
			</Sequence>
			{/* 5.5–7.2 Phase 2a */}
			<Sequence {...T(5.5, 7.2)}>
				<Photo shot={S.edge1} dur={51}>
					{(p) => <Reticle x={p.px} y={p.py - 90} r={85} delay={4} label="لحظة الحافة" labelSide="right" />}
				</Photo>
				<Grid />
				<Vignette />
				<Chip n="02" title="الحافة" />
				<Checklist items={['خوذة', 'حزام أمان', 'قفازات', 'حبل مزدوج']} delay={8} />
				<Flash />
			</Sequence>
			{/* 7.2–9 Phase 2b */}
			<Sequence {...T(7.2, 9)}>
				<Photo shot={S.edge2} dur={54} />
				<Grid />
				<Vignette />
				<Chip n="02" title="الحافة" />
				<Meter label="التوتر" from={85} to={25} y={1240} color="#ff5a4e" side="left" />
				<Meter label="الثقة" from={20} to={92} y={1360} color={LIME} delay={6} side="left" />
				<Caption dur={54} y={1500} size={60} lines={['اللحظة اللي بتفرق']} />
				<Flash />
			</Sequence>
			{/* 9–10.6 Phase 3a */}
			<Sequence {...T(9, 10.6)}>
				<Photo shot={S.down} dur={48}>
					{(p) => (
						<>
							<Reticle x={p.px} y={p.py - 40} r={80} delay={0} />
							<Trajectory x={p.px} y1={p.py + 70} y2={Math.min(1460, p.py + 520)} />
						</>
					)}
				</Photo>
				<Grid />
				<Vignette />
				<Chip n="03" title="النزول" />
				<Flash />
			</Sequence>
			{/* 10.6–12 Phase 3b */}
			<Sequence {...T(10.6, 12)}>
				<Photo shot={S.drone} dur={42}>
					{(p) => <Reticle x={p.px} y={p.py} r={70} delay={2} label="وصل" />}
				</Photo>
				<Grid />
				<Vignette />
				<Chip n="03" title="النزول" />
				<Caption dur={42} y={1380} size={60} lines={['وكل الفريق عينه عليه']} />
				<Flash />
			</Sequence>
			{/* 12–15 Phase 4 */}
			<Sequence {...T(12, 15)}>
				<Photo shot={S.team} dur={90} />
				<Grid />
				<Vignette />
				<Reticle x={teamA.x} y={teamA.y} r={75} delay={6} label="مشجّع #1" labelSide="left" />
				<Reticle x={teamB.x} y={teamB.y} r={75} delay={14} label="مشجّع #2" labelSide="left" labelDy={-40} />
				<Chip n="04" title="الدعم" />
				<Wave x={70} y={1420} />
				<Caption dur={90} y={1520} size={56} lines={['اللاعب الأهم؟', 'اللي تحت بيصفّق']} accent={1} />
				<Flash />
			</Sequence>
			{/* 15–17 Phase 5: split */}
			<Sequence {...T(15, 17)}>
				<AbsoluteFill>
					<div style={{position: 'absolute', left: 0, top: 0, width: W, height: H / 2, overflow: 'hidden'}}>
						<div style={{position: 'absolute', left: 0, top: -H / 4, width: W, height: H}}>
							<Photo shot={S.food} dur={60} />
						</div>
					</div>
					<div style={{position: 'absolute', left: 0, top: H / 2, width: W, height: H / 2, overflow: 'hidden'}}>
						<div style={{position: 'absolute', left: 0, top: -H / 4, width: W, height: H}}>
							<Photo shot={S.sunset} dur={60} />
						</div>
					</div>
					<div style={{position: 'absolute', left: 0, right: 0, top: H / 2 - 4, height: 8, background: LIME}} />
				</AbsoluteFill>
				<Vignette />
				<Chip n="05" title="بعد المباراة" />
				<Caption dur={60} y={860} size={64} lines={['سفرة… وغروب']} accent={0} />
				<Flash />
			</Sequence>
			{/* 17–20 Result + CTA */}
			<Sequence {...T(17, 20)}>
				<Photo shot={S.crew} dur={90} />
				<AbsoluteFill style={{background: 'rgba(11,20,16,0.72)', backdropFilter: 'blur(6px)'}} />
				<Grid />
				<Scoreboard />
				<Sequence from={22}>
					<EndCard />
				</Sequence>
				<Flash />
			</Sequence>
			<TopBar />
		</AbsoluteFill>
	);
};
