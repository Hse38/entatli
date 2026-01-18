"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
};

export type Language = "tr" | "en";

export type ChatbotContext = {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  pageContext: string;
  language: Language;
  conversationMemory: {
    interests: string[];
    productType?: string;
    mentionedTopics: string[];
  };
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  setPageContext: (context: string) => void;
  setLanguage: (lang: Language) => void;
  clearMemory: () => void;
};

const ChatbotContext = createContext<ChatbotContext | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageContext, setPageContextState] = useState("home");
  const [language, setLanguageState] = useState<Language>("en");
  const [conversationMemory, setConversationMemory] = useState({
    interests: [] as string[],
    productType: undefined as string | undefined,
    mentionedTopics: [] as string[],
  });

  const openChat = useCallback(() => {
    setIsOpen(true);
    // Restore open state from localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("chatbot-open", "true");
    }
    // Initialize with welcome message if empty
    if (messages.length === 0) {
      const welcomeMessages = {
        en: {
          content: "I'm your Textile Intelligence Assistant. I provide guidance on our textile products, production capabilities, and supply chain processes.\n\nHow can I assist you today?",
          suggestions: [
            "Explain your production process",
            "What textile categories do you offer?",
            "What are your production capacities?",
          ],
        },
        tr: {
          content: "Tekstil İstihbarat Asistanınızım. Tekstil ürünlerimiz, üretim kapasitelerimiz ve tedarik zinciri süreçlerimiz hakkında rehberlik sağlıyorum.\n\nBugün size nasıl yardımcı olabilirim?",
          suggestions: [
            "Üretim sürecinizi açıklayın",
            "Hangi tekstil kategorilerini sunuyorsunuz?",
            "Üretim kapasiteleriniz nelerdir?",
          ],
        },
      };

      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: welcomeMessages[language].content,
        timestamp: new Date(),
        suggestions: welcomeMessages[language].suggestions,
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length, language]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("chatbot-open", "false");
    }
  }, []);

  const setPageContext = useCallback((context: string) => {
    setPageContextState(context);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    // Clear messages when language changes to show new welcome message
    setMessages([]);
  }, []);

  const clearMemory = useCallback(() => {
    setConversationMemory({
      interests: [],
      productType: undefined,
      mentionedTopics: [],
    });
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Update memory based on user message
      const lowerContent = content.toLowerCase();
      const newInterests: string[] = [];
      const newTopics: string[] = [];

      if (lowerContent.includes("sustainab") || lowerContent.includes("eco") || lowerContent.includes("organic")) {
        newInterests.push("sustainability");
        newTopics.push("sustainability");
      }
      if (lowerContent.includes("bulk") || lowerContent.includes("volume") || lowerContent.includes("large-scale")) {
        newInterests.push("bulk production");
        newTopics.push("bulk production");
      }
      if (lowerContent.includes("custom") || lowerContent.includes("bespoke") || lowerContent.includes("tailored")) {
        newInterests.push("custom production");
        newTopics.push("custom production");
      }
      if (lowerContent.includes("lead time") || lowerContent.includes("timeline") || lowerContent.includes("delivery time")) {
        newInterests.push("lead time");
        newTopics.push("lead time");
      }
      if (lowerContent.includes("woven") || lowerContent.includes("weaving")) {
        setConversationMemory((prev) => ({ ...prev, productType: "woven" }));
        newTopics.push("woven textiles");
      }
      if (lowerContent.includes("knit") || lowerContent.includes("knitted") || lowerContent.includes("knitting")) {
        setConversationMemory((prev) => ({ ...prev, productType: "knitted" }));
        newTopics.push("knitted textiles");
      }
      if (lowerContent.includes("technical") || lowerContent.includes("performance")) {
        newTopics.push("technical textiles");
      }
      if (lowerContent.includes("cotton") || lowerContent.includes("polyester") || lowerContent.includes("blend")) {
        newTopics.push("fabric materials");
      }

      setConversationMemory((prev) => ({
        ...prev,
        interests: [...new Set([...prev.interests, ...newInterests])],
        mentionedTopics: [...new Set([...prev.mentionedTopics, ...newTopics])],
      }));

      // Simulate AI response delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate intelligent response based on context and memory
      const response = generateResponse(content, pageContext, conversationMemory, language);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    },
    [pageContext, conversationMemory, language]
  );

  // Restore open state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatbot-open");
      if (saved === "true") {
        setIsOpen(true);
      }
    }
  }, []);

  // Sync language with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang");
      if (stored === "tr" || stored === "en") {
        setLanguageState(stored);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", language);
    }
  }, [language]);

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        isLoading,
        pageContext,
        language,
        conversationMemory,
        openChat,
        closeChat,
        sendMessage,
        setPageContext,
        setLanguage,
        clearMemory,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within ChatbotProvider");
  }
  return context;
}

