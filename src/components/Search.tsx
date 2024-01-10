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
    <section className=" relative">
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
          src="./dictionary-web-app/starter-code/assets/images/icon-search.svg"
          alt="search logo"
        />
      </button>

      <div
        className={`  ${
          context.moonLight ? " text-[#2D2D2D]" : " text-white"
        } flex flex-row items-center justify-between  w-full pt-6`}
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
                className="w-12 h-12"
                onClick={() => {
                  audio.current.play();
                }}
                src="./dictionary-web-app/starter-code/assets/images/icon-play.svg"
                alt=""
              />
              <audio
                ref={audio}
                src={context.info?.phonetics[phonetic.current].audio}
              ></audio>
            </div>
          )}
        </div>
      </div>
      <div>
        {context.info?.meanings.map((item: any, index: number) => (
          <div key={index}>
            <ul className=" list-disc  w-[327px]">
              {item.definitions.map((item: any, index: number) => (
                <li key={index} className="ml-4">
                  <div className="list-item">{item.definition}</div>
                </li>
              ))}
            </ul>

            {/* {item.antonyms.map((item: any, index: number) => (
              <div key={index}>
                <div>{item}</div>
              </div>
            ))}
            <div className=" flex flex-wrap items-center gap-1  w-[327px]">
              <p className="text-[#757575] mr-5">Synonyms</p>
              {item.synonyms.map((item: any, index: number) => (
                <div key={index}>
                  <div className="text-[#A445ED]  "> {item}</div>
                </div>
              ))}
            </div> */}
          </div>
        ))}
      </div>

      <section className=" w-[200px] h-[5px] bg-red-400"></section>
      <div className=" flex flex-row items-center gap-6">
        {" "}
        <p className="text-[#757575]">Synonyms</p>
        {context.info?.meanings.map((item: any, index: number) => (
          <div className="text-[#A445ED]" key={index}>
            {" "}
            {item.synonyms.join("  ")}
          </div>
        ))}
      </div>
      <section className=" w-[200px] h-[5px] bg-green-300 mt-20"></section>
      {context.info?.meanings.map((item: any, index: number) => (
        <div key={index}> {item.antonyms.join("  ")}</div>
      ))}
    </section>
  );
}
