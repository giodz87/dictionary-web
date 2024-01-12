import { useState, useEffect } from "react";
import { MyContext } from "./Context";
import Header from "./components/Header";
import Search from "./components/Search";
interface Phonetic {
  audio: string;
  text: string;
  sourceUrl: string;
  license: {
    name: string;
    url: string;
  };
}

interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

interface WordData {
  [x: string]: any;
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
}

export type MyContextProps = {
  moonLight: boolean;
  setMoonLight: (value: boolean) => void;
  info: WordData | undefined;
  setInfo: (value: WordData) => void;
  search: string;
  setSearch: (value: string) => void;
  findFont: string;
  setFindFont: (value: string) => void;
  getApi: () => void;
};

function App() {
  const [moonLight, setMoonLight] = useState<boolean>(false);
  const [findFont, setFindFont] = useState<string>("Sans Serif");
  const [info, setInfo] = useState<WordData | undefined>();
  const [search, setSearch] = useState<string>("");

  const getApi = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      const data = await response.json();
      if (response.ok) {
        setInfo(data[0]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    document.body.style.fontFamily = findFont;
  }, [findFont]);

  useEffect(() => {
    const body = document.body;
    if (moonLight) {
      body.style.background = "#Fff";
    } else {
      body.style.background = "#050505";
    }
  }, [moonLight]);
  return (
    <MyContext.Provider
      value={{
        moonLight,
        setMoonLight,
        info,
        setInfo,
        getApi,
        search,
        setSearch,
        findFont,
        setFindFont,
      }}
    >
      <Header />
      <Search />
    </MyContext.Provider>
  );
}

export default App;
