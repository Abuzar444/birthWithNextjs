import { fetchBirthDayUsers } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
  const users = await fetchBirthDayUsers();

  const calculateAge = (
    birthDate: number,
    birthYear: number,
    birthMonth: number
  ) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthYear;
    const monthDiff = today.getMonth() - birthMonth;
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <main className='flex justify-center items-center flex-col max-w-full'>
      <section className='border p-5 rounded-md w-full'>
        <h2 className='text-center font-bold text-3xl'>
          {users.length} birthday today
        </h2>
        {users.map((user) => {
          return (
            <Link
              key={user.id}
              href={`/users/${user.id}`}
              className='flex justify-between items-center border p-2 rounded mt-5'
            >
              <div className=' flex justify-center items-center'>
                <div className='relative size-20'>
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    sizes='100vw'
                    priority
                    className='rounded-full object-cover border-spacing-2'
                  />
                </div>
                <div className='ml-5'>
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                  <div>
                    Age:{" "}
                    {calculateAge(
                      user.birthDay,
                      user.birthYear,
                      user.birthMonth
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
};
export default HomePage;
