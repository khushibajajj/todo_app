import "./style.scss";

const FormHeader = (props) => {
  const { title } = props;
  return <h2 className="form-header">{title}</h2>;
};

export default FormHeader;
