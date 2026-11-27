import React from 'react';
import {Composition, registerRoot, Still} from 'remotion';
import {DURATION, EmailStill, FPS, Reel} from './Reel';
import {AN_DURATION, AN_FPS, Analysis} from './Analysis';

const Root: React.FC = () => (
	<>
		<Composition id="ReelA" component={Reel} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={{hook: 'A'}} />
		<Composition id="ReelB" component={Reel} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={{hook: 'B'}} />
		<Composition id="ReelC" component={Reel} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={{hook: 'C'}} />
		<Composition id="Analysis" component={Analysis} durationInFrames={AN_DURATION} fps={AN_FPS} width={1080} height={1920} />
		<Still id="EmailStill" component={EmailStill} width={1600} height={1000} />
	</>
);

registerRoot(Root);
