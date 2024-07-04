import React from "react";

type ConfirmButtonProps = {
	buttonText: string;
	onClick: () => void;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
	onClick,
	buttonText,
}) => {
	return <button onClick={onClick}>{buttonText}</button>;
};

export default ConfirmButton;
