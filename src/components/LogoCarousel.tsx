import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LogoCarousel() {
  const companies = [
    { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/220px-Adobe_Corporate_Logo.png', invertColors: false },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/220px-Microsoft_logo_%282012%29.svg.png', invertColors: false },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/220px-Google_2015_logo.svg.png', invertColors: false },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/220px-Amazon_logo.svg.png', invertColors: false },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/220px-Apple_logo_black.svg.png', invertColors: false },
    { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/220px-Meta_Platforms_Inc._logo.svg.png', invertColors: false },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/220px-IBM_logo.svg.png', invertColors: false },
    { name: 'Intel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/220px-Intel_logo_%282006-2020%29.svg.png', invertColors: false }
  ]

  return (
    <div className="flex overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex gap-12 items-center whitespace-nowrap"
      >
        {companies.concat(companies).map((company, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-32 h-12 relative hover:scale-110 transition-transform duration-300 rounded-lg flex items-center justify-center"
          >
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={128}
              height={48}
              className={`object-contain w-full h-full ${company.invertColors ? 'invert' : ''}`}
              priority={index < 8}
              unoptimized={true}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
} 