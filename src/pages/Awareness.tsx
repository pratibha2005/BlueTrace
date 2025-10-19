// import { useEffect, useState } from 'react';
// import { Globe, Book } from 'lucide-react';
// import { awarenessAPI } from '../services/api';

// interface AwarenessContent {
//   title: string;
//   content: string;
//   category: string;
//   language: string;
// }

// export const Awareness = () => {
//   const [content, setContent] = useState<AwarenessContent[]>([]);
//   const [language, setLanguage] = useState('en');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchContent = async () => {
//       setLoading(true);
//       try {
//         const data = await awarenessAPI.getContent(language);
//         setContent(data);
//       } catch (error) {
//         console.error('Failed to fetch awareness content:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContent();
//   }, [language]);

//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'es', name: 'Español' },
//     { code: 'hi', name: 'हिंदी' },
//     { code: 'fr', name: 'Français' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-4">
//       <div className="container mx-auto max-w-6xl">
//         <div className="text-center mb-8">
//           <Globe className="w-16 h-16 text-teal-600 mx-auto mb-4" />
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Awareness Center</h1>
//           <p className="text-gray-600">Learn about sustainable transportation in your language</p>
//         </div>

//         <div className="flex justify-center mb-8">
//           <div className="bg-white rounded-xl shadow-lg p-2 inline-flex space-x-2">
//             {languages.map((lang) => (
//               <button
//                 key={lang.code}
//                 onClick={() => setLanguage(lang.code)}
//                 className={`px-6 py-2 rounded-lg font-medium transition ${
//                   language === lang.code
//                     ? 'bg-teal-600 text-white'
//                     : 'text-gray-600 hover:bg-teal-50'
//                 }`}
//               >
//                 {lang.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-12">
//             <div className="text-xl text-gray-600">Loading content...</div>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-8">
//             {content.map((item, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
//                 <div className="flex items-start mb-4">
//                   <Book className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0 mt-1" />
//                   <div>
//                     <div className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
//                       {item.category}
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 leading-relaxed">{item.content}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="mt-12 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-2xl p-8 text-center">
//           <h2 className="text-3xl font-bold mb-4">Take Action Today</h2>
//           <p className="text-lg mb-6 max-w-3xl mx-auto">
//             Small changes in your daily transportation habits can make a big difference.
//             Start tracking your emissions and discover ways to reduce your carbon footprint.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <a
//               href="/calculator"
//               className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
//             >
//               Calculate Now
//             </a>
//           </div>
//         </div>

//         <div className="mt-12 grid md:grid-cols-3 gap-6">
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//             <div className="text-4xl font-bold text-teal-600 mb-2">45%</div>
//             <p className="text-gray-600">CO₂ reduction with public transport vs driving alone</p>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//             <div className="text-4xl font-bold text-green-600 mb-2">70%</div>
//             <p className="text-gray-600">Lower emissions with electric vehicles vs petrol cars</p>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//             <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
//             <p className="text-gray-600">Fuel efficiency improvement with proper eco-driving</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };






import { useState } from 'react';
import { Play, Globe2, Leaf, Users, Award, TrendingDown } from 'lucide-react';
import SplitText from '../reactBits/SplitText';

type LanguageCode = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'pt';

type Translation = {
  heroTitle: string;
  heroSubtitle: string;
  statsVideos: string;
  statsLanguages: string;
  statsViewers: string;
  selectLanguage: string;
  selectCategory: string;
  categories: Record<string, string>;
  noVideos: string;
  tryOther: string;
  ctaTitle: string;
  ctaDescription: string;
  btnCalculator: string;
  btnLearnMore: string;
  stat1: string;
  stat2: string;
  stat3: string;
  stat4: string;
  views: string;
};

type Video = {
  id: number;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  language: 'all' | LanguageCode;
  category: 'all' | 'basics' | 'transport' | 'community' | 'success';
  duration: string;
  views: string;
};

