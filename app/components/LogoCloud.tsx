const logos = [
  "google", "meta", "tiktok", "linkedin", "taboola", "outbrain"
];

export default function LogoCloud() {
  return (
    <div className="bg-gray-900 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-400">
          Deploy campaigns across the platforms you already use
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          {logos.map((logo) => (
            <img
              key={logo}
              className="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
              src={`https://cdn.simpleicons.org/${logo}/white`}
              alt={logo}
              width={158}
              height={48}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
