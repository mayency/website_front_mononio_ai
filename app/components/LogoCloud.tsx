import "./LogoCloud.css";

export default function LogoCloud() {
  const logos = [
    { name: "Google Ads", src: "/logos/Google_Ads_Logo.png" },
    { name: "Meta", src: "/logos/Meta_Logo.png", customClass: "h-6" },
    { name: "TikTok", src: "/logos/tiktok_logo.png" },
    { name: "LinkedIn", src: "/logos/Linkedin_Logo.png" },
    { name: "X", src: "/logos/x_logo.png" },
    { name: "Instagram", src: "/logos/instegram_logo.png" },
    { name: "YouTube", src: "/logos/youtube_logo.png" },
    { name: "WhatsApp", src: "/logos/whatapp_logo.png" },
    { name: "Telegram", src: "/logos/telegram_logo.png" },
    { name: "Taboola", src: "/logos/taboola_logo.png" },
    { name: "Outbrain", src: "/logos/outbrain_logo.png" }
  ];

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="bg-gray-900 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-400">
          Deploy campaigns across the platforms you already use
        </h2>
        <div className="logo-slider mt-10">
          <div className="logo-track">
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className="logo-item">
                <img
                  className={`max-h-10 w-auto object-contain ${logo.customClass || "h-10"}`}
                  src={logo.src}
                  alt={logo.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
