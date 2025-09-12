'use client';

import { useState, useEffect } from 'react';

const testimonials = [ 
{ 
quote: "Week 1 with agency: 12 leads at $416/lead. Week 1 with MONONIO: 47 leads at $89/lead. Saved $7,700/month.", 
author: "Sarah M.", 
role: "Boutique Owner, Austin", 
savings: "$7,700/month saved", 
rating: 5 
}, 
{ 
quote: "My agency took 4 months to launch one campaign. MONONIO created 5 campaigns in 15 minutes. And they perform better.", 
author: "Lisa Martinez", 
role: "Fitness Coach, Dallas", 
savings: "15-minute setup vs 4 months", 
rating: 5 
}, 
{ 
quote: "I spent 6 months paying $8K/month to an agency. With MONONIO, I see every click, every conversion. First month: 40% better results.", 
author: "James T.", 
role: "Tech Founder, Seattle", 
savings: "40% better ROAS", 
rating: 5 
}
];

export default function TestimonialsCarousel() { 
const [current, setCurrent] = useState(0); 

useEffect(() => { 
const timer = setInterval(() => { 
setCurrent((prev) => (prev + 1) % testimonials.length); 
}, 5000); 
return () => clearInterval(timer); 
}, []); 

return ( 
<section className="py-16 bg-gray-900/50"> 
<div className="max-w-4xl mx-auto px-4"> 
<h2 className="text-3xl font-bold text-center mb-8"> 
Real Businesses. Real Savings. Real Results. 
</h2> 

<div className="relative h-64 flex items-center justify-center"> 
{testimonials.map((testimonial, index) => ( 
<div 
key={index} 
className={`absolute inset-0 transition-opacity duration-500 ${ 
index === current ? 'opacity-100' : 'opacity-0' 
}`} 
> 
<div className="bg-black/50 rounded-xl p-8 border border-purple-500/20"> 
<p className="text-lg text-gray-300 mb-4">"{testimonial.quote}"</p> 
<div className="flex justify-between items-center"> 
<div> 
<p className="font-semibold text-white">{testimonial.author}</p> 
<p className="text-sm text-gray-400">{testimonial.role}</p> 
</div> 
<div className="text-green-400 font-bold"> 
{testimonial.savings} 
</div> 
</div> 
</div> 
</div> 
))} 
</div> 

<div className="flex justify-center gap-2 mt-6"> 
{testimonials.map((_, index) => ( 
<button 
key={index} 
onClick={() => setCurrent(index)} 
className={`w-2 h-2 rounded-full transition-all ${ 
index === current ? 'w-8 bg-purple-400' : 'bg-gray-600' 
}`} 
/> 
))} 
</div> 
</div> 
</section> 
);
}
