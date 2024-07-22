import FormContainer from "@/components/FormContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/utils/actions";
import Link from "next/link";

const LoginPage = () => {
  return (
    <main className='flex justify-center items-center h-screen'>
      <div className='w-2/6'>
        <FormContainer action={loginAction}>
          <div className='flex flex-col gap-5'>
            <Input
              type='text'
              name='email'
              defaultValue='abuzardawar@gmail.com'
            />
            <Input type='password' name='password' defaultValue='secret' />
            <Button type='submit' variant='outline' size='lg'>
              Login
            </Button>
            <Button asChild variant='link'>
              <Link href='/register'>Register</Link>
            </Button>
          </div>
        </FormContainer>
      </div>
    </main>
  );
};
export default LoginPage;
