
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
    {/* Banner Image */}
    <div className="w-full h-[20px] overflow-hidden">
      <Image
        src="/image.webp" // Path to the image inside the public folder
        alt="Brainrot Banner"
        width={1920} // Set the width to fill the screen
        height={10000} // This is still necessary for the image's intrinsic aspect ratio.
        layout="intrinsic" // Ensures aspect ratio is preserved but respects our CSS height
        objectFit="cover" // Ensures the image covers the banner area
        priority
      />
    </div>


      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Title Section */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          Brainrot Scanner
        </h1>

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-white">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {/* File Dropbox Section */}
        <div className="flex flex-col gap-4 items-center justify-center border-2 border-white rounded-lg p-8 bg-gray-800 text-white">
          <p>Drag and drop your files here</p>
          <input
            type="file"
            className="border-2 border-white rounded-md p-2 bg-transparent text-white"
          />
        </div>
      </main>
    </div>
  );
}
