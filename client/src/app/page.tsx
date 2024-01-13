import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full h-full bg-pink flex flex-col items-start justify-center gap-8 p-4 font-semibold">
      <div className="text-8xl ">
        Unlock your potential with the best tutors - PixelPixies.
      </div>
      <Link
        href={"/login"}
        className="border text-pink bg-white rounded-xl px-8 py-2 text-3xl"
      >
        Get started!
      </Link>
    </div>
  );
}
