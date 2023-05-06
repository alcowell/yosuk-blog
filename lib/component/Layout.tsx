import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { SideContainer2 } from './SideContainer';

export const Layout = ({
  title,
  children,
  backgroundImage,
}: {
  title: string;
  children: ReactNode;
  backgroundImage: string;
}) => {
  return (
    <>
      <Navbar />
      <div className="w-full overflow-hidden">
        <div className="min-h-screen">
          <div className="h-48 md:h-64 w-full relative overflow-hidden bg-black">
            <img
              className="object-cover opacity-60 w-full h-48 md:h-64"
              src={backgroundImage}
              alt="background"
            />
            <h1 className="absolute text-2xl md:text-5xl 2xl:text-6xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-noto">
              {title}
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-1 md:px-8 pt-1 md:pt-0">
            <div className="grid grid-cols-1 md:grid-cols-6">
              <div className="col-span-5 font-mplus">{children}</div>
              <div className="col-span-1 pt-9">
                <SideContainer2 />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
