import scss from "./Input.module.scss"

const Input = ({ type, value, setData}) => {
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
