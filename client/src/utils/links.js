import { IoBarChartSharp } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "Resumo",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Finanças",
    path: "/finances",
    icon: <GiMoneyStack />,
  },
  {
    id: 3,
    text: "Perfil",
    path: "/profile",
    icon: <ImProfile />,
  },
];

export default links