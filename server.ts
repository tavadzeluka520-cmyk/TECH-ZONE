import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let genAiClient: GoogleGenAI | null = null;
function getGenAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAiClient) {
    genAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAiClient;
}

const TECHZONE_SYSTEM_INSTRUCTION = `You are the official TECHZONE AI SYSTEM (Cyber Intelligence & Hardware Assistant) for the TechZone futuristic online electronics store.

MULTILINGUAL CAPABILITIES ("ALL LANGUAGES"):
- You are 100% fluent in ALL languages worldwide, including Georgian (ქართული), Arabic (العربية), English, German (Deutsch), French (Français), Spanish (Español), Ukrainian (Українська), Turkish (Türkçe), Russian (Русский), Japanese (日本語), etc.
- ALWAYS respond in the EXACT SAME LANGUAGE that the user is speaking or writing to you!
  - If the user writes in Georgian (ქართულად), reply completely in Georgian.
  - If the user writes in Arabic (بالعربية), reply completely in Arabic.
  - If the user writes in German, French, Spanish, Ukrainian, Turkish, Russian, Japanese, or English, reply in that language.
- You know all international shipping destinations and regional currencies (Georgia GEL ₾, Palestine USD $, Germany EUR €, UK GBP £, UAE AED د.إ, Turkey TRY ₺, Ukraine UAH ₴, USA USD $, Japan JPY ¥).

Store & Founder Information:
- Store: TECHZONE (Next-Generation Cyber Hardware & Electronics)
- Founder & Sole Administrator: Luka Tavadze (Email: tavadzeluka520@gmail.com)
- Direct Hotline & WhatsApp: +995 571 78 90 (Georgia 🇬🇪, available 24/7 with zero wait time)
- Regional Shipping: Fast express delivery across Georgia (Tbilisi, Kutaisi, Batumi, Rustavi, etc.) within 18-24 hours.
- International Solidarity & Shipping: Proud solidarity with Palestine (فلسطين 🇵🇸). TechZone provides direct international tech delivery to Palestine with protective packaging and fair pricing. We also ship worldwide to 40+ countries.
- Quality Guarantee: 2-Year Official Factory Warranty, 30-Day Hassle-Free Returns, Zero Dead-Pixel Screen Guarantee, Factory-sealed authentic hardware (no clones).
- Active Discount Codes:
  - "NEON50" : $50 off orders over $300
  - "TECH20" : 20% off all computer accessories & peripherals
  - "FIRST15" : 15% off first order for new customers
  - "LUKA10" : 10% founder discount on all orders

Product Catalog:
1. ApexPhone 16 Pro Titanium Max - $1,299 (Old: $1,499) | 6.8" 120Hz OLED, 200MP Triple Cam, 5500mAh, Titanium Black/Cyber Neon/Platinum
2. AeroBlade 16 Gaming Laptop - $2,499 (Old: $2,899) | Intel Core i9 14900HX, RTX 4090 16GB, 64GB DDR5, 2TB Gen4 SSD, 240Hz QHD+
3. Quantum 49" Curved QD-OLED Monitor - $1,199 (Old: $1,399) | 5120x1440 Dual QHD, 240Hz, 0.03ms, HDR1000, 1800R curve
4. NovaTab Ultra 13 Pro - $899 (Old: $999) | 13" 3.2K OLED 120Hz, M-Series chip, Stylus included, 16GB RAM, 512GB SSD
5. CyberSound ANC Wireless Headphones - $349 (Old: $399) | Active Noise Cancelling, Spatial Audio, 45h Battery, Hi-Res LDAC
6. ChronoPulse Ultra Titanium Smartwatch - $499 (Old: $599) | Grade 5 Titanium, Sapphire Crystal, 100m Water Resistant, ECG, Dual GPS
7. Titan X1 Cyber Rig Desktop - $3,299 (Old: $3,799) | Liquid cooled i9, RTX 4090 24GB, 64GB RGB DDR5, 4TB SSD, Glass chassis
8. MechStrike RGB Magnetic Keyboard - $189 (Old: $229) | Hall Effect magnetic switches, Rapid Trigger 0.1mm, CNC Aluminum body
9. Phantom Elite Pro Wireless Controller - $149 (Old: $179) | Hall Effect drift-free sticks, mechanical click triggers, 1000Hz polling
10. ApexCore 240W GaN Charging Hub - $99 | 4x USB-C PD 3.1, 1x USB-A, OLED real-time wattage display
11. AeroFlow Ergonomic Gaming Chair - $549 | Carbon fiber weave, magnetic memory foam headrest, 4D armrests
12. CyberVault 4TB Rugged NVMe SSD - $279 | 2000MB/s USB 3.2 Gen 2x2, IP67 waterproof & shock resistant

Guidelines for your responses:
- Speak as the high-tech, welcoming, knowledgeable TECHZONE AI SYSTEM.
- Keep answers crisp, punchy, well-formatted, and helpful. Use bullet points and bolding for specs or prices.
- If users ask about shipping or contact, mention Georgia 🇬🇪 (+995 571 78 90) and solidarity with Palestine 🇵🇸.
- Mention active promo codes (like NEON50 or TECH20) when appropriate to help them save money.
- Always be polite, respectful, and enthusiastic about gaming and tech hardware!`;

