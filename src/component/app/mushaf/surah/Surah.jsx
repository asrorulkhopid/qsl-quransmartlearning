import React, { useRef, useState } from "react";
import Label from "../../../label/Label";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ItemAyat from "./ItemAyat";
import Utils from "../../../../utils/Utils";
import ReactAudioPlayer from "react-audio-player";
import { fetchSurah } from "../../../../api/endpoint";

const Surah = () => {
  const { id } = useParams();

  const [currentAyah, setCurrentAyah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleAudioEnded = () => {
    if (!currentAyah) return;
    const ayahPlayed = currentAyah.ayahNumber;

    if (ayahPlayed !== -1 && ayahPlayed < data?.data.ayat.length) {
      const nextAyah = data?.data.ayat[ayahPlayed];
      setCurrentAyah({
        ayahNumber: nextAyah.nomorAyat,
        audioUrl: nextAyah.audio["05"],
      });
      setTimeout(() => {
        audioRef.current.audioEl.current.play(); // Play next Ayah
      }, 100);
    } else {
      setCurrentAyah(null);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = (ayahNumber, audioUrl) => {
    if (currentAyah?.ayahNumber === ayahNumber && isPlaying) {
      audioRef.current.audioEl.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentAyah({ ayahNumber, audioUrl });
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current.audioEl.current.play();
      }, 100);
    }
  };

  const { isLoading, data, isError } = useQuery({
    queryFn: () => fetchSurah(id),
    queryKey: [`surah-${id}`],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (isLoading) return <p className="text-black">Loading...</p>;
  if (isError) return <p>Error - {isError}</p>;

  return (
    <div className="p-2 lg:px-44 overflow-y-scroll no-scrollbar">
      <div className="flex flex-col">
        <div className="self-center pb-2 text-black">
          <Label title={data?.data.namaLatin} />
        </div>
        <div>
          {data?.data.ayat.map((ayat) => (
            <ItemAyat
              key={ayat.nomorAyat}
              number={Utils.covertLatinNumbertoArabic(ayat.nomorAyat)}
              ayat={ayat.teksArab}
              teksLatin={ayat.teksLatin}
              isPlaying={currentAyah?.ayahNumber == ayat.nomorAyat && isPlaying}
              onPlayPause={() =>
                handlePlayPause(ayat.nomorAyat, ayat.audio["05"])
              }
              translation={ayat.teksIndonesia}
            />
          ))}
        </div>
      </div>

      <ReactAudioPlayer
        ref={audioRef}
        src={currentAyah?.audioUrl || null}
        autoPlay={false}
        controls={false}
        onEnded={handleAudioEnded}
      />
    </div>
  );
};

export default Surah;
