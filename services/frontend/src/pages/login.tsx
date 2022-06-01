import { DefaultLayout } from "../components/DefaultLayout";
import Image from 'next/image'

const Page = () => {
  return (
    <DefaultLayout >
        <Image
          width='40px'
          height='40px'
          objectFit='cover'
          // p='2' m='2'
          //   borderRadius='full'
          //   boxSize='60px'
            src= {Logo}
            alt='icon'
          />


    </DefaultLayout>
  );
};

export default Page;
