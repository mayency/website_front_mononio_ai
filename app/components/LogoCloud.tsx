import "./LogoCloud.css";

export default function LogoCloud() {
  const logos = [
    { name: "Google Ads", src: "/logos/Google_Ads_Logo.png", customClass: "h-40" },
    { name: "Meta", src: "/logos/Meta_Logo.png", customClass: "h-50" },
    { name: "TikTok", src: "/logos/tiktok_logo.png", customClass: "h-20" },
    { name: "LinkedIn", src: "/logos/Linkedin_Logo.png", customClass: "h-45" },
    { name: "X", src: "/logos/x_logo.png", customClass: "h-20" },
    { name: "Instagram", src: "/logos/instagram_logo.png", customClass: "h-18" },
    { name: "YouTube", src: "/logos/youtube_logo.png", customClass: "h-46" },
    { name: "WhatsApp", src: "/logos/whatsapp_logo.png", customClass: "h-20" },
    { name: "Telegram", src: "/logos/telegram_logo.png", customClass: "h-20" },
    { name: "Taboola", src: "/logos/taboola_logo.png", customClass: "h-40" },
    { name: "Outbrain", src: "/logos/outbrain_logo.png", customClass: "h-30" },
  ];

  // Duplicate logos to create seamless infinite scroll
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
                  className={`w-auto object-contain ${logo.customClass}`}
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
