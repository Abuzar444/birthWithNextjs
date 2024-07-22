import { logoutAction } from "@/utils/actions";
import { Button } from "./ui/button";

const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <Button type='submit'>Logout</Button>
    </form>
  );
};
export default LogoutButton;
