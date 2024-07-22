import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { BarChartIcon } from "@radix-ui/react-icons";
import { getSession } from "@/utils/auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const LogoutPage = async () => {
  const currentUser = await getSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <BarChartIcon />
        </Button>
      </DropdownMenuTrigger>
      {currentUser ? (
        <DropdownMenuContent>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href='/login'>Login</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/register'>register</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
export default LogoutPage;
