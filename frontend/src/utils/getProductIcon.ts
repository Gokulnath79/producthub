import {
  Battery,
  Calculator,
  Camera,
  Cable,
  Clock3,
  Computer,
  Gamepad2,
  HardDrive,
  Headphones,
  House,
  Keyboard,
  Laptop,
  MemoryStick,
  Mic2,
  Monitor,
  Mouse,
  Navigation,
  Package,
  Plug,
  Printer,
  Projector,
  Radio,
  Router,
  ScanLine,
  Smartphone,
  Speaker,
  Tablet,
  Tv,
  Video,
  Watch,
  Webcam,
  type LucideIcon,
} from 'lucide-react'

interface ProductIconRule {
  keywords: string[]
  icon: LucideIcon
}

const productIconRules: ProductIconRule[] = [
  // Security camera / CCTV must come before generic camera.
  {
    keywords: [
      'security camera',
      'cctv',
      'surveillance camera',
      'ip camera',
    ],
    icon: Video,
  },

  // Video camera / webcam
  {
    keywords: [
      'webcam',
      'web camera',
      'video camera',
      'camcorder',
    ],
    icon: Webcam,
  },

  // Headphones / earphones / headsets
  {
    keywords: [
      'headphone',
      'headphones',
      'earphone',
      'earphones',
      'earbud',
      'earbuds',
      'airpod',
      'airpods',
      'headset',
    ],
    icon: Headphones,
  },

  // Keyboard
  {
    keywords: [
      'keyboard',
      'mechanical keyboard',
      'gaming keyboard',
      'wireless keyboard',
    ],
    icon: Keyboard,
  },

  // Mouse
  {
    keywords: [
      'mouse',
      'gaming mouse',
      'wireless mouse',
      'optical mouse',
      'bluetooth mouse',
    ],
    icon: Mouse,
  },

  // Monitor / display
  {
    keywords: [
      'monitor',
      'display',
      'computer screen',
      'gaming monitor',
    ],
    icon: Monitor,
  },

  // Laptop
  {
    keywords: [
      'laptop',
      'notebook computer',
      'macbook',
      'chromebook',
    ],
    icon: Laptop,
  },

  // Desktop computer / PC
  {
    keywords: [
      'desktop computer',
      'desktop pc',
      'gaming pc',
      'computer',
      'workstation',
      'pc',
    ],
    icon: Computer,
  },

  // Smartphone / mobile
  {
    keywords: [
      'smartphone',
      'smart phone',
      'mobile phone',
      'mobile',
      'iphone',
      'android phone',
      'cell phone',
    ],
    icon: Smartphone,
  },

  // Tablet
  {
    keywords: [
      'tablet',
      'ipad',
      'android tablet',
      'drawing tablet',
    ],
    icon: Tablet,
  },

  // Smartwatch
  {
    keywords: [
      'smartwatch',
      'smart watch',
      'apple watch',
      'fitness watch',
    ],
    icon: Watch,
  },

  // Speaker
  {
    keywords: [
      'speaker',
      'bluetooth speaker',
      'wireless speaker',
      'soundbar',
    ],
    icon: Speaker,
  },

  // Microphone
  {
    keywords: [
      'microphone',
      'mic',
      'gaming mic',
      'usb microphone',
    ],
    icon: Mic2,
  },

  // Camera
  {
    keywords: [
      'camera',
      'digital camera',
      'dslr',
      'mirrorless camera',
    ],
    icon: Camera,
  },

  // Printer
  {
    keywords: [
      'printer',
      'laser printer',
      'inkjet printer',
      'photo printer',
    ],
    icon: Printer,
  },

  // Scanner
  {
    keywords: [
      'scanner',
      'document scanner',
      'photo scanner',
    ],
    icon: ScanLine,
  },

  // Television / Smart TV
  {
    keywords: [
      'television',
      'smart tv',
      'android tv',
      'led tv',
      'oled tv',
      'tv',
    ],
    icon: Tv,
  },

  // Projector
  {
    keywords: [
      'projector',
      'mini projector',
      'home projector',
    ],
    icon: Projector,
  },

  // Router / Wi-Fi device
  {
    keywords: [
      'router',
      'wifi router',
      'wi-fi router',
      'wireless router',
      'modem',
      'wifi device',
    ],
    icon: Router,
  },

  // USB drive / pen drive
  {
    keywords: [
      'usb drive',
      'pen drive',
      'pendrive',
      'flash drive',
      'thumb drive',
    ],
    icon: MemoryStick,
  },

  // Hard drive / SSD
  {
    keywords: [
      'hard drive',
      'hard disk',
      'hdd',
      'ssd',
      'solid state drive',
      'external drive',
    ],
    icon: HardDrive,
  },

  // Memory card
  {
    keywords: [
      'memory card',
      'sd card',
      'microsd',
      'micro sd',
      'storage card',
    ],
    icon: MemoryStick,
  },

  // USB-C adapter / adapters
  {
    keywords: [
      'usb-c adapter',
      'usb c adapter',
      'type-c adapter',
      'type c adapter',
      'adapter',
      'dongle',
      'hub',
    ],
    icon: Plug,
  },

  // Charger
  {
    keywords: [
      'charger',
      'wall charger',
      'fast charger',
      'wireless charger',
      'charging brick',
    ],
    icon: Plug,
  },

  // Charging / USB cables
  {
    keywords: [
      'charging cable',
      'usb cable',
      'usb-c cable',
      'usb c cable',
      'type-c cable',
      'type c cable',
      'lightning cable',
      'data cable',
      'hdmi cable',
      'cable',
    ],
    icon: Cable,
  },

  // Power bank
  {
    keywords: [
      'power bank',
      'powerbank',
      'portable charger',
      'battery bank',
    ],
    icon: Battery,
  },

  // Battery
  {
    keywords: [
      'battery',
      'rechargeable battery',
    ],
    icon: Battery,
  },

  // Game controller
  {
    keywords: [
      'game controller',
      'gaming controller',
      'gamepad',
      'joystick',
      'controller',
    ],
    icon: Gamepad2,
  },

  // Gaming console
  {
    keywords: [
      'gaming console',
      'game console',
      'playstation',
      'xbox',
      'nintendo switch',
      'console',
    ],
    icon: Gamepad2,
  },

  // VR headset
  // Lucide does not have a dedicated universal VR headset icon,
  // so Headphones provides a consistent line-icon fallback.
  {
    keywords: [
      'vr headset',
      'virtual reality headset',
      'virtual reality',
      'vr glasses',
    ],
    icon: Headphones,
  },

  // Calculator
  {
    keywords: [
      'calculator',
      'scientific calculator',
      'financial calculator',
    ],
    icon: Calculator,
  },

  // Radio
  {
    keywords: [
      'radio',
      'fm radio',
      'am radio',
      'portable radio',
    ],
    icon: Radio,
  },

  // GPS / navigation
  {
    keywords: [
      'gps',
      'navigation device',
      'gps navigator',
      'satellite navigation',
      'sat nav',
    ],
    icon: Navigation,
  },

  // Smart home devices
  {
    keywords: [
      'smart home',
      'smart home device',
      'home automation',
      'smart hub',
      'smart switch',
      'smart plug',
    ],
    icon: House,
  },

  // Drone
  // There is no dedicated drone icon in the current Lucide set,
  // so Video provides an appropriate electronic-camera-device icon.
  {
    keywords: [
      'drone',
      'camera drone',
      'quadcopter',
    ],
    icon: Video,
  },

  // Electronic clock
  {
    keywords: [
      'electronic clock',
      'digital clock',
      'alarm clock',
      'desk clock',
    ],
    icon: Clock3,
  },
]

export function getProductIcon(
  productName: string,
  category = '',
): LucideIcon {
  const searchableText =
    `${productName} ${category}`.toLowerCase().trim()

  const matchedRule = productIconRules.find((rule) =>
    rule.keywords.some((keyword) =>
      searchableText.includes(keyword),
    ),
  )

  return matchedRule?.icon ?? Package
}