import Banner from "../../component/fragment/Banner";

const images = ["1.svg", "2.svg", "3.svg", "4.svg"];

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center grow bg-cover bg-bottom bg-blend-multiply text-on-secondary">
      {/* title */}
      <h1 className="sm:text-3xl md:text-4xl text-2xl font-bold">
        Welcome to <span>Q-SL</span>
      </h1>
      <h4 className="mt-4">Belajar Bahasa Arab Di dan Untuk Al-Qur'an</h4>
      {/* banner */}
      <div className="mt-4">
        <Banner images={images} />
      </div>
      {/* quote */}
      <h5 className="mt-8 text-2xl font-gulzar">
        وَلَقَدْ يَسَّرْنَا ٱلْقُرْءَانَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ
      </h5>
      <blockquote className="mx-4 mt-4 text-center italic">
        "Dan sesungguhnya telah Kami mudahkan Al-Quran untuk pelajaran, maka
        adakah orang yang mengambil pelajaran?"
      </blockquote>
    </div>
  );
};

export default Home;
