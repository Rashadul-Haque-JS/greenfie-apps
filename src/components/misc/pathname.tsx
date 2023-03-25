import { useRouter } from "next/router";
const pathname = () => {
  const { pathname } = useRouter();

  return pathname;
};
export default pathname;
