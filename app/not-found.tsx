import Image from "next/image";

import notFoundImg from "@/public/images/404.svg";

function NotFoundPage() {
  return (
    <div className="flex justify-center items-center px-6 py-[7vh]">
      <Image
        src={notFoundImg}
        alt="not found"
        width={500}
        className="max-w-full aspect-square bg-white p-3 rounded-lg"
        height={500}
      />
    </div>
  );
}

export default NotFoundPage;
