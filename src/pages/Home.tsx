import React from "react";
import StudyBanner from "../features/study/components/StudyBanner"; 
import StudyFilter from "../features/study/components/StudyFilter";
import StudyList from "../features/study/components/StudyList";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      <StudyBanner />
      <StudyFilter />
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            최신 스터디 둘러보기
          </h3>
          <div className="flex gap-2 text-sm">
            <button className="font-bold text-primary border-b-2 border-primary pb-1">
              최신순
            </button>
            <button className="font-medium text-gray-500 pb-1">인기순</button>
          </div>
        </div>
        <StudyList />
      </section>
    </div>
  );
};

export default Home;
