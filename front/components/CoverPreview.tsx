import React, { useState, useEffect } from "react";

interface CoverPreviewProps {
	url?: string;
	maw: string; // Assuming 'maw' is meant to be a styling property, like 'maxWidth'
}

const CoverPreview: React.FC<CoverPreviewProps> = ({ maw, url }) => {
	const [imageSize, setImageSize] = useState<{
		width: number;
		height: number;
	} | null>(null);

	useEffect(() => {
		function getImageSize(url: string) {
			const img = new Image();
			img.onload = () => {
				setImageSize({ width: img.width, height: img.height });
			};
			img.onerror = () => {
				console.error("There was an error loading the image.");
			};
			img.src = url;
		}
		if (url) {
			getImageSize(url);
		} else {
			setImageSize(null);
		}
	}, [url]); // This effect runs only when the url prop changes

	return (
		<div
			className="cover-preview"
			style={{
				flexBasis: maw,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<img
				src={url}
				style={{
					width: "100%",
					borderRadius: "4px",
					height: "auto",
					aspectRatio: "3/4",
					objectFit: "contain",
					minWidth: "150px",
				}}
			/>

			<span>
				{imageSize ? `${imageSize.width}x${imageSize.height}` : ""}
			</span>
		</div>
	);
};

export default CoverPreview;
