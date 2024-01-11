import { useState } from "react";
import { useUserContext } from "../Context";

export default function Header() {
  const context = useUserContext();
  const [menuBar, setMenuBar] = useState<boolean>(false);

  return (
    <header
      className={` ${
        context.moonLight
          ? " bg-[#fff] text-[#2D2D2D]"
          : "bg-[#050505] text-[#FFF]"
      }  flex flex-row w-full items-center justify-center  `}
    >
      <div className="w-[375px] flex flex-row items-center justify-between py-6 px-6">
        <img
          src="./dictionary-web-app/starter-code/assets/images/logo.svg"
          alt="Logo"
        />

        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className=" relative">
              <p>{context.findFont}</p>
              {menuBar && (
                <div
                  className={` ${
                    context.moonLight
                      ? "bg-[#FFF] text-[#2D2D2D] shadow-[0px_5px_30px_0px_#00000019] "
                      : "bg-[#1F1F1F] text-[#FFF]  shadow-[0px_5px_30px_0px_#A445ED] "
                  } right-[-30px] top-[40px]    flex  flex-col items-start justify-between  absolute w-[143px] h-[112px] rounded-2xl p-6 z-10`}
                >
                  <p
                    onClick={() => {
                      context.setFindFont("Sans Serif"), setMenuBar(false);
                    }}
                    className="hover:text-[#A445ED]"
                  >
                    Sans Serif
                  </p>
                  <p
                    onClick={() => {
                      context.setFindFont("Serif"), setMenuBar(false);
                    }}
                    className="hover:text-[#A445ED]"
                  >
                    Serif
                  </p>
                  <p
                    onClick={() => {
                      context.setFindFont("Mono"), setMenuBar(false);
                    }}
                    className="hover:text-[#A445ED]"
                  >
                    Mono
                  </p>
                </div>
              )}
            </div>
            <img
              onClick={() => {
                setMenuBar(!menuBar);
              }}
              src="./public/dictionary-web-app/starter-code/assets/images/icon-arrow-down.svg"
              alt=""
            />
          </div>
          <hr className="h-8 w-[1px] bg-[#E9E9E9]" />
          <div
            className={`${
              context.moonLight ? "bg-[#757575]" : "bg-[#A445ED]"
            }  w-10 h-5 rounded-xl  relative`}
          >
            <button
              onClick={() => {
                context.setMoonLight(!context.moonLight);
              }}
              className={` ${
                context.moonLight ? "left-1 top-[3px]" : " right-1 top-[3px]"
              }  absolute  w-3.5 h-3.5  rounded-full bg-white `}
            ></button>
          </div>
          {context.moonLight ? (
            <img
              src="./dictionary-web-app/starter-code/assets/images/icon-moon.svg"
              alt=""
            />
          ) : (
            <img
              src="./dictionary-web-app/starter-code/assets/images/icon-night-moon.svg"
              alt=""
            />
          )}
        </div>
      </div>
    </header>
  );
}
