import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-fit flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-bold tracking-[0.3em] text-[#ccff00]">
        404
      </p>

      <h1 className="display mt-3 text-7xl">
        PAGE NOT FOUND
      </h1>

      <p className="mt-4 text-[#9ba09c]">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="acid-btn mt-8 px-6 py-3 text-sm font-black"
      >
        BACK HOME
      </Link>
    </main>
  );
}