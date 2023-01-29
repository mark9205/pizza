import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
	<ContentLoader
		speed={2}
		width={300}
		height={450}
		viewBox="0 0 280 465"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="140" cy="120" r="110" />
		<rect x="0" y="250" rx="11" ry="11" width="260" height="25" />
		<rect x="0" y="295" rx="10" ry="10" width="260" height="80" />
		<rect x="0" y="402" rx="10" ry="10" width="80" height="23" />
		<rect x="120" y="390" rx="20" ry="20" width="150" height="44" />
	</ContentLoader>
);

export default Skeleton;
