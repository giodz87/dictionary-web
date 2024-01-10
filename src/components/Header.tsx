import { useUserContext } from "../Context";

export default function Header() {
  const context = useUserContext();
  return (
    <header
      className={` ${
        context.moonLight
          ? " bg-[#fff] text-[#2D2D2D]"
          : "bg-[#050505] text-[#FFF]"
      }  flex flex-row w-full items-center justify-center `}
    >
      <div className="w-[375px] flex flex-row items-center justify-between py-6 px-6">
        <img
          src="./dictionary-web-app/starter-code/assets/images/logo.svg"
          alt="Logo"
        />

        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <ul>
              <li>Sans Serif</li>
              <ul>
                {/* <li>Sans Serif</li>
                <li>Serif</li>
                <li>Mono</li> */}
              </ul>
            </ul>
            <img
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
          <img
            className=""
            src="./dictionary-web-app/starter-code/assets/images/icon-moon.svg"
            alt=""
          />
        </div>
      </div>
    </header>
  );
}
