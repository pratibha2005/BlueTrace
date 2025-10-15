import { useEffect, useState } from 'react';
import { Globe, Book } from 'lucide-react';
import { awarenessAPI } from '../services/api';

interface AwarenessContent {
  title: string;
  content: string;
  category: string;
  language: string;
}

export const Awareness = () => {
  const [content, setContent] = useState<AwarenessContent[]>([]);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const data = await awarenessAPI.getContent(language);
        setContent(data);
      } catch (error) {
        console.error('Failed to fetch awareness content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <Globe className="w-16 h-16 text-teal-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Awareness Center</h1>
          <p className="text-gray-600">Learn about sustainable transportation in your language</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex space-x-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  language === lang.code
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:bg-teal-50'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading content...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {content.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="flex items-start mb-4">
                  <Book className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {item.category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Take Action Today</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Small changes in your daily transportation habits can make a big difference.
            Start tracking your emissions and discover ways to reduce your carbon footprint.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/calculator"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Calculate Now
            </a>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">45%</div>
            <p className="text-gray-600">CO₂ reduction with public transport vs driving alone</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">70%</div>
            <p className="text-gray-600">Lower emissions with electric vehicles vs petrol cars</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
            <p className="text-gray-600">Fuel efficiency improvement with proper eco-driving</p>
          </div>
        </div>
      </div>
    </div>
  );
};
