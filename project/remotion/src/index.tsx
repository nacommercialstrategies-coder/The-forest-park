import React from 'react';
import {Composition, registerRoot, Still} from 'remotion';
import {DURATION, EmailStill, FPS, Reel} from './Reel';

const Root: React.FC = () => (
	<>
		<Composition id="ReelA" component={Reel} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={{hook: 'A'}} />
		<Composition id="ReelB" component={Reel} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={{hook: 'B'}} />
		<Composition id="ReelC" component={Reel} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={{hook: 'C'}} />
		<Still id="EmailStill" component={EmailStill} width={1600} height={1000} />
	</>
);

registerRoot(Root);
