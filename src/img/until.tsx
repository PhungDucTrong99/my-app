import Cat from "./cat.png";
import Fox from "./fox.png";
import Gorilla from "./gorilla.png";

export const Image1 = () => {
  return <img style={{ width: 120, height: 120 }} src={Cat} alt="Cat" />;
};
export const Image2 = () => {
  return <img style={{ width: 120, height: 120 }} src={Fox} alt="Fox" />;
};
export const Image3 = () => {
  return (
    <img style={{ width: 120, height: 120 }} src={Gorilla} alt="Gorilla" />
  );
};
