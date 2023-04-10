import Image from "next/image";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { SideContainer2 } from "./SideContainer";

export const Layout: React.FunctionComponent = ({ title, children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full overflow-hidden">
        <div className="min-h-screen">
          <div className="w-screen h-64 md:h-64 w-full relative bg-black">
            <Image
              src={"/background.jpg"}
              quality={100}
              fill={true}
              style={{ objectFit: "cover", opacity: 0.6 }}
            />
            <h1 className="absolute text-4xl md:text-7xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {title}
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-1 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-6">
              {/* <div className="md:col-span-1 mt-9"><h1>yeah</h1></div> */}
              <div className="col-span-5 font-mplus">{children}</div>
              <div className="col-span-1 mt-9 px-4 md:px-6">
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
