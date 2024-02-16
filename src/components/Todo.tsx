import axios from "axios";
import { useEffect, useState } from "react";
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import scss from "./Todo.module.scss";

interface Render {
	_id: number;
	text: string;
	password: string;
	сhange: boolean;
}
const url = import.meta.env.VITE_BACAND_URL;

const Todo: React.FC = () => {
	const [state, setState] = useState<Render[]>([]);
	const [textValue, setTextValue] = useState<string>("");
	const [passwordValue, setPasswordValue] = useState<string>("");
	const [userInput, setUserInput] = useState<string>("");
	const [passwordInput, setPasswordInput] = useState<string>("");
	const [price, setPriceId] = useState<number>(0);

	const postTodo = async () => {
		if (textValue.trim() === "" && passwordValue.trim() === "") return;
		const newTodo = {
			text: textValue,
			password: passwordValue,
			сhange: false,
		};
		try {
			const response = (await axios.post(url, newTodo)).data;
			setState([...response]);
			getTodo();
		} catch (error) {
			console.log(error);
		}
	};

	const getTodo = async () => {
		const response = (await axios.get(url)).data;
		setState(response);
	};

	const deleteTodo = async (id: number) => {
		const response = (await axios.delete(`${url}/${id}`)).data;
		setState(response);
	};

	const patchTodo = async (id: number) => {
		const putData = {
			text: userInput,
			password: passwordInput,
		};
		const response = (await axios.patch(`${url}/${id}`, putData)).data;
		setState(response);
		setPriceId(0);
		getTodo();
	};

	useEffect(() => {
		getTodo();
	}, []);

	return (
		<div className={scss.Counter}>
			<div className="container">
				<div>
					<Input type="text" value={textValue} setData={setTextValue} />
					<Input
						type="password"
						value={passwordValue}
						setData={setPasswordValue}
					/>
					<Button onClick={postTodo}>add</Button>
				</div>
				{state.map((item) => (
					<div key={item._id}>
						{price === item._id ? (
							<>
								<div className={scss.container2}>
									<div className={scss.content2}>
										<div className={scss.content3}>
											<input
												type="text"
												value={userInput}
												onChange={(e) => setUserInput(e.target.value)}
											/>
											<br />
											<input
												type="text"
												value={passwordInput}
												onChange={(e) => setPasswordInput(e.target.value)}
											/>
											<Button onClick={() => patchTodo(item._id)}>Save</Button>
											<Button onClick={() => setPriceId(0)}>сancel</Button>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								<div className={scss.pi}>
									<div className={scss.conten}>
										<p>{item.text}</p>
										<p>{item.password}</p>
									</div>
								</div>
								<Button onClick={() => deleteTodo(item._id)}>delete</Button>
								<Button
									onClick={() => {
										setPriceId(item._id);
										setUserInput(item.text);
										setPasswordInput(item.password);
									}}>
									Edit
								</Button>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
export default Todo;