// Translation helper
const t = {
  en: {
    productDetail: {
      production: (productType: string) => ({
        content: `For ${productType}, our production process:\n\n1. Material Sourcing\n   • Fiber selection and verification\n   • Quality testing and certification\n\n2. Sampling & Prototyping\n   • Technical sample development (2-3 weeks)\n   • Quality verification\n   • Client approval process\n\n3. Bulk Production\n   • Controlled manufacturing environment\n   • Quality checkpoints at each stage\n   • Compliance verification\n\n4. Quality Control & Delivery\n   • Final inspection (AQL standards)\n   • Packaging and labeling\n   • International logistics coordination\n\nWhich stage requires more detail?`,
        suggestions: [
          "Explain quality control procedures",
          "What's the typical production timeline?",
          "Tell me about sampling requirements",
        ],
      }),
      pricing: (productType: string) => ({
        content: `Pricing for ${productType} depends on:\n• Order quantity (volume discounts apply)\n• Fabric specifications and material costs\n• Customization requirements\n• Delivery timeline and shipping method\n• Payment terms\n\nI can direct you to our quotation process. Would you like to proceed?`,
        suggestions: [
          "Yes, request a quotation",
          "What are minimum order quantities?",
          "Explain payment terms",
        ],
      }),
      capacity: (productType: string) => ({
        content: `Our production capacity for ${productType}:\n• Standard runs: 10,000 - 50,000 meters/month\n• Large-scale orders: 100,000+ meters\n• Flexible scheduling for urgent requirements\n• Multi-line production for complex orders\n\nWhat volume are you considering?`,
        suggestions: [
          "I need large-scale production",
          "What's the minimum order quantity?",
          "Tell me about production scheduling",
        ],
      }),
    },
    productList: {
      categories: {
        content: `Our textile product categories:\n\n• Woven Textiles\n  Cotton, polyester, blends, specialty weaves\n\n• Knitted Textiles\n  Jersey, interlock, rib, technical knits\n\n• Custom Textile Solutions\n  Bespoke specifications, design development\n\n• Technical Textiles\n  Performance fabrics, specialized applications\n\n• Sustainable Textiles\n  Organic cotton, recycled materials, GOTS-certified\n\nWhich category aligns with your requirements?`,
        suggestions: [
          "Explain woven textile capabilities",
          "What are technical textiles?",
          "Tell me about sustainable options",
        ],
      },
    },
    general: {
      production: {
        content: `Our textile production process:\n\n1. Consultation & Technical Design\n   • Requirement analysis\n   • Material and fiber selection\n   • Technical specification development\n\n2. Sampling & Prototyping\n   • Sample development (2-3 weeks)\n   • Quality verification and testing\n   • Client approval workflow\n\n3. Bulk Production\n   • Controlled manufacturing environment\n   • Quality checkpoints at each stage\n   • Compliance and certification verification\n\n4. Quality Control & Logistics\n   • Final inspection (AQL standards)\n   • Packaging, labeling, documentation\n   • International shipping coordination\n\nWhich stage requires more detail?`,
        suggestions: [
          "Explain quality control procedures",
          "What's the sampling timeline?",
          "Tell me about international logistics",
        ],
      },
      moq: {
        content: `Minimum order quantities by category:\n• Standard woven/knitted textiles: 1,000 meters\n• Custom designs and specifications: 2,000 meters\n• Technical textiles: 500 meters\n• Specialized or niche materials: Case-by-case evaluation\n\nFor custom production, we can discuss flexible terms based on your project requirements.`,
        suggestions: [
          "I require smaller quantities",
          "Explain bulk pricing structure",
          "Tell me about custom production terms",
        ],
      },
      sustainability: {
        content: `We offer sustainable textile solutions:\n• Organic cotton fabrics\n• Recycled polyester options\n• Eco-friendly dyeing processes\n• GOTS and OEKO-TEX certified materials\n• Carbon-neutral shipping options\n\nWould you like to explore our sustainability certifications?`,
        suggestions: [
          "Tell me about certifications",
          "What eco-friendly options do you have?",
          "How do you ensure sustainability?",
        ],
      },
      custom: {
        content: `Yes, we support custom textile production:\n\n• Fabric Selection & Sourcing\n  Material selection, fiber specification, supplier coordination\n\n• Custom Specifications\n  Color matching, weight, finish, technical parameters\n\n• Design & Pattern Development\n  Technical design, pattern development, prototyping\n\n• Sampling & Approval\n  Sample development, quality verification, approval workflow\n\n• Bulk Manufacturing\n  Production execution with quality checkpoints\n\n• Quality Control & Logistics\n  Final inspection, packaging, international shipping\n\nWhat type of customization do you require?`,
        suggestions: [
          "I need custom color matching",
          "Tell me about specification development",
          "What's the timeline for custom production?",
        ],
      },
      wovenKnit: (fabricType: string) => ({
        content: `Our ${fabricType} textile capabilities:\n\n• Material Range\n  Cotton, polyester, blends, specialty fibers\n\n• Specifications\n  Various weights, finishes, and technical parameters\n  Custom specifications available\n\n• Production\n  Quality control at every stage\n  Bulk production capacity\n  Scalable manufacturing infrastructure\n\n• Applications\n  Apparel, home textiles, technical applications\n\nWould you like to discuss specific ${fabricType} requirements or explore options?`,
        suggestions: [
          `Explain ${fabricType} material options`,
          "What are typical specifications?",
          `Tell me about custom ${fabricType} production`,
        ],
      }),
      shipping: {
        content: `Our logistics and delivery capabilities:\n• FOB and CIF shipping options\n• Major port delivery worldwide\n• Air freight for urgent orders\n• Complete documentation support\n• Real-time tracking throughout transit\n• Customs clearance assistance\n\nWhere do you require delivery? I can provide specific logistics details.`,
        suggestions: [
          "Explain shipping cost structure",
          "What are typical delivery timelines?",
          "Do you handle customs documentation?",
        ],
      },
      leadTime: {
        content: `Production lead times:\n• Sampling: 2-3 weeks\n• Standard production: 4-6 weeks from approval\n• Large-scale orders: 8-12 weeks\n• Rush orders: Available with premium pricing\n\nShipping and logistics:\n• FOB and CIF options\n• Major port delivery\n• Air freight for urgent shipments\n• Complete documentation support\n• Real-time tracking\n\nWhat's your target timeline?`,
        suggestions: [
          "I need faster delivery",
          "Tell me about shipping options",
          "What about customs clearance?",
        ],
      },
      quality: {
        content: `Our quality assurance framework:\n\n• Pre-Production\n  Material testing, fiber verification, specification validation\n\n• In-Process Control\n  Continuous quality monitoring, checkpoints at critical stages\n\n• Final Inspection\n  AQL standards (typically Level II), dimensional verification, defect analysis\n\n• Certification & Compliance\n  OEKO-TEX, GOTS (where applicable), third-party verification support\n\n• Documentation\n  Quality reports with every shipment, traceability records\n\nWe maintain strict quality standards to ensure production consistency.`,
        suggestions: [
          "What certifications do you hold?",
          "Explain your testing procedures",
          "How do you handle quality issues?",
        ],
      },
      capacity: {
        content: `Our production capacity:\n• Standard runs: 10,000 - 50,000 meters/month\n• Large-scale: 100,000+ meters\n• Multi-line production for complex orders\n• Scalable infrastructure\n\nWhat volume are you planning?`,
        suggestions: [
          "I need large-scale production",
          "What's the minimum order quantity?",
          "Explain production scheduling options",
        ],
      },
      unclear: {
        content: `Could you provide more details? I can assist with:\n• Textile product categories\n• Production processes and capabilities\n• Order quantities and pricing\n• Shipping, logistics, and lead times\n• Quality control and certifications`,
        suggestions: [
          "Explain your textile categories",
          "What's your production process?",
          "How do I request a quotation?",
        ],
      },
      clarify: {
        content: (userMessage: string) => `I understand you're asking about "${userMessage}".\n\nTo assist you effectively, could you clarify:\n• Are you interested in a specific textile category?\n• Do you need information about production capabilities or processes?\n• Are you looking for pricing, order quantities, or logistics information?\n\nI can also guide you to the relevant section of our website.`,
        suggestions: [
          "Show me textile categories",
          "Explain production capabilities",
          "I need quotation information",
        ],
      },
      fabricType: {
        content: `To provide precise information, could you clarify:\n• Are you interested in woven or knitted textiles?\n• What application or end-use are you considering?\n• Do you have specific material requirements (cotton, polyester, blends)?\n• Are you looking for standard or custom specifications?`,
        suggestions: [
          "Tell me about woven textiles",
          "Explain knitted textile options",
          "I need custom specifications",
        ],
      },
    },
    memory: {
      sustainability: {
        content: `Based on your interest in sustainability, I recommend:\n• Our organic cotton collection\n• Recycled polyester options\n• GOTS-certified fabrics\n• Eco-friendly production processes\n\nWould you like details on any of these?`,
        suggestions: [
          "Tell me about organic cotton",
          "What are GOTS certifications?",
          "Show me sustainable options",
        ],
      },
    },
  },
  tr: {
    productDetail: {
      production: (productType: string) => ({
        content: `${productType} için üretim sürecimiz:\n\n1. Malzeme Tedariki\n   • Lif seçimi ve doğrulama\n   • Kalite testi ve sertifikasyon\n\n2. Örnekleme ve Prototipleme\n   • Teknik numune geliştirme (2-3 hafta)\n   • Kalite doğrulama\n   • Müşteri onay süreci\n\n3. Toplu Üretim\n   • Kontrollü üretim ortamı\n   • Her aşamada kalite kontrol noktaları\n   • Uyumluluk doğrulama\n\n4. Kalite Kontrolü ve Teslimat\n   • Final muayene (AQL standartları)\n   • Ambalajlama ve etiketleme\n   • Uluslararası lojistik koordinasyonu\n\nHangi aşama için daha fazla detay istersiniz?`,
        suggestions: [
          "Kalite kontrol prosedürlerini açıklayın",
          "Tipik üretim zaman çizelgesi nedir?",
          "Örnekleme gereksinimleri hakkında bilgi verin",
        ],
      }),
      pricing: (productType: string) => ({
        content: `${productType} için fiyatlandırma şunlara bağlıdır:\n• Sipariş miktarı (hacim indirimleri geçerlidir)\n• Kumaş özellikleri ve malzeme maliyetleri\n• Özelleştirme gereksinimleri\n• Teslimat zaman çizelgesi ve nakliye yöntemi\n• Ödeme koşulları\n\nSizi teklif sürecimize yönlendirebilirim. Devam etmek ister misiniz?`,
        suggestions: [
          "Evet, teklif talep ediyorum",
          "Minimum sipariş miktarları nedir?",
          "Ödeme koşullarını açıklayın",
        ],
      }),
      capacity: (productType: string) => ({
        content: `${productType} için üretim kapasitemiz:\n• Standart üretim: Ayda 10.000 - 50.000 metre\n• Büyük ölçekli siparişler: 100.000+ metre\n• Acil gereksinimler için esnek planlama\n• Karmaşık siparişler için çoklu hat üretimi\n\nHangi hacmi düşünüyorsunuz?`,
        suggestions: [
          "Büyük ölçekli üretime ihtiyacım var",
          "Minimum sipariş miktarı nedir?",
          "Üretim planlaması hakkında bilgi verin",
        ],
      }),
    },
    productList: {
      categories: {
        content: `Tekstil ürün kategorilerimiz:\n\n• Dokuma Tekstiller\n  Pamuk, polyester, karışımlar, özel dokumalar\n\n• Örme Tekstiller\n  Jersey, interlock, rib, teknik örme\n\n• Özel Tekstil Çözümleri\n  Özel spesifikasyonlar, tasarım geliştirme\n\n• Teknik Tekstiller\n  Performans kumaşları, özel uygulamalar\n\n• Sürdürülebilir Tekstiller\n  Organik pamuk, geri dönüştürülmüş malzemeler, GOTS sertifikalı\n\nHangi kategori gereksinimlerinizle uyumlu?`,
        suggestions: [
          "Dokuma tekstil yeteneklerini açıklayın",
          "Teknik tekstiller nedir?",
          "Sürdürülebilir seçenekler hakkında bilgi verin",
        ],
      },
    },
    general: {
      production: {
        content: `Tekstil üretim sürecimiz:\n\n1. Danışmanlık ve Teknik Tasarım\n   • Gereksinim analizi\n   • Malzeme ve lif seçimi\n   • Teknik spesifikasyon geliştirme\n\n2. Örnekleme ve Prototipleme\n   • Numune geliştirme (2-3 hafta)\n   • Kalite doğrulama ve test\n   • Müşteri onay iş akışı\n\n3. Toplu Üretim\n   • Kontrollü üretim ortamı\n   • Her aşamada kalite kontrol noktaları\n   • Uyumluluk ve sertifikasyon doğrulama\n\n4. Kalite Kontrolü ve Lojistik\n   • Final muayene (AQL standartları)\n   • Ambalajlama, etiketleme, dokümantasyon\n   • Uluslararası nakliye koordinasyonu\n\nHangi aşama için daha fazla detay istersiniz?`,
        suggestions: [
          "Kalite kontrol prosedürlerini açıklayın",
          "Örnekleme zaman çizelgesi nedir?",
          "Uluslararası lojistik hakkında bilgi verin",
        ],
      },
      moq: {
        content: `Kategoriye göre minimum sipariş miktarları:\n• Standart dokuma/örme tekstiller: 1.000 metre\n• Özel tasarımlar ve spesifikasyonlar: 2.000 metre\n• Teknik tekstiller: 500 metre\n• Özel veya niş malzemeler: Duruma göre değerlendirme\n\nÖzel üretim için, proje gereksinimlerinize göre esnek koşullar tartışabiliriz.`,
        suggestions: [
          "Daha küçük miktarlara ihtiyacım var",
          "Toplu fiyatlandırma yapısını açıklayın",
          "Özel üretim koşulları hakkında bilgi verin",
        ],
      },
      sustainability: {
        content: `Sürdürülebilir tekstil çözümleri sunuyoruz:\n• Organik pamuk kumaşları\n• Geri dönüştürülmüş polyester seçenekleri\n• Çevre dostu boyama süreçleri\n• GOTS ve OEKO-TEX sertifikalı malzemeler\n• Karbon nötr nakliye seçenekleri\n\nSürdürülebilirlik sertifikalarımızı keşfetmek ister misiniz?`,
        suggestions: [
          "Sertifikalar hakkında bilgi verin",
          "Hangi çevre dostu seçenekleriniz var?",
          "Sürdürülebilirliği nasıl sağlıyorsunuz?",
        ],
      },
      custom: {
        content: `Evet, özel tekstil üretimini destekliyoruz:\n\n• Kumaş Seçimi ve Tedariki\n  Malzeme seçimi, lif spesifikasyonu, tedarikçi koordinasyonu\n\n• Özel Spesifikasyonlar\n  Renk eşleştirme, ağırlık, bitiş, teknik parametreler\n\n• Tasarım ve Desen Geliştirme\n  Teknik tasarım, desen geliştirme, prototipleme\n\n• Örnekleme ve Onay\n  Numune geliştirme, kalite doğrulama, onay iş akışı\n\n• Toplu Üretim\n  Kalite kontrol noktalarıyla üretim uygulaması\n\n• Kalite Kontrolü ve Lojistik\n  Final muayene, ambalajlama, uluslararası nakliye\n\nHangi tür özelleştirmeye ihtiyacınız var?`,
        suggestions: [
          "Özel renk eşleştirmeye ihtiyacım var",
          "Spesifikasyon geliştirme hakkında bilgi verin",
          "Özel üretim için zaman çizelgesi nedir?",
        ],
      },
      wovenKnit: (fabricType: string) => ({
        content: `${fabricType} tekstil yeteneklerimiz:\n\n• Malzeme Aralığı\n  Pamuk, polyester, karışımlar, özel lifler\n\n• Spesifikasyonlar\n  Çeşitli ağırlıklar, bitişler ve teknik parametreler\n  Özel spesifikasyonlar mevcut\n\n• Üretim\n  Her aşamada kalite kontrolü\n  Toplu üretim kapasitesi\n  Ölçeklenebilir üretim altyapısı\n\n• Uygulamalar\n  Giyim, ev tekstilleri, teknik uygulamalar\n\nBelirli ${fabricType} gereksinimlerini tartışmak veya seçenekleri keşfetmek ister misiniz?`,
        suggestions: [
          `${fabricType} malzeme seçeneklerini açıklayın`,
          "Tipik spesifikasyonlar nelerdir?",
          `Özel ${fabricType} üretimi hakkında bilgi verin`,
        ],
      }),
      shipping: {
        content: `Lojistik ve teslimat yeteneklerimiz:\n• FOB ve CIF nakliye seçenekleri\n• Dünya çapında büyük liman teslimatı\n• Acil siparişler için hava kargo\n• Tam dokümantasyon desteği\n• Transit boyunca gerçek zamanlı takip\n• Gümrük işlemleri desteği\n\nNereye teslimat gerekiyor? Spesifik lojistik detayları sağlayabilirim.`,
        suggestions: [
          "Nakliye maliyet yapısını açıklayın",
          "Tipik teslimat zaman çizelgeleri nedir?",
          "Gümrük dokümantasyonunu hallediyor musunuz?",
        ],
      },
      leadTime: {
        content: `Üretim teslim süreleri:\n• Örnekleme: 2-3 hafta\n• Standart üretim: Onaydan sonra 4-6 hafta\n• Büyük ölçekli siparişler: 8-12 hafta\n• Acele siparişler: Premium fiyatlandırma ile mevcut\n\nNakliye ve lojistik:\n• FOB ve CIF seçenekleri\n• Büyük liman teslimatı\n• Acil sevkiyatlar için hava kargo\n• Tam dokümantasyon desteği\n• Gerçek zamanlı takip\n\nHedef zaman çizelgeniz nedir?`,
        suggestions: [
          "Daha hızlı teslimata ihtiyacım var",
          "Nakliye seçenekleri hakkında bilgi verin",
          "Gümrük işlemleri hakkında ne dersiniz?",
        ],
      },
      quality: {
        content: `Kalite güvence çerçevemiz:\n\n• Üretim Öncesi\n  Malzeme testi, lif doğrulama, spesifikasyon doğrulama\n\n• Süreç İçi Kontrol\n  Sürekli kalite izleme, kritik aşamalarda kontrol noktaları\n\n• Final Muayene\n  AQL standartları (genellikle Seviye II), boyutsal doğrulama, hata analizi\n\n• Sertifikasyon ve Uyumluluk\n  OEKO-TEX, GOTS (uygulanabilir yerlerde), üçüncü taraf doğrulama desteği\n\n• Dokümantasyon\n  Her sevkiyatla kalite raporları, izlenebilirlik kayıtları\n\nÜretim tutarlılığını sağlamak için sıkı kalite standartları uyguluyoruz.`,
        suggestions: [
          "Hangi sertifikalara sahipsiniz?",
          "Test prosedürlerinizi açıklayın",
          "Kalite sorunlarını nasıl ele alıyorsunuz?",
        ],
      },
      capacity: {
        content: `Üretim kapasitemiz:\n• Standart üretim: Ayda 10.000 - 50.000 metre\n• Büyük ölçekli: 100.000+ metre\n• Karmaşık siparişler için çoklu hat üretimi\n• Ölçeklenebilir altyapı\n\nHangi hacmi planlıyorsunuz?`,
        suggestions: [
          "Büyük ölçekli üretime ihtiyacım var",
          "Minimum sipariş miktarı nedir?",
          "Üretim planlama seçeneklerini açıklayın",
        ],
      },
      unclear: {
        content: `Daha fazla detay sağlayabilir misiniz? Şunlarda yardımcı olabilirim:\n• Tekstil ürün kategorileri\n• Üretim süreçleri ve yetenekler\n• Sipariş miktarları ve fiyatlandırma\n• Nakliye, lojistik ve teslim süreleri\n• Kalite kontrolü ve sertifikalar`,
        suggestions: [
          "Tekstil kategorilerinizi açıklayın",
          "Üretim süreciniz nedir?",
          "Nasıl teklif talep edebilirim?",
        ],
      },
      clarify: {
        content: (userMessage: string) => `"${userMessage}" hakkında sorduğunuzu anlıyorum.\n\nSize etkili bir şekilde yardımcı olabilmem için şunları netleştirebilir misiniz:\n• Belirli bir tekstil kategorisiyle mi ilgileniyorsunuz?\n• Üretim yetenekleri veya süreçleri hakkında bilgi mi gerekiyor?\n• Fiyatlandırma, sipariş miktarları veya lojistik bilgisi mi arıyorsunuz?\n\nAyrıca sizi web sitemizin ilgili bölümüne yönlendirebilirim.`,
        suggestions: [
          "Tekstil kategorilerini gösterin",
          "Üretim yeteneklerini açıklayın",
          "Teklif bilgisine ihtiyacım var",
        ],
      },
      fabricType: {
        content: `Kesin bilgi sağlayabilmem için şunları netleştirebilir misiniz:\n• Dokuma mı yoksa örme tekstillerle mi ilgileniyorsunuz?\n• Hangi uygulama veya kullanım amacını düşünüyorsunuz?\n• Belirli malzeme gereksinimleriniz var mı (pamuk, polyester, karışımlar)?\n• Standart mı yoksa özel spesifikasyonlar mı arıyorsunuz?`,
        suggestions: [
          "Dokuma tekstiller hakkında bilgi verin",
          "Örme tekstil seçeneklerini açıklayın",
          "Özel spesifikasyonlara ihtiyacım var",
        ],
      },
    },
    memory: {
      sustainability: {
        content: `Sürdürülebilirlik ilginize dayanarak şunları öneriyorum:\n• Organik pamuk koleksiyonumuz\n• Geri dönüştürülmüş polyester seçenekleri\n• GOTS sertifikalı kumaşlar\n• Çevre dostu üretim süreçleri\n\nBunlardan herhangi biri hakkında detay ister misiniz?`,
        suggestions: [
          "Organik pamuk hakkında bilgi verin",
          "GOTS sertifikaları nedir?",
          "Sürdürülebilir seçenekleri gösterin",
        ],
      },
    },
  },
};

