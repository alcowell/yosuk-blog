import { AiFillFacebook, AiFillGithub, AiFillInstagram } from 'react-icons/ai';

export const SideContainer2 = () => {
  return (
    <div className="flex flex-col w-full max-w-lg mb-12 text-left lg:mx-auto">
      <a className="inline-flex items-center w-full mb-4 h-50 w-50">
        <img
          alt="blog"
          src="/Me.jpg"
          className="flex-shrink-0 object-cover object-center rounded-full"
          width={100}
          height={100}
        />
        <span className="flex flex-col flex-grow pl-3">
          <h2 className="md:text-2xl text-lg font-semibold tracking-widest text-gray-600 uppercase">
            Yosuke Sakai
          </h2>
        </span>
      </a>
      <span className="inline-flex justify-start sm:mt-0">
        <a className="text-gray-700 hover:text-neutral-600">
          <AiFillFacebook size={50} />
        </a>
        <a
          className="ml-3 text-gray-700 hover:text-neutral-600"
          href="https://github.com/alcowell"
        >
          <AiFillGithub size={50} />
        </a>
        <a className="ml-3 text-gray-700 hover:text-neutral-600" href="">
          <AiFillInstagram size={50} />
        </a>
        <a className="ml-3 text-blue-500 hover:text-neutral-600"></a>
      </span>
      <p className="mx-auto mt-6 md:text-base leading-relaxed text-gray-500 text-lg">
        I am highly motivated engineer with 3 years experience in Software and
        infrastructure development.
      </p>
    </div>
  );
};
