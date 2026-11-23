import React from 'react';
import {FONT} from './fonts';

// Generic, unbranded Arabic mail client (RTL). Designed at 1600x1000.
export type EmailState = 'compose' | 'deleted';

export const Cursor: React.FC<{x: number; y: number; pressed?: boolean; scale?: number}> = ({
	x,
	y,
	pressed,
	scale = 1,
}) => (
	<svg
		width={34 * scale}
		height={50 * scale}
		viewBox="0 0 34 50"
		style={{position: 'absolute', left: x, top: y, transform: pressed ? 'scale(0.86)' : 'none', transformOrigin: '0 0'}}
	>
		<path d="M2 2 L2 40 L12 31 L19 47 L26 44 L19 28 L32 28 Z" fill="#111" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
	</svg>
);

export const EmailUI: React.FC<{
	state: EmailState;
	sendHover?: number; // 0..1
	deleteHover?: number; // 0..1
	deletedProgress?: number; // 0..1
	theme?: 'night' | 'day';
}> = ({state, sendHover = 0, deleteHover = 0, deletedProgress = 0, theme = 'night'}) => {
	const bg = '#ffffff';
	const ink = '#1f2328';
	const muted = '#6b7178';
	const line = '#e3e6ea';
	const blue = '#1a66d2';
	const red = '#c62828';
	const bodyOpacity = state === 'deleted' ? 1 - deletedProgress : 1;
	return (
		<div
			style={{
				width: 1600,
				height: 1000,
				background: theme === 'night' ? '#f3f4f6' : '#f6f7f9',
				fontFamily: FONT,
				direction: 'rtl',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* top bar */}
			<div style={{height: 90, background: '#ffffff', borderBottom: `2px solid ${line}`, display: 'flex', alignItems: 'center', padding: '0 48px', gap: 24}}>
				<div style={{width: 46, height: 46, borderRadius: 12, background: blue}} />
				<div style={{fontSize: 38, fontWeight: 700, color: ink}}>البريد</div>
				<div style={{flex: 1}} />
				<div style={{width: 520, height: 52, borderRadius: 26, background: '#eef0f3'}} />
			</div>
			{/* compose card */}
			<div
				style={{
					position: 'absolute',
					top: 130,
					left: 120,
					right: 120,
					bottom: 70,
					background: bg,
					borderRadius: 24,
					boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
					padding: '36px 56px',
					opacity: bodyOpacity,
					transform: `scale(${1 - deletedProgress * 0.06})`,
				}}
			>
				<div style={{fontSize: 34, fontWeight: 700, color: muted, marginBottom: 22}}>رسالة جديدة</div>
				<div style={{display: 'flex', gap: 22, fontSize: 36, color: muted, borderBottom: `2px solid ${line}`, paddingBottom: 18}}>
					<span>إلى:</span>
					<span style={{color: ink}}>الموارد البشرية</span>
				</div>
				<div style={{display: 'flex', gap: 22, fontSize: 40, borderBottom: `2px solid ${line}`, padding: '20px 0'}}>
					<span style={{color: muted}}>الموضوع:</span>
					<span style={{color: ink, fontWeight: 800}}>استقالة</span>
				</div>
				<div style={{fontSize: 38, lineHeight: 1.75, color: ink, paddingTop: 26}}>
					<div>تحية طيبة،</div>
					<div>أتقدّم إليكم باستقالتي من العمل،</div>
					<div>شاكراً لكم حسن تعاونكم طوال الفترة الماضية.</div>
				</div>
				{/* buttons row */}
				<div style={{position: 'absolute', bottom: 36, right: 56, left: 56, display: 'flex', alignItems: 'center', gap: 24}}>
					<div
						style={{
							background: blue,
							color: '#fff',
							fontSize: 38,
							fontWeight: 800,
							padding: '16px 56px',
							borderRadius: 40,
							filter: `brightness(${1 - sendHover * 0.15})`,
							boxShadow: sendHover ? `0 0 0 ${6 * sendHover}px rgba(26,102,210,0.25)` : 'none',
						}}
					>
						إرسال
					</div>
					<div
						style={{
							color: red,
							fontSize: 36,
							fontWeight: 700,
							padding: '14px 34px',
							borderRadius: 40,
							border: `3px solid ${deleteHover ? red : '#f0c9c9'}`,
							background: deleteHover ? `rgba(198,40,40,${0.08 * deleteHover})` : 'transparent',
						}}
					>
						حذف المسودة
					</div>
				</div>
			</div>
			{state === 'deleted' && deletedProgress > 0.6 ? (
				<div
					style={{
						position: 'absolute',
						bottom: 250,
						right: 200,
						background: '#1f2328',
						color: '#fff',
						fontSize: 56,
						fontWeight: 800,
						padding: '24px 56px',
						borderRadius: 18,
						opacity: Math.min(1, (deletedProgress - 0.6) / 0.25),
					}}
				>
					تم حذف المسودة
				</div>
			) : null}
		</div>
	);
};