// Mock AI Response Generator
function generateResponse(
  userMessage: string,
  pageContext: string,
  memory: ChatbotContext["conversationMemory"],
  language: Language = "en"
): { content: string; suggestions?: string[] } {
  const lowerMessage = userMessage.toLowerCase();
  const translations = t[language];

  // Page-aware responses
  if (pageContext === "product-detail") {
    const productType = memory.productType || (language === "tr" ? "bu tekstil kategorisi" : "this textile category");
    
    if (lowerMessage.includes("production") || lowerMessage.includes("process") || lowerMessage.includes("manufacturing") || lowerMessage.includes("üretim") || lowerMessage.includes("süreç")) {
      return translations.productDetail.production(productType);
    }
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("quote") || lowerMessage.includes("pricing") || lowerMessage.includes("fiyat") || lowerMessage.includes("teklif")) {
      return translations.productDetail.pricing(productType);
    }
    if (lowerMessage.includes("capacity") || lowerMessage.includes("volume") || lowerMessage.includes("scale") || lowerMessage.includes("kapasite") || lowerMessage.includes("hacim")) {
      return translations.productDetail.capacity(productType);
    }
  }

  if (pageContext === "product-list") {
    if (lowerMessage.includes("what") || lowerMessage.includes("product") || lowerMessage.includes("offer") || lowerMessage.includes("category") || lowerMessage.includes("ürün") || lowerMessage.includes("kategori")) {
      return translations.productList.categories;
    }
  }

  // General responses
  if (lowerMessage.includes("process") || lowerMessage.includes("production") || lowerMessage.includes("manufacturing") || (lowerMessage.includes("how") && lowerMessage.includes("produce"))) {
    return {
      content: `Our textile production process:\n\n1. Consultation & Technical Design\n   • Requirement analysis\n   • Material and fiber selection\n   • Technical specification development\n\n2. Sampling & Prototyping\n   • Sample development (2-3 weeks)\n   • Quality verification and testing\n   • Client approval workflow\n\n3. Bulk Production\n   • Controlled manufacturing environment\n   • Quality checkpoints at each stage\n   • Compliance and certification verification\n\n4. Quality Control & Logistics\n   • Final inspection (AQL standards)\n   • Packaging, labeling, documentation\n   • International shipping coordination\n\nWhich stage requires more detail?`,
      suggestions: [
        "Explain quality control procedures",
        "What's the sampling timeline?",
        "Tell me about international logistics",
      ],
    };
  }

  if (lowerMessage.includes("minimum") || lowerMessage.includes("moq") || lowerMessage.includes("quantity") || lowerMessage.includes("order quantity")) {
    return {
      content: `Minimum order quantities by category:\n• Standard woven/knitted textiles: 1,000 meters\n• Custom designs and specifications: 2,000 meters\n• Technical textiles: 500 meters\n• Specialized or niche materials: Case-by-case evaluation\n\nFor custom production, we can discuss flexible terms based on your project requirements.`,
      suggestions: [
        "I require smaller quantities",
        "Explain bulk pricing structure",
        "Tell me about custom production terms",
      ],
    };
  }

  if (lowerMessage.includes("sustainab") || lowerMessage.includes("eco") || lowerMessage.includes("organic")) {
    return {
      content: `We offer sustainable textile solutions:\n• Organic cotton fabrics\n• Recycled polyester options\n• Eco-friendly dyeing processes\n• GOTS and OEKO-TEX certified materials\n• Carbon-neutral shipping options\n\nWould you like to explore our sustainability certifications?`,
      suggestions: [
        "Tell me about certifications",
        "What eco-friendly options do you have?",
        "How do you ensure sustainability?",
      ],
    };
  }

  if (lowerMessage.includes("custom") || lowerMessage.includes("bespoke") || lowerMessage.includes("tailored")) {
    return {
      content: `Yes, we support custom textile production:\n\n• Fabric Selection & Sourcing\n  Material selection, fiber specification, supplier coordination\n\n• Custom Specifications\n  Color matching, weight, finish, technical parameters\n\n• Design & Pattern Development\n  Technical design, pattern development, prototyping\n\n• Sampling & Approval\n  Sample development, quality verification, approval workflow\n\n• Bulk Manufacturing\n  Production execution with quality checkpoints\n\n• Quality Control & Logistics\n  Final inspection, packaging, international shipping\n\nWhat type of customization do you require?`,
      suggestions: [
        "I need custom color matching",
        "Tell me about specification development",
        "What's the timeline for custom production?",
      ],
    };
  }

  if (lowerMessage.includes("woven") || lowerMessage.includes("weaving") || lowerMessage.includes("knit") || lowerMessage.includes("knitted") || lowerMessage.includes("knitting")) {
    const fabricType = lowerMessage.includes("woven") || lowerMessage.includes("weaving") ? "woven" : "knitted";
    return {
      content: `Our ${fabricType} textile capabilities:\n\n• Material Range\n  Cotton, polyester, blends, specialty fibers\n\n• Specifications\n  Various weights, finishes, and technical parameters\n  Custom specifications available\n\n• Production\n  Quality control at every stage\n  Bulk production capacity\n  Scalable manufacturing infrastructure\n\n• Applications\n  Apparel, home textiles, technical applications\n\nWould you like to discuss specific ${fabricType} requirements or explore options?`,
      suggestions: [
        `Explain ${fabricType} material options`,
        "What are typical specifications?",
        "Tell me about custom ${fabricType} production",
      ],
    };
  }

  if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery") || lowerMessage.includes("logistics") || lowerMessage.includes("nakliye") || lowerMessage.includes("teslimat") || lowerMessage.includes("lojistik")) {
    const hasLeadTime = lowerMessage.includes("lead time") || lowerMessage.includes("teslim süresi") || (lowerMessage.includes("how") && lowerMessage.includes("long")) || (lowerMessage.includes("ne") && lowerMessage.includes("kadar"));
    
    if (hasLeadTime) {
      return translations.general.leadTime;
    }
    
    return translations.general.shipping;
  }

  if (lowerMessage.includes("quality") || lowerMessage.includes("qc") || lowerMessage.includes("inspection") || lowerMessage.includes("certification") || lowerMessage.includes("kalite") || lowerMessage.includes("sertifika")) {
    return translations.general.quality;
  }

  // Memory-aware responses
  if (memory.interests.includes("sustainability") && (lowerMessage.includes("product") || lowerMessage.includes("ürün"))) {
    return translations.memory.sustainability;
  }

  // Capacity and scale questions
  if (lowerMessage.includes("capacity") || lowerMessage.includes("can you produce") || lowerMessage.includes("maximum") || lowerMessage.includes("kapasite") || lowerMessage.includes("maksimum")) {
    return translations.general.capacity;
  }

  // Fallback for unclear questions
  if (lowerMessage.length < 5) {
    return translations.general.unclear;
  }

  // Clarifying questions for ambiguous input
  if (lowerMessage.includes("fabric") || lowerMessage.includes("textile") || lowerMessage.includes("material") || lowerMessage.includes("kumaş") || lowerMessage.includes("tekstil") || lowerMessage.includes("malzeme")) {
    return translations.general.fabricType;
  }

  // Default intelligent response
  return {
    content: translations.general.clarify.content(userMessage),
    suggestions: translations.general.clarify.suggestions,
  };
}
