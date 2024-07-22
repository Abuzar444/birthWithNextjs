import FormContainer from "@/components/FormContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/utils/actions";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <div className='w-2/6'>
        <FormContainer action={registerAction}>
          <div className='flex flex-col gap-5'>
            <h1 className='text-2xl font-bold text-center'>Register</h1>
            <Input type='file' name='image' accept='image/*' />
            <Input type='name' name='name' defaultValue='abuzar' />
            <Input
              type='email'
              name='email'
              defaultValue='abuzardawar@gmail.com'
            />
            <Input type='text' name='username' defaultValue='noor' />
            <Input type='date' name='birthDay' />
            <Input type='password' name='password' defaultValue='secret' />
            <Button type='submit' variant='outline' size='lg'>
              submit
            </Button>
            <Button asChild variant='link'>
              <Link href='/login'>Already have an account</Link>
            </Button>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};
export default RegisterPage;