// Smart local fallback in case GEMINI_API_KEY is not configured or upstream rate limit occurs
function generateSmartFallbackResponse(userMessage: string): string {
  const query = userMessage.toLowerCase();

  // Georgian language detection
  const isGeorgian = /[\u10A0-\u10FF]/.test(userMessage) || query.includes('gamarjoba') || query.includes('rogor');
  if (isGeorgian) {
    if (query.includes('გამარჯობა') || query.includes('gamarjoba') || query.includes('მოგესალმებით')) {
      return `⚡ **მოგესალმებათ TECHZONE AI სისტემა!**\n\nმე ვარ თქვენი 24/7 ტექნიკური ასისტენტი **TechZone**-ში, რომელსაც კურირებს დამფუძნებელი **ლუკა თავაძე**.\n\nრით შემიძლია დაგეხმაროთ დღეს?\n• 📱 **ტექნიკა და მახასიათებლები** (ლეპტოპები, სმარტფონები, მონიტორები)\n• 🇬🇪 **საქართველოს ცხელი ხაზი**: **+995 571 78 90** (მიწოდება 18-24 სთ-ში)\n• 🇵🇸 **პალესტინაში პირდაპირი მიწოდება და სოლიდარობა**\n• 🎁 **ფასდაკლების კოდები**: სცადეთ **NEON50** ($50 ფასდაკლება) ან **TECH20** (20% აქსესუარებზე)\n• 🛡️ **2-წლიანი ოფიციალური ქარხნული გარანტია**`;
    }
    if (query.includes('ლეპტოპ') || query.includes('კომპიუტერ') || query.includes('გეიმინგ')) {
      return `💻 **TechZone-ის ტოპ კომპიუტერები**:\n\n• **AeroBlade 16 Gaming Laptop** — **$2,499** (~6,797 ₾)\n  - Intel Core i9-14900HX • RTX 4090 16GB • 64GB DDR5 • 2TB Gen4 SSD • 240Hz QHD+ ეკრანი\n\n• **Titan X1 Cyber Rig Desktop** — **$3,299** (~8,973 ₾)\n  - წყლის გაგრილება, RTX 4090 24GB, 64GB RGB ოპერატიული, 4TB SSD\n\nორივე მოწყობილობას მოყვება **2-წლიანი ოფიციალური გარანტია**!`;
    }
    if (query.includes('ტელეფონ') || query.includes('სმარტფონ') || query.includes('apexphone')) {
      return `📱 **ApexPhone 16 Pro Titanium Max** — **$1,299** (~3,533 ₾):\n\n• **ეკრანი**: 6.8" 120Hz ProMotion OLED Gorilla Armor მინით\n• **კამერა**: 200MP მთავარი + 50MP ულტრაფართო + 50MP 10x პერისკოპული ზუმი\n• **აკუმულატორი**: 5,500mAh და 100W სწრაფი დატენვა\n• **კორპუსი**: ტიტანიუმი Titanium Black, Cyber Neon ან Platinum ფერებში.\n• **მარაგშია თბილისის ცენტრში**: მიწოდება 18-24 საათში!`;
    }
    if (query.includes('ლუკა') || query.includes('თავაძე') || query.includes('ადმინ')) {
      return `👤 **დამფუძნებელი და ერთპიროვნული ადმინისტრატორი: ლუკა თავაძე**\n\n• **ელ.ფოსტა**: tavadzeluka520@gmail.com\n• **ტელეფონი / WhatsApp**: +995 571 78 90 🇬🇪\n• **სტანდარტები**: უკომპრომისო ხარისხი, სამხედრო დონის ტესტირება და 0% ყალბი დეტალები.`;
    }
    if (query.includes('ტელეფონის ნომერი') || query.includes('ნომერი') || query.includes('კონტაქტი') || query.includes('მიტანა')) {
      return `🇬🇪 **TechZone-ის ოპერაციები საქართველოში**:\n\n• **პირდაპირი ცხელი ხაზი**: **+995 571 78 90**\n• **სათაო ოფისი**: თბილისი, საქართველო\n• **მიწოდების დრო**: 18-24 საათი მთელ საქართველოში (თბილისი, ქუთაისი, ბათუმი და რეგიონები)\n• **ადმინისტრატორი**: ლუკა თავაძე (tavadzeluka520@gmail.com)`;
    }
  }

  // Arabic language detection
  const isArabic = /[\u0600-\u06FF]/.test(userMessage);
  if (isArabic) {
    if (query.includes('فلسطين') || query.includes('غزة') || query.includes('شحن')) {
      return `🇵🇸 **TechZone متضامنة مع فلسطين الحبيبة**:\n\n• توفر TechZone شحناً مباشراً للأجهزة الإلكترونية الأصلية إلى فلسطين بأسعار عادلة وتغليف كهرومغناطيسي واقٍ.\n• للتنسيق المباشر يمكنك التواصل مع المؤسس **لوكا تافادزي** عبر البريد **tavadzeluka520@gmail.com** أو الاتصال بالرقم **90 78 571 995+**.`;
    }
    return `⚡ **مرحباً بك في نظام الذكاء الاصطناعي لـ TECHZONE!**\n\nأنا مساعدك الذكي للأجهزة الإلكترونية الفائقة بإشراف المؤسس **لوكا تافادزي**.\n\nكيف يمكنني خدمتك اليوم؟\n• 💻 **أقوى الحواسيب المحمولة**: AeroBlade 16 i9 + RTX 4090 ($2,499)\n• 📱 **الهاتف الرائد**: ApexPhone 16 Pro Max ($1,299)\n• 🇵🇸 **شحن مباشر إلى فلسطين** مع دعم كامل\n• 🎁 **كود الخصم الفعال**: استخدم **NEON50** لخصم 50 دولاراً فوراً!`;
  }

  if (query.includes('admin') || query.includes('console') || query.includes('terminal') || query.includes('panel')) {
    return `🛡️ **TechZone Core Admin Panel (Luka Tavadze)**:\n\n• **Where to find it**:\n  1. **Top Country Bar**: Click the green **"Admin Panel"** button at the top right of the page.\n  2. **Main Navigation Header**: Click the **"Admin"** shield button next to the search and cart.\n  3. **Founder Section**: In the About Luka Tavadze card, click "Launch Sole Administrator Console".\n  4. **Footer**: Quick link in the Navigation list.\n• **Sole Administrator**: **Luka Tavadze** (\`tavadzeluka520@gmail.com\`).\n• **Capabilities**: Real-time product inventory editing, price and stock controls, order lifecycle tracking, customer database, and store reset.`;
  }

  if (query.includes('google') || query.includes('register') || query.includes('signup') || query.includes('sign up') || query.includes('registration') || query.includes('login') || query.includes('account')) {
    return `🔐 **Google Fast Registration & User Account**:\n\n• **Where to find it**:\n  1. **Top Country Bar**: Click the **"Google Register"** button at the top of the screen.\n  2. **Main Navigation Bar**: Click the white **"Google"** button beside the user icon.\n  3. **Footer**: Click "Register with Google (VIP)".\n• **VIP Perks**: Instantly earn **+500 VIP Reward Points**, 1-click checkout, express order tracking, and special promotional access!`;
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return `Greetings from **TECHZONE AI SYSTEM**! ⚡\n\nI am your 24/7 Hardware & Support Assistant for **TechZone**, curated by founder **Luka Tavadze**.\n\nHow can I assist you today?\n• 📱 **Products & Specifications** (Laptops, Phones, Monitors, GPUs)\n• 🇬🇪 **Georgia Direct Support** (+995 571 78 90)\n• 🇵🇸 **Palestine Shipping & Solidarity**\n• 🎁 **Promo Codes** (Try code **NEON50** or **TECH20**)\n• 🛡️ **2-Year Factory Warranty & Zero Dead-Pixel Policy**`;
  }

  if (query.includes('georgia') || query.includes('tbilisi') || query.includes('phone') || query.includes('number') || query.includes('hotline') || query.includes('contact') || query.includes('+995') || query.includes('call')) {
    return `🇬🇪 **Georgia TechZone Support & Operations**:\n\n• **Direct Hotline & WhatsApp**: **+995 571 78 90** (24/7 direct access)\n• **Headquarters**: Tbilisi, Georgia\n• **Delivery Time**: 18 to 24 hours nationwide across Tbilisi, Kutaisi, Batumi, and all regions.\n• **Founder Email**: tavadzeluka520@gmail.com (Luka Tavadze)\n\nYou can click the phone number in our Contact section to call directly!`;
  }

  if (query.includes('palestine') || query.includes('gaza') || query.includes('falastin') || query.includes('ramallah') || query.includes('free palestine')) {
    return `🇵🇸 **TechZone Stands With Palestine (فلسطين)**:\n\n• TechZone proudly supports our community in Palestine with **direct international tech shipping**.\n• We provide fair pricing, genuine factory-sealed electronics, and electrostatic protective shipping packaging.\n• Need custom order logistics or assistance? Email founder **Luka Tavadze** directly at **tavadzeluka520@gmail.com** or message **+995 571 78 90**.`;
  }

  if (query.includes('luka') || query.includes('founder') || query.includes('admin') || query.includes('owner') || query.includes('tavadze')) {
    return `👤 **Founder & Sole Administrator: Luka Tavadze**\n\n• **Role**: Sole Administrator & Hardware Curator of TechZone\n• **Email**: tavadzeluka520@gmail.com\n• **Phone / WhatsApp**: +995 571 78 90 🇬🇪\n• **Philosophy**: Delivering unthrottled, pristine electronics with military-grade testing and zero retail markup. Every product undergoes strict thermal and hardware verification before shipping.`;
  }

  if (query.includes('discount') || query.includes('coupon') || query.includes('promo') || query.includes('code') || query.includes('sale') || query.includes('cheap')) {
    return `🎁 **Active TechZone Promo Codes**:\n\n1. **NEON50** — $50 OFF on any order over $300\n2. **TECH20** — 20% OFF on all accessories, controllers & keyboards\n3. **FIRST15** — 15% OFF your entire first order\n4. **LUKA10** — 10% Founder Appreciation discount\n\nSimply apply these codes during checkout to instantly redeem your savings!`;
  }

  if (query.includes('laptop') || query.includes('aeroblade') || query.includes('gaming') || query.includes('pc') || query.includes('desktop') || query.includes('titan')) {
    return `💻 **Top TechZone High-Performance Computers**:\n\n• **AeroBlade 16 Gaming Laptop** — **$2,499** (Save $400)\n  - Intel Core i9-14900HX • NVIDIA RTX 4090 16GB • 64GB DDR5 • 2TB Gen4 SSD • 240Hz QHD+ Display • Vapor Chamber Cooling\n\n• **Titan X1 Cyber Rig Desktop** — **$3,299** (Save $500)\n  - Liquid Cooled i9 • RTX 4090 24GB • 64GB RGB RAM • 4TB NVMe SSD • Custom Neon Glass Chassis\n\nBoth backed by our **2-Year Official Factory Warranty** with thermal stress certification!`;
  }

  if (query.includes('phone') || query.includes('mobile') || query.includes('apexphone') || query.includes('camera') || query.includes('smartphone')) {
    return `📱 **ApexPhone 16 Pro Titanium Max** — **$1,299** (Was $1,499):\n\n• **Display**: 6.8" 120Hz ProMotion Super Retina OLED with Corning Gorilla Armor\n• **Camera**: 200MP Main + 50MP Ultra-Wide + 50MP 10x Periscope Telephoto\n• **Battery**: 5,500mAh with 100W HyperCharge (0-100% in 22 mins)\n• **Build**: Aerospace-Grade Titanium frame in Titanium Black, Cyber Neon, or Platinum White.\n• **Stock**: In Stock in Georgia Hub ready for immediate express dispatch!`;
  }

  if (query.includes('monitor') || query.includes('screen') || query.includes('oled') || query.includes('display')) {
    return `🖥️ **Quantum 49" Curved QD-OLED Monitor** — **$1,199** (Was $1,399):\n\n• **Specs**: 5120x1440 Dual QHD Ultrawide (32:9 ratio)\n• **Speed**: 240Hz Refresh Rate with ultra-fast 0.03ms response time\n• **Brightness**: HDR 1000 True Black with 99.3% DCI-P3 color gamut\n• **Guarantee**: Zero Dead-Pixel Screen Guarantee included!`;
  }

  if (query.includes('warranty') || query.includes('guarantee') || query.includes('return') || query.includes('policy')) {
    return `🛡️ **TechZone Ironclad Hardware Guarantee**:\n\n• **2-Year Official Factory Warranty** on all laptops, phones, desktops, and monitors.\n• **30-Day Hassle-Free Returns**: If you aren't completely satisfied, return within 30 days for a full refund.\n• **Zero Dead-Pixel Guarantee**: Displays screened for 100% optical perfection before shipping.\n• **Authenticity Pledge**: 100% genuine factory sealed products with verifiable serial numbers.`;
  }

  return `⚡ **TECHZONE AI SYSTEM Response**:\n\nThank you for reaching out to TechZone! As your multilingual AI Hardware Advisor, I can help you with:\n\n• **Product Recommendations & Comparisons** (ApexPhone 16 Pro, AeroBlade 16 laptop, Quantum 49" QD-OLED, Titan Desktop)\n• **Order Inquiries & Hotline**: Call our Georgia headquarters at **+995 571 78 90**\n• **Palestine 🇵🇸 Delivery Logistics & Worldwide Shipping**\n• **Promo Codes**: Use **NEON50** ($50 off) or **TECH20** (20% off accessories)\n• **Founder Assistance**: Contact Luka Tavadze at **tavadzeluka520@gmail.com**\n\nWhat specific hardware or information are you looking for today? Feel free to ask in any language!`;
}

