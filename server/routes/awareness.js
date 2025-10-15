const express = require('express');

const router = express.Router();

const awarenessContent = {
  en: [
    {
      title: 'Benefits of Electric Vehicles',
      content: 'Electric vehicles produce zero tailpipe emissions and are up to 3 times more energy-efficient than traditional combustion engines. By switching to an EV, you can reduce your carbon footprint by up to 70%.',
      category: 'Electric Vehicles',
      language: 'English'
    },
    {
      title: 'The Power of Public Transport',
      content: 'A single bus can replace up to 40 cars on the road. Using public transportation reduces CO₂ emissions by 45% per passenger compared to driving alone. It also helps reduce traffic congestion and air pollution.',
      category: 'Public Transport',
      language: 'English'
    },
    {
      title: 'Eco-Driving Tips',
      content: 'Simple habits like maintaining steady speeds, avoiding rapid acceleration, and reducing idle time can improve fuel efficiency by 15-30%. Regular vehicle maintenance also plays a crucial role in reducing emissions.',
      category: 'Eco-Driving',
      language: 'English'
    }
  ],
  es: [
    {
      title: 'Beneficios de los Vehículos Eléctricos',
      content: 'Los vehículos eléctricos no producen emisiones de escape y son hasta 3 veces más eficientes energéticamente que los motores de combustión tradicionales. Al cambiar a un vehículo eléctrico, puede reducir su huella de carbono hasta en un 70%.',
      category: 'Vehículos Eléctricos',
      language: 'Spanish'
    },
    {
      title: 'El Poder del Transporte Público',
      content: 'Un solo autobús puede reemplazar hasta 40 automóviles en la carretera. El uso del transporte público reduce las emisiones de CO₂ en un 45% por pasajero en comparación con conducir solo.',
      category: 'Transporte Público',
      language: 'Spanish'
    }
  ],
  hi: [
    {
      title: 'इलेक्ट्रिक वाहनों के लाभ',
      content: 'इलेक्ट्रिक वाहन शून्य टेलपाइप उत्सर्जन उत्पन्न करते हैं और पारंपरिक दहन इंजनों की तुलना में 3 गुना अधिक ऊर्जा-कुशल हैं। ईवी पर स्विच करके, आप अपने कार्बन फुटप्रिंट को 70% तक कम कर सकते हैं।',
      category: 'इलेक्ट्रिक वाहन',
      language: 'Hindi'
    },
    {
      title: 'सार्वजनिक परिवहन की शक्ति',
      content: 'एक बस सड़क पर 40 कारों को बदल सकती है। सार्वजनिक परिवहन का उपयोग अकेले ड्राइविंग की तुलना में प्रति यात्री CO₂ उत्सर्जन को 45% तक कम करता है।',
      category: 'सार्वजनिक परिवहन',
      language: 'Hindi'
    }
  ],
  fr: [
    {
      title: 'Avantages des Véhicules Électriques',
      content: 'Les véhicules électriques ne produisent aucune émission d\'échappement et sont jusqu\'à 3 fois plus efficaces énergétiquement que les moteurs à combustion traditionnels. En passant à un VE, vous pouvez réduire votre empreinte carbone jusqu\'à 70%.',
      category: 'Véhicules Électriques',
      language: 'French'
    }
  ]
};

router.get('/', (req, res) => {
  const { language = 'en' } = req.query;
  const content = awarenessContent[language] || awarenessContent.en;
  res.json(content);
});

router.get('/all', (req, res) => {
  const allContent = Object.values(awarenessContent).flat();
  res.json(allContent);
});

module.exports = router;
