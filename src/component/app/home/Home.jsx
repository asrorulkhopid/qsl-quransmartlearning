import Banner from "./Banner";

const images = ["1.svg", "2.svg", "3.svg", "4.svg"];

const Home = () => {
  return (
    <div className="grow flex flex-col items-center justify-center bg-[url(/assets/bg.jpg)] bg-cover bg-bottom bg-indigo-100 bg-blend-multiply text-slate-200">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-transparent bg-gradient-to-tr from-slate-900 to-slate-400 bg-clip-text">
        Welcome to <span className="t">Q-SL</span>
        {console.log("rerender")}
      </h1>
      <h4 className="mt-4 text-slate-800">
        Belajar Bahasa Arab Di dan Untuk Al-Qur'an
      </h4>
      <div className="mt-4">
        <Banner images={images} />
      </div>

      <h5 className="mt-8 font-serif text-2xl text-slate-800">
        وَلَقَدْ يَسَّرْنَا ٱلْقُرْءَانَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ
      </h5>
      <blockquote className="mx-4 mt-4 text-center text-slate-800 italic">
        "Dan sesungguhnya telah Kami mudahkan Al-Quran untuk pelajaran, maka
        adakah orang yang mengambil pelajaran?"
      </blockquote>
    </div>
  );
};

export default Home;