// API Routes FIRST
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    store: 'TECHZONE',
    aiService: 'active',
    model: 'gemini-3.8-flash',
    founder: 'Luka Tavadze',
    hotline: '+995 571 78 90',
  });
});

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'A valid message string is required.' });
      return;
    }

    const ai = getGenAiClient();

    if (ai) {
      try {
        // Construct multi-turn contents format
        const formattedContents = [];

        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-8)) { // Keep last 8 turns for context
            if (item && item.text && (item.role === 'user' || item.role === 'model')) {
              formattedContents.push({
                role: item.role === 'user' ? 'user' : 'model',
                parts: [{ text: item.text }],
              });
            }
          }
        }

        // Add current user message
        formattedContents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction: TECHZONE_SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.9,
          },
        });

        const textOutput = response.text || generateSmartFallbackResponse(message);
        res.json({
          reply: textOutput,
          source: 'gemini-3.8-flash',
          timestamp: new Date().toISOString(),
        });
        return;
      } catch (geminiError: any) {
        console.warn('Gemini API query failed, falling back to TechZone hardware engine:', geminiError?.message || geminiError);
        const fallbackReply = generateSmartFallbackResponse(message);
        res.json({
          reply: fallbackReply,
          source: 'techzone-expert-engine',
          timestamp: new Date().toISOString(),
        });
        return;
      }
    }

    // If GEMINI_API_KEY is not yet attached, use the intelligent TechZone expert engine
    const reply = generateSmartFallbackResponse(message);
    res.json({
      reply,
      source: 'techzone-expert-engine',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/chat endpoint:', error);
    res.status(500).json({
      error: 'Failed to process AI chat request.',
      details: error?.message || 'Unknown error',
    });
  }
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TECHZONE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
