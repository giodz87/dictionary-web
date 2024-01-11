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
    <section className={`   relative flex flex-col pb-[85px]  gap-8`}>
      <input
        value={context.search}
        onChange={handleSearch}
        className={` ${
          context.moonLight
            ? "bg-[#F4F4F4] text-[#2D2D2D]"
            : "bg-[#1F1F1F] text-white"
        } w-[327px] h-12  rounded-2xl  outline-none px-6 text-[16px] font-bold`}
        type="text"
      />
      <button
        onClick={() => {
          context.getApi();
        }}
      >
        <img
          className=" absolute right-8 top-4"
          src="./assets/images/icon-search.svg"
          alt="search logo"
        />
      </button>
      <div
        className={`  ${
          context.moonLight ? " text-[#2D2D2D]" : " text-white"
        } flex flex-row items-center justify-between  w-[327px] `}
      >
        <div>
          <div className="text-[32px] font-bold">{context.info?.word}</div>
          <div className="text-[#A445ED] text-[18px]  leading-6 font-normal">
            {context.info?.phonetic}
          </div>
        </div>

        <div>
          {context.info && (
            <div>
              <img
                className="w-12 h-12 cursor-pointer"
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
      <div className="flex flex-row  items-center justify-between  ">
        <p
          className={` ${
            context.moonLight ? " text-[#2D2D2D]" : "text-white"
          }  text-[18px] font-bold`}
        >
          noun
        </p>{" "}
        <hr className="w-[266px] h-[1px] bg-[#3A3A3A]" />
      </div>
      <div>
        <p className="text-[#757575] text-[16px] font-normal pb-2">Meaning</p>
        <ul className=" text-[#8F19E8] list-disc  w-[327px] ">
          {context.info?.meanings[0].definitions
            .slice(0, 3)
            .map((item: any, index: number) => (
              <li className=" ml-4 " key={index}>
                <p
                  className={` ${
                    context.moonLight ? " text-[#2D2D2D]" : "text-white"
                  } text-[15px] font-normal leading-6  `}
                >
                  {item.definition}
                </p>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-[327px]">
        {" "}
        <p className="text-[#757575] text-[16px] font-normal ">Synonyms</p>
        {context.info?.meanings[0].synonyms.map((item: any, index: number) => (
          <p className="text-[#A445ED] " key={index}>
            {item}
          </p>
        ))}
      </div>
      <div className=" flex flex-wrap items-center gap-2 w-[327px]">
        <p className="text-[#757575]  text-[16px] font-normal">antonyms</p>
        {context.info?.meanings[0].antonyms.map((item: any, index: number) => (
          <p className="text-[#A445ED] " key={index}>
            {" "}
            {item}
          </p>
        ))}
      </div>{" "}
      <div className="flex flex-row  items-center justify-between  ">
        <p
          className={` ${
            context.moonLight ? " text-[#2D2D2D]" : "text-white"
          } text-[18px] font-bold`}
        >
          verb
        </p>{" "}
        <hr className="w-[266px] h-[1px] bg-[#3A3A3A]" />
      </div>
      <div className="w-[327px]">
        <p className="text-[#757575] text-[16px] font-normal pb-2">Meaning</p>
        {context.info?.meanings[
          context.info.meanings.length - 1
        ].definitions.map((item: any, index: number) => (
          <ul className=" text-[#8F19E8] list-disc w-[327px] " key={index}>
            <li className=" ml-4 ">
              <p
                className={`${
                  context.moonLight ? " text-[#2D2D2D]" : "text-white"
                } text-[15px] font-normal leading-6 pb-3`}
              >
                {item.definition}
              </p>
            </li>
            <div className=" pl-[20px] w-[302px] text-[15px] font-normal leading-6 text-[#757575]">
              {item.example}
            </div>
          </ul>
        ))}
      </div>
      <hr className="w-[327px] h-[1px] bg-[#3A3A3A]" />
      <div>
        <p className="text-[#757575] text-[16px] font-normal pb-2">Source</p>
        {context.info?.sourceUrls.map((item: any, index: number) => (
          <a key={index} href={item}>
            <p
              className={`${
                context.moonLight ? " text-[#2D2D2D]" : "text-white"
              }`}
            >
              {item}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
