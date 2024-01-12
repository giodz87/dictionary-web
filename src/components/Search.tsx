import { useEffect, useRef } from "react";
import { useUserContext } from "../Context";

export default function Search() {
  const context = useUserContext();
  const phonetic = useRef<number>(0);
  const audio = useRef<any>();

  const handleSearch = (e: { target: { value: string } }) => {
    const searchInfo = e.target.value;
    context.setSearch(searchInfo);
  };

  const poneticsSearch = () => {
    if (context.info?.phonetics.length) {
      for (let i = 0; i < context.info?.phonetics.length; i++) {
        if (
          context.info?.phonetics[i].text &&
          context.info?.phonetics[i].audio
        ) {
          phonetic.current = i;
          break;
        }
      }
    }
  };

  useEffect(() => {
    poneticsSearch();
  }, []);

  return (
    <section
      className={`   relative flex flex-col pb-[85px]  gap-8  w-[327px]  md:w-[690px] xl:w-[736px]`}
    >
      <input
        value={context.search}
        onChange={handleSearch}
        className={` ${
          context.moonLight
            ? "bg-[#F4F4F4] text-[#2D2D2D]"
            : "bg-[#1F1F1F] text-white"
        } w-full h-12  rounded-2xl  outline-none px-6 text-[16px] font-bold md:text-[20px]  md:h-16`}
        type="text"
      />
      <button
        onClick={() => {
          context.getApi();
        }}
      >
        <img
          className=" absolute right-8 top-4  md:top-6  cursor-pointer"
          src="./assets/images/icon-search.svg"
          alt="search logo"
        />
      </button>
      <div
        className={`  ${
          context.moonLight ? " text-[#2D2D2D]" : " text-white"
        } flex flex-row items-center justify-between `}
      >
        <div>
          <div className="text-[32px] font-bold  md:text-[64px]">
            {context.info?.word}
          </div>
          <div className="text-[#A445ED] text-[18px]  leading-6 font-normal md:text-[24px]">
            {context.info?.phonetic}
          </div>
        </div>
        {context.info === null ? (
          <div className=" flex flex-col items-center justify-center ">
            <p className="text-[64px]">😕</p>
            <p className=" text-[20px] font-bold">No Definitions Found </p>
            <p className=" text-center text-[14px] md:text-[18px] font-normal leading-6 text-[#757575] mt-5">
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </p>
          </div>
        ) : (
          <div>
            <div>
              {context.info && (
                <div>
                  <img
                    className="w-12 h-12 cursor-pointer md:w-[75px] md:h-[75px]"
                    onClick={() => {
                      audio.current.play();
                    }}
                    src="./assets/images/icon-play.svg"
                    alt=""
                  />

                  <audio
                    ref={audio}
                    src={context.info?.phonetics[phonetic.current]?.audio}
                  ></audio>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row  items-center justify-between  ">
        <p
          className={` ${
            context.moonLight ? " text-[#2D2D2D]" : "text-white"
          }  text-[18px] font-bold  md:text-[24px] mr-8`}
        >
          noun
        </p>{" "}
        <hr className="w-full h-[1px] bg-[#3A3A3A] " />
      </div>
      <div>
        <p className="text-[#757575] text-[16px] font-normal pb-2  md:text-[20px]">
          Meaning
        </p>
        <ul className=" text-[#8F19E8] list-disc  ">
          {context.info?.meanings[0].definitions
            .slice(0, 3)
            .map((item: any, index: number) => (
              <li className=" ml-4  md:ml-10" key={index}>
                <p
                  className={` ${
                    context.moonLight ? " text-[#2D2D2D]" : "text-white"
                  } text-[15px] font-normal leading-7 mt-2 md:text-[18px] `}
                >
                  {item.definition}
                </p>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-2 ">
        {" "}
        <p className="text-[#757575] text-[16px] font-normal  md:text-[20px]">
          Synonyms
        </p>
        {context.info?.meanings[0].synonyms.map((item: any, index: number) => (
          <p
            className="text-[#A445ED] text-[16px] font-bold md:text-[20px]"
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
      <div className=" flex flex-wrap items-center gap-2">
        <p className="text-[#757575]  text-[16px] font-normal md:text-[20px] ">
          antonyms
        </p>
        {context.info?.meanings[0].antonyms.map((item: any, index: number) => (
          <p
            className="text-[#A445ED] text-[16px] font-bold md:text-[20px] "
            key={index}
          >
            {" "}
            {item}
          </p>
        ))}
      </div>{" "}
      <div className="flex flex-row  items-center justify-between  ">
        <p
          className={` ${
            context.moonLight ? " text-[#2D2D2D]" : "text-white"
          } text-[18px] font-bold md:text-[24px] mr-8`}
        >
          verb
        </p>{" "}
        <hr className="w-full h-[1px] bg-[#3A3A3A] " />
      </div>
      <div>
        <p className="text-[#757575] text-[16px] font-normal pb-2 md:text-[20px]">
          Meaning
        </p>
        {context.info?.meanings[
          context.info.meanings.length - 1
        ].definitions.map((item: any, index: number) => (
          <ul className=" text-[#8F19E8] list-disc  " key={index}>
            <li className=" ml-4 md:ml-10 ">
              <p
                className={`${
                  context.moonLight ? " text-[#2D2D2D]" : "text-white"
                } text-[15px] font-normal leading-6 pb-3 md:text-[18px] md:mt-2 `}
              >
                {item.definition}
              </p>
            </li>
            <div className=" pl-[20px] text-[15px] font-normal leading-6 text-[#757575] md:ml-5 md:text-[18px]">
              {item.example}
            </div>
          </ul>
        ))}
      </div>
      <hr className="w-full h-[1px] bg-[#3A3A3A] " />
      <div className="flex flex-col items-start flex-wrap  md:flex-row  md:gap-3 ">
        <p className="text-[#757575] text-[14px] font-normal pb-2">Source</p>
        {context.info?.sourceUrls.map((item: any, index: number) => (
          <a key={index} href={item}>
            <p
              className={`${
                context.moonLight ? " text-[#2D2D2D]" : "text-white"
              } `}
            >
              {item}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