export const Awareness = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'basics' | 'transport' | 'community' | 'success'
  >('all');

  const translations: Record<LanguageCode, Translation> = {
    en: {
      heroTitle: "Stories of Awareness",
      heroSubtitle:
        "Watch inspiring videos from around the world and learn how we can save the planet together",
      statsVideos: "Videos",
      statsLanguages: "Languages",
      statsViewers: "Viewers",
      selectLanguage: "Select Your Language",
      selectCategory: "Select Category",
      categories: {
        all: "All Topics",
        basics: "Basics",
        transport: "Transportation",
        community: "Community Efforts",
        success: "Success Stories",
      },
      noVideos: "No videos found in this category",
      tryOther: "Please select another language or topic",
      ctaTitle: "Start Today",
      ctaDescription:
        "Small changes make a big impact. Measure your carbon footprint and take meaningful steps for the environment",
      btnCalculator: "Try Calculator",
      btnLearnMore: "Learn More",
      stat1: "Emission reduction with public transport",
      stat2: "Less pollution with electric vehicles",
      stat3: "Fuel savings with eco-driving",
      stat4: "Zero emissions with cycling",
      views: "views",
    },
    hi: {
      heroTitle: "जागरूकता की कहानियाँ",
      heroSubtitle:
        "विश्वभर से प्रेरणादायक वीडियो देखें और सीखें कैसे हम मिलकर पृथ्वी को बचा सकते हैं",
      statsVideos: "वीडियो",
      statsLanguages: "भाषाएँ",
      statsViewers: "दर्शक",
      selectLanguage: "अपनी भाषा चुनें",
      selectCategory: "विषय चुनें",
      categories: {
        all: "सभी विषय",
        basics: "मूल बातें",
        transport: "परिवहन",
        community: "सामुदायिक प्रयास",
        success: "सफलता की कहानियां",
      },
      noVideos: "इस श्रेणी में कोई वीडियो नहीं मिला",
      tryOther: "कृपया अन्य भाषा या विषय चुनें",
      ctaTitle: "आज ही शुरुआत करें",
      ctaDescription:
        "छोटे बदलाव बड़ा असर डालते हैं। अपने कार्बन फुटप्रिंट को मापें और पर्यावरण के लिए सार्थक कदम उठाएं",
      btnCalculator: "कैलकुलेटर आज़माएं",
      btnLearnMore: "और जानें",
      stat1: "सार्वजनिक परिवहन से उत्सर्जन में कमी",
      stat2: "इलेक्ट्रिक वाहनों से कम प्रदूषण",
      stat3: "इको-ड्राइविंग से ईंधन की बचत",
      stat4: "साइकिलिंग से शून्य उत्सर्जन",
      views: "बार देखा गया",
    },
    es: {
      heroTitle: "Historias de Conciencia",
      heroSubtitle:
        "Mira videos inspiradores de todo el mundo y aprende cómo podemos salvar el planeta juntos",
      statsVideos: "Videos",
      statsLanguages: "Idiomas",
      statsViewers: "Espectadores",
      selectLanguage: "Selecciona tu Idioma",
      selectCategory: "Selecciona Categoría",
      categories: {
        all: "Todos los Temas",
        basics: "Conceptos Básicos",
        transport: "Transporte",
        community: "Esfuerzos Comunitarios",
        success: "Historias de Éxito",
      },
      noVideos: "No se encontraron videos en esta categoría",
      tryOther: "Por favor selecciona otro idioma o tema",
      ctaTitle: "Comienza Hoy",
      ctaDescription:
        "Pequeños cambios generan un gran impacto. Mide tu huella de carbono y toma medidas significativas para el medio ambiente",
      btnCalculator: "Probar Calculadora",
      btnLearnMore: "Aprender Más",
      stat1: "Reducción de emisiones con transporte público",
      stat2: "Menos contaminación con vehículos eléctricos",
      stat3: "Ahorro de combustible con eco-conducción",
      stat4: "Cero emisiones con ciclismo",
      views: "vistas",
    },
    fr: {
      heroTitle: "Histoires de Sensibilisation",
      heroSubtitle:
        "Regardez des vidéos inspirantes du monde entier et apprenez comment nous pouvons sauver la planète ensemble",
      statsVideos: "Vidéos",
      statsLanguages: "Langues",
      statsViewers: "Spectateurs",
      selectLanguage: "Sélectionnez Votre Langue",
      selectCategory: "Sélectionner Catégorie",
      categories: {
        all: "Tous les Sujets",
        basics: "Bases",
        transport: "Transport",
        community: "Efforts Communautaires",
        success: "Histoires de Réussite",
      },
      noVideos: "Aucune vidéo trouvée dans cette catégorie",
      tryOther: "Veuillez sélectionner une autre langue ou sujet",
      ctaTitle: "Commencez Aujourd'hui",
      ctaDescription:
        "De petits changements font une grande différence. Mesurez votre empreinte carbone et prenez des mesures significatives pour l'environnement",
      btnCalculator: "Essayer la Calculatrice",
      btnLearnMore: "En Savoir Plus",
      stat1: "Réduction des émissions avec les transports publics",
      stat2: "Moins de pollution avec les véhicules électriques",
      stat3: "Économie de carburant avec l'éco-conduite",
      stat4: "Zéro émission avec le vélo",
      views: "vues",
    },
    de: {
      heroTitle: "Geschichten des Bewusstseins",
      heroSubtitle:
        "Sehen Sie inspirierende Videos aus der ganzen Welt und lernen Sie, wie wir gemeinsam den Planeten retten können",
      statsVideos: "Videos",
      statsLanguages: "Sprachen",
      statsViewers: "Zuschauer",
      selectLanguage: "Wählen Sie Ihre Sprache",
      selectCategory: "Kategorie Wählen",
      categories: {
        all: "Alle Themen",
        basics: "Grundlagen",
        transport: "Transport",
        community: "Gemeinschaftsbemühungen",
        success: "Erfolgsgeschichten",
      },
      noVideos: "Keine Videos in dieser Kategorie gefunden",
      tryOther: "Bitte wählen Sie eine andere Sprache oder ein anderes Thema",
      ctaTitle: "Starten Sie Heute",
      ctaDescription:
        "Kleine Änderungen machen einen großen Unterschied. Messen Sie Ihren CO2-Fußabdruck und ergreifen Sie bedeutungsvolle Maßnahmen für die Umwelt",
      btnCalculator: "Rechner Ausprobieren",
      btnLearnMore: "Mehr Erfahren",
      stat1: "Emissionsreduktion mit öffentlichen Verkehrsmitteln",
      stat2: "Weniger Verschmutzung mit Elektrofahrzeugen",
      stat3: "Kraftstoffeinsparung durch Öko-Fahren",
      stat4: "Null Emissionen beim Radfahren",
      views: "Aufrufe",
    },
    pt: {
      heroTitle: "Histórias de Conscientização",
      heroSubtitle:
        "Assista vídeos inspiradores de todo o mundo e aprenda como podemos salvar o planeta juntos",
      statsVideos: "Vídeos",
      statsLanguages: "Idiomas",
      statsViewers: "Espectadores",
      selectLanguage: "Selecione Seu Idioma",
      selectCategory: "Selecionar Categoria",
      categories: {
        all: "Todos os Tópicos",
        basics: "Básico",
        transport: "Transporte",
        community: "Esforços Comunitários",
        success: "Histórias de Sucesso",
      },
      noVideos: "Nenhum vídeo encontrado nesta categoria",
      tryOther: "Por favor, selecione outro idioma ou tópico",
      ctaTitle: "Comece Hoje",
      ctaDescription:
        "Pequenas mudanças fazem um grande impacto. Meça sua pegada de carbono e tome medidas significativas para o meio ambiente",
      btnCalculator: "Experimentar Calculadora",
      btnLearnMore: "Saiba Mais",
      stat1: "Redução de emissões com transporte público",
      stat2: "Menos poluição com veículos elétricos",
      stat3: "Economia de combustível com eco-condução",
      stat4: "Zero emissões com ciclismo",
      views: "visualizações",
    },
  };

  const t: Translation = translations[selectedLanguage];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
  ];

  const videos: Video[] = [
    {
      id: 1,
      title: {
        en: 'What is Carbon Footprint?',
        hi: 'कार्बन फुटप्रिंट क्या है?',
        es: '¿Qué es la Huella de Carbono?',
        fr: "Qu'est-ce que l'Empreinte Carbone?",
        de: 'Was ist der CO2-Fußabdruck?',
        pt: 'O que é Pegada de Carbono?',
      },
      description: {
        en: 'Understand how our daily activities impact the environment',
        hi: 'समझें कैसे हमारी दैनिक गतिविधियाँ पर्यावरण को प्रभावित करती हैं',
        es: 'Comprende cómo nuestras actividades diarias impactan el medio ambiente',
        fr: 'Comprendre comment nos activités quotidiennes impactent l\'environnement',
        de: 'Verstehen Sie, wie unsere täglichen Aktivitäten die Umwelt beeinflussen',
        pt: 'Entenda como nossas atividades diárias impactam o meio ambiente',
      },
      language: 'all',
      category: 'basics',
      duration: '8:45',
      views: '2.4M',
    },
    // ... baki videos same tarah
  ];

  const filteredVideos = videos.filter(video => {
    return selectedCategory === 'all' || video.category === selectedCategory;
  });

  const icons: Record<string, typeof Globe2> = {
    all: Globe2,
    basics: Leaf,
    transport: TrendingDown,
    community: Users,
    success: Award,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="text-center mb-8 py-2">
        <SplitText
          text={t.heroTitle}
          tag="h1"
          className="text-5xl font-bold mb-4"
          splitType="chars"
          duration={0.5}
          delay={30}
          ease="power3.out"
        />
        <p className="text-xl text-emerald-50 max-w-3xl mx-auto text-gray-900">
          {t.heroSubtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-[16]">
        {/* Languages */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.selectLanguage}</h3>
          <div className="flex flex-wrap gap-3">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code as LanguageCode)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedLanguage === lang.code
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.selectCategory}</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(t.categories).map(([key, name]) => {
              const Icon = icons[key] || Globe2;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as any)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Videos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="relative bg-gradient-to-br from-emerald-400 to-teal-500 h-48 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-10" />
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {video.duration}
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {t.categories[video.category]}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {video.views} {t.views}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {video.title?.[selectedLanguage]}
                </h3>
                <p className="text-gray-600 text-sm">{video.description?.[selectedLanguage]}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <Globe2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">{t.noVideos}</p>
            <p className="text-gray-500 mt-2">{t.tryOther}</p>
          </div>
        )}
      </div>
    </div>
  );
};
