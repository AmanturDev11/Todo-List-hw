import scss from "./Input.module.scss"
import  { FC } from "react";

const Input: FC< {
  type: string;
  value: string;
  setData: (value: string) => void;
}> = ({ type, value, setData }) => {
	return (
		<div className={scss.Input}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.con}>
						<input
							type={type}
							value={value}
							onChange={(el) => {
								setData(el.target.value);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Input;

