import Image from "next/image";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center relative">
      <Image src="/hero1.png" alt="Grow ERP" width={1000} height={1000} />
      <Image
        src="/hero2.png"
        alt="Grow ERP"
        width={700}
        height={700}
        className="relative -top-80"
      />
    </div>
  );
}
