import FormContainer from "@/components/FormContainer";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBirthdayAction } from "@/utils/actions";

const CreateBirthday = () => {
  return (
    <div>
      <FormContainer action={createBirthdayAction}>
        <Input type='text' name='name' defaultValue='Uzair' />
        <Input type='number' name='age' min={10} defaultValue={10} max={60} />
        <SubmitButton />
      </FormContainer>
    </div>
  );
};
export default CreateBirthday;
