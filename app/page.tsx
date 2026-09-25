import Image from "next/image";
import Library from "../components/Library";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0c0f] text-white">
      {/* HERO */}
      <section className="container-fit py-6 md:py-10">
        <div
          className="
            grid
            min-h-162.5
            items-center
            gap-8
            overflow-hidden
            rounded-2xl
            border
            border-[#292c33]
            bg-[#15171c]
            px-8
            py-12
            md:px-12
            lg:grid-cols-2
            lg:px-16
          "
        >
          {/* LEFT CONTENT */}
          <div className="z-10">
            <p className="text-sm font-bold tracking-[0.3em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1
              className="
                display
                mt-5
                text-5xl
                font-black
                leading-[0.9]
                tracking-tight
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#9ba09c] md:text-lg md:leading-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            <a
              href="#library"
              className="
                acid-btn
                mt-8
                inline-flex
                items-center
                justify-center
                px-7
                py-4
                text-sm
                font-black
                transition
                duration-200
                hover:scale-105
              "
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex h-95 items-center justify-center md:h-120 lg:h-140">
            <Image
              src="/banner.png"
              alt="FitLog workout"
              width={900}
              height={700}
              priority
              className="
                h-full
                w-full
                object-contain
                object-center
                drop-shadow-[0_0_35px_rgba(204,255,0,0.08)]
              "
            />
          </div>
        </div>
      </section>

      {/* WORKOUT LIBRARY */}
      <section id="library">
        <Library />
      </section>
    </main>
  );
}