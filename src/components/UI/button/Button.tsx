import scss from "./Button.module.scss";

const Button = ({ onClick, children }) => {
	return (
		<div className={scss.Button}>
			<div className="container">
				<div className={scss.content}>
					<button className={scss.button} onClick={onClick}>{children}</button>
				</div>
			</div>
		</div>
	);
};

export default Button;
