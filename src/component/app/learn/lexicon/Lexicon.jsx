import React from "react";
import Label from "../../../label/Label";
import Vocabulary from "../../../vocabulary/Vocabulary";

const Lexicon = () => {
  return (
    <div>
      <div className="flex flex-col px-4 md:px-16">
        <div className="self-center mt-2">
          <Label title={"Lexicon"} />
        </div>
        <div className="mt-4">
          <div>
            <p style={{ direction: "rtl" }} className="font-serif text-xl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </p>
            <hr className="mt-2 text-indigo-400" />
          </div>
          <div className="mt-2">
            <p className="font-semibold text-gray-600">Terdiri dari X kata :</p>
            <div className="mt-2 flex flex-row-reverse flex-wrap gap-1">
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
              <Vocabulary arabic={"ٱللَّهِ"} indonesia={"Allah"} />
            </div>
            <hr className="mt-2 text-indigo-400" />
          </div>
          <div className="mt-2">
            <p className="font-semibold text-gray-600">Terjemah indah : </p>
            <p className="text-right mt-2">
              Dengan nama Allah yang maha pengasih dan maha penyayang
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lexicon;
