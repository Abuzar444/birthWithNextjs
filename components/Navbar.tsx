import LogoutPage from "./Logout";
import ModeToggle from "./ModeToggle";

const Navbar = async () => {
  return (
    <nav className='flex justify-between items-center py-2'>
      <div>Buddy</div>
      <div className='flex items-center gap-x-5'>
        <ModeToggle />
        <LogoutPage />
      </div>
    </nav>
  );
};
export default Navbar;
