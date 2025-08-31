import React from "react";
import RotatingText from "../ui/RotatingText";
// import YourSVG from "../assets/yourSVG.svg"; // SVG import

const Home = () => {
  return (
    <section className="py-16 px-4 flex justify-end items-start gap-8">
      {/* Right text */}
      <div className="flex flex-col justify-start items-end w-2/3 pr-20">
        <h1 className="text-3xl md:text-5xl font-bold text-right text-green-800 tracking-wide font-serif mb-6">
          Tracing carbon today,for a clearer sky tomorrow.
        </h1>

        <div className="flex justify-end items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-700 whitespace-nowrap">
            Stop Carbon
          </h2>

          <RotatingText
            texts={["Start Green", "Protect Air", "Save Generations"]}
            auto={true}
            rotationInterval={2000}
            mainClassName="px-2 bg-green-300 text-black py-1 rounded-lg text-2xl font-semibold"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
