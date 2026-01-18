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
    serviceType?: string;
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
    serviceType: undefined as string | undefined,
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
          content: "I'm your Event Catering Assistant. I provide guidance on our catering services, event planning capabilities, and operational processes.\n\nHow can I assist you today?",
          suggestions: [
            "What catering services do you offer?",
            "Tell me about your event planning process",
            "What's your capacity for large events?",
          ],
        },
        tr: {
          content: "Etkinlik Catering Asistanınızım. Catering hizmetlerimiz, etkinlik planlama yeteneklerimiz ve operasyonel süreçlerimiz hakkında rehberlik sağlıyorum.\n\nBugün size nasıl yardımcı olabilirim?",
          suggestions: [
            "Hangi catering hizmetlerini sunuyorsunuz?",
            "Etkinlik planlama sürecinizi anlatın",
            "Büyük etkinlikler için kapasiteniz nedir?",
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
      serviceType: undefined,
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

      if (lowerContent.includes("corporate") || lowerContent.includes("kurumsal")) {
        newInterests.push("corporate events");
        newTopics.push("corporate event catering");
        setConversationMemory((prev) => ({ ...prev, serviceType: "corporate" }));
      }
      if (lowerContent.includes("wedding") || lowerContent.includes("düğün") || lowerContent.includes("nişan")) {
        newInterests.push("wedding events");
        newTopics.push("wedding catering");
        setConversationMemory((prev) => ({ ...prev, serviceType: "wedding" }));
      }
      if (lowerContent.includes("festival") || lowerContent.includes("büyük etkinlik") || lowerContent.includes("large event")) {
        newInterests.push("large events");
        newTopics.push("festival catering");
        setConversationMemory((prev) => ({ ...prev, serviceType: "festival" }));
      }
      if (lowerContent.includes("workshop") || lowerContent.includes("özel deneyim")) {
        newInterests.push("workshop events");
        newTopics.push("workshop catering");
        setConversationMemory((prev) => ({ ...prev, serviceType: "workshop" }));
      }
      if (lowerContent.includes("seminar") || lowerContent.includes("konferans") || lowerContent.includes("conference")) {
        newInterests.push("conference events");
        newTopics.push("seminar catering");
        setConversationMemory((prev) => ({ ...prev, serviceType: "seminar" }));
      }
      if (lowerContent.includes("outdoor") || lowerContent.includes("açık alan") || lowerContent.includes("aktivite")) {
        newInterests.push("outdoor events");
        newTopics.push("outdoor catering");
        setConversationMemory((prev) => ({ ...prev, serviceType: "outdoor" }));
      }
      if (lowerContent.includes("capacity") || lowerContent.includes("kapasite") || lowerContent.includes("guest count") || lowerContent.includes("misafir sayısı")) {
        newInterests.push("capacity");
        newTopics.push("event capacity");
      }
      if (lowerContent.includes("quote") || lowerContent.includes("teklif") || lowerContent.includes("pricing") || lowerContent.includes("fiyat")) {
        newInterests.push("pricing");
        newTopics.push("quotation");
      }
      if (lowerContent.includes("menu") || lowerContent.includes("menü") || lowerContent.includes("food") || lowerContent.includes("yemek")) {
        newTopics.push("menu planning");
      }
      if (lowerContent.includes("logistics") || lowerContent.includes("lojistik") || lowerContent.includes("delivery") || lowerContent.includes("teslimat")) {
        newTopics.push("logistics");
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

// Translation helper for Event Catering
const t = {
  en: {
    serviceDetail: {
      process: (serviceType: string) => ({
        content: `For ${serviceType} catering, our operational process:\n\n1. Event Planning & Requirements\n   • Detailed consultation and requirement analysis\n   • Timeline development and coordination\n   • Guest count and service flow planning\n\n2. Menu Development & Approval\n   • Custom menu design aligned with event theme\n   • Dietary considerations and approvals\n   • Presentation planning\n\n3. Production & Preparation\n   • Controlled production in dedicated facilities\n   • Quality checkpoints at each stage\n   • Temperature-controlled preparation\n\n4. Logistics & Transportation\n   • Temperature-stable transport\n   • Real-time tracking and coordination\n   • On-site delivery coordination\n\n5. On-Site Setup & Service\n   • Early arrival for staging and setup\n   • Service execution with on-site supervision\n   • Real-time adjustments and support\n\n6. Post-Event Review\n   • Service documentation\n   • Feedback collection\n   • Continuous improvement\n\nWhich stage requires more detail?`,
        suggestions: [
          "Explain menu development process",
          "What's the typical timeline?",
          "Tell me about on-site setup",
        ],
      }),
      pricing: (serviceType: string) => ({
        content: `Pricing for ${serviceType} catering depends on:\n• Guest count and event scale\n• Menu selection and customization\n• Service level and presentation requirements\n• Event duration and timing\n• Location and logistics complexity\n• Additional services (staffing, equipment, etc.)\n\nI can direct you to our quotation process. Would you like to proceed?`,
        suggestions: [
          "Yes, request a quotation",
          "What's included in the pricing?",
          "Explain payment terms",
        ],
      }),
      capacity: (serviceType: string) => ({
        content: `Our capacity for ${serviceType} events:\n• Corporate events: 20 - 500 guests\n• Wedding events: 50 - 500 guests\n• Festival events: 500 - 10,000 guests\n• Workshop events: 10 - 200 guests\n• Conference events: 50 - 1,000 attendees\n• Outdoor events: 50 - 1,000 guests\n\nWhat guest count are you planning for?`,
        suggestions: [
          "I need capacity for a large event",
          "What's the minimum guest count?",
          "Tell me about multi-venue coordination",
        ],
      }),
    },
    serviceList: {
      categories: {
        content: `Our catering service categories:\n\n• Corporate Event Catering\n  Meetings, launches, executive summits, annual meetings\n\n• Wedding & Engagement Catering\n  Wedding ceremonies, engagement parties, receptions\n\n• Festival & Large Event Catering\n  Public festivals, large celebrations, multi-day events\n\n• Workshop & Special Experience Catering\n  Curated events, brand experiences, concept-based menus\n\n• Seminar & Conference Catering\n  Professional events, multi-day conferences, continuous service\n\n• Outdoor & Activity Catering\n  Outdoor festivals, park gatherings, mobile setups\n\nWhich category aligns with your event?`,
        suggestions: [
          "Explain corporate event catering",
          "What's included in wedding catering?",
          "Tell me about festival catering",
        ],
      },
    },
    general: {
      process: {
        content: `Our event catering process:\n\n1. Event Planning & Consultation\n   • Requirement analysis and event understanding\n   • Guest count and timeline planning\n   • Service flow and coordination planning\n\n2. Menu Development & Approval\n   • Custom menu design aligned with event theme\n   • Dietary considerations and client approval\n   • Presentation and service planning\n\n3. Production & Preparation\n   • Controlled production in dedicated facilities\n   • Quality checkpoints at each stage\n   • Temperature-controlled preparation\n\n4. Logistics & Transportation\n   • Temperature-stable transport\n   • Real-time tracking and coordination\n   • On-site delivery coordination\n\n5. On-Site Setup & Service\n   • Early arrival for staging and setup\n   • Service execution with supervision\n   • Real-time adjustments and support\n\n6. Post-Event Review\n   • Service documentation and feedback\n   • Continuous improvement\n\nWhich stage requires more detail?`,
        suggestions: [
          "Explain menu development",
          "What's the planning timeline?",
          "Tell me about logistics",
        ],
      },
      services: {
        content: `We offer comprehensive catering services:\n\n• Corporate Event Catering\n  Structured service flow for business events\n\n• Wedding & Engagement Catering\n  Celebration-focused service with premium presentation\n\n• Festival & Large Event Catering\n  High-volume operations with speed and coordination\n\n• Workshop & Special Experience Catering\n  Concept-based menus and curated experiences\n\n• Seminar & Conference Catering\n  Continuous service for long-duration events\n\n• Outdoor & Activity Catering\n  Mobile setups and flexible service points\n\nWhich service interests you?`,
        suggestions: [
          "Tell me about corporate catering",
          "What's wedding catering like?",
          "Explain festival catering",
        ],
      },
      capacity: {
        content: `Our event capacity:\n• Corporate events: 20 - 500 guests\n• Wedding events: 50 - 500 guests\n• Festival events: 500 - 10,000 guests\n• Workshop events: 10 - 200 guests\n• Conference events: 50 - 1,000 attendees\n• Outdoor events: 50 - 1,000 guests\n• Multi-venue coordination available\n• Scalable operations for any size\n\nWhat guest count are you planning?`,
        suggestions: [
          "I need capacity for a large event",
          "What's the minimum guest count?",
          "Tell me about multi-venue events",
        ],
      },
      menu: {
        content: `Our menu planning approach:\n• Custom menu design aligned with event theme\n• Dietary considerations (vegetarian, vegan, allergies)\n• Presentation planning and service style\n• Tasting sessions for approval\n• Concept-based menus for special events\n• Premium presentation standards\n\nWould you like to discuss menu options?`,
        suggestions: [
          "Tell me about dietary options",
          "What menu styles do you offer?",
          "Explain the tasting process",
        ],
      },
      quote: {
        content: `To provide an accurate quotation, I'll need:\n• Event date and duration\n• Guest count\n• Event type and location\n• Service level requirements\n• Menu preferences\n• Additional services needed\n\nWould you like to request a detailed quotation?`,
        suggestions: [
          "Yes, request a quotation",
          "What information do you need?",
          "How long does quotation take?",
        ],
      },
      logistics: {
        content: `Our logistics and delivery capabilities:\n• Temperature-controlled transportation\n• Real-time tracking and coordination\n• On-site setup and staging\n• Multi-venue coordination\n• Equipment and staffing support\n• Complete documentation\n\nWhere is your event located?`,
        suggestions: [
          "Explain transportation process",
          "What about on-site setup?",
          "Do you handle equipment?",
        ],
      },
      timeline: {
        content: `Typical planning timeline:\n• Initial consultation: 1-2 days\n• Menu development: 3-5 days\n• Approval and adjustments: 2-3 days\n• Production and preparation: Event day\n• On-site setup: 2-4 hours before event\n\nFor urgent events, we can expedite the process. What's your event date?`,
        suggestions: [
          "I need faster planning",
          "What's the minimum notice?",
          "Tell me about urgent events",
        ],
      },
      quality: {
        content: `Our quality assurance:\n\n• Pre-Event\n  Menu planning, ingredient sourcing, quality verification\n\n• Production\n  Controlled production environment, quality checkpoints\n\n• Transportation\n  Temperature control, real-time monitoring\n\n• On-Site\n  Service supervision, real-time adjustments\n\n• Post-Event\n  Feedback collection, continuous improvement\n\nWe maintain strict quality standards for every event.`,
        suggestions: [
          "How do you ensure food quality?",
          "Explain your quality control process",
          "What about food safety?",
        ],
      },
      unclear: {
        content: `Could you provide more details? I can assist with:\n• Catering service categories\n• Event planning and processes\n• Capacity and guest counts\n• Menu planning and options\n• Pricing and quotations\n• Logistics and delivery\n• Timeline and scheduling`,
        suggestions: [
          "Explain your services",
          "What's your planning process?",
          "How do I request a quotation?",
        ],
      },
      clarify: {
        content: (userMessage: string) => `I understand you're asking about "${userMessage}".\n\nTo assist you effectively, could you clarify:\n• What type of event are you planning?\n• Do you need information about services, pricing, or capacity?\n• What's your guest count and event date?\n\nI can also guide you to the relevant section of our website.`,
        suggestions: [
          "Show me service categories",
          "Explain planning process",
          "I need quotation information",
        ],
      },
    },
  },
  tr: {
    serviceDetail: {
      process: (serviceType: string) => ({
        content: `${serviceType} catering için operasyonel sürecimiz:\n\n1. Etkinlik Planlama ve Gereksinimler\n   • Detaylı danışmanlık ve gereksinim analizi\n   • Zaman çizelgesi geliştirme ve koordinasyon\n   • Misafir sayısı ve servis akış planlaması\n\n2. Menü Geliştirme ve Onay\n   • Etkinlik temasına uygun özel menü tasarımı\n   • Diyetetik düşünceler ve onaylar\n   • Sunum planlaması\n\n3. Üretim ve Hazırlık\n   • Özel tesislerde kontrollü üretim\n   • Her aşamada kalite kontrol noktaları\n   • Sıcaklık kontrollü hazırlık\n\n4. Lojistik ve Taşıma\n   • Sıcaklık kontrollü taşıma\n   • Gerçek zamanlı takip ve koordinasyon\n   • Sahada teslimat koordinasyonu\n\n5. Sahada Kurulum ve Servis\n   • Staging ve kurulum için erken varış\n   • Sahada denetim ile servis uygulaması\n   • Gerçek zamanlı ayarlamalar ve destek\n\n6. Etkinlik Sonrası İnceleme\n   • Servis dokümantasyonu\n   • Geri bildirim toplama\n   • Sürekli iyileştirme\n\nHangi aşama için daha fazla detay istersiniz?`,
        suggestions: [
          "Menü geliştirme sürecini açıklayın",
          "Tipik zaman çizelgesi nedir?",
          "Sahada kurulum hakkında bilgi verin",
        ],
      }),
      pricing: (serviceType: string) => ({
        content: `${serviceType} catering için fiyatlandırma şunlara bağlıdır:\n• Misafir sayısı ve etkinlik ölçeği\n• Menü seçimi ve özelleştirme\n• Servis seviyesi ve sunum gereksinimleri\n• Etkinlik süresi ve zamanlaması\n• Lokasyon ve lojistik karmaşıklığı\n• Ek hizmetler (personel, ekipman, vb.)\n\nSizi teklif sürecimize yönlendirebilirim. Devam etmek ister misiniz?`,
        suggestions: [
          "Evet, teklif talep ediyorum",
          "Fiyatlandırmaya neler dahil?",
          "Ödeme koşullarını açıklayın",
        ],
      }),
      capacity: (serviceType: string) => ({
        content: `${serviceType} etkinlikler için kapasitemiz:\n• Kurumsal etkinlikler: 20 - 500 misafir\n• Düğün etkinlikleri: 50 - 500 misafir\n• Festival etkinlikleri: 500 - 10.000 misafir\n• Workshop etkinlikleri: 10 - 200 misafir\n• Konferans etkinlikleri: 50 - 1.000 katılımcı\n• Açık hava etkinlikleri: 50 - 1.000 misafir\n\nHangi misafir sayısını planlıyorsunuz?`,
        suggestions: [
          "Büyük etkinlik için kapasiteye ihtiyacım var",
          "Minimum misafir sayısı nedir?",
          "Çoklu mekan koordinasyonu hakkında bilgi verin",
        ],
      }),
    },
    serviceList: {
      categories: {
        content: `Catering hizmet kategorilerimiz:\n\n• Kurumsal Etkinlik Catering\n  Toplantılar, lansmanlar, yönetici zirveleri, yıllık toplantılar\n\n• Düğün & Nişan Catering\n  Düğün törenleri, nişan partileri, resepsiyonlar\n\n• Festival & Büyük Etkinlik Catering\n  Halka açık festivaller, büyük kutlamalar, çok günlü etkinlikler\n\n• Workshop & Özel Deneyim Catering\n  Küratörlü etkinlikler, marka deneyimleri, konsept bazlı menüler\n\n• Seminer & Konferans Catering\n  Profesyonel etkinlikler, çok günlü konferanslar, sürekli servis\n\n• Açık Alan & Aktivite Catering\n  Açık hava festivalleri, park toplantıları, mobil kurulumlar\n\nHangi kategori etkinliğinizle uyumlu?`,
        suggestions: [
          "Kurumsal etkinlik catering'i açıklayın",
          "Düğün catering'ine neler dahil?",
          "Festival catering hakkında bilgi verin",
        ],
      },
    },
    general: {
      process: {
        content: `Etkinlik catering sürecimiz:\n\n1. Etkinlik Planlama ve Danışmanlık\n   • Gereksinim analizi ve etkinlik anlayışı\n   • Misafir sayısı ve zaman çizelgesi planlaması\n   • Servis akışı ve koordinasyon planlaması\n\n2. Menü Geliştirme ve Onay\n   • Etkinlik temasına uygun özel menü tasarımı\n   • Diyetetik düşünceler ve müşteri onayı\n   • Sunum ve servis planlaması\n\n3. Üretim ve Hazırlık\n   • Özel tesislerde kontrollü üretim\n   • Her aşamada kalite kontrol noktaları\n   • Sıcaklık kontrollü hazırlık\n\n4. Lojistik ve Taşıma\n   • Sıcaklık kontrollü taşıma\n   • Gerçek zamanlı takip ve koordinasyon\n   • Sahada teslimat koordinasyonu\n\n5. Sahada Kurulum ve Servis\n   • Staging ve kurulum için erken varış\n   • Denetim ile servis uygulaması\n   • Gerçek zamanlı ayarlamalar ve destek\n\n6. Etkinlik Sonrası İnceleme\n   • Servis dokümantasyonu ve geri bildirim\n   • Sürekli iyileştirme\n\nHangi aşama için daha fazla detay istersiniz?`,
        suggestions: [
          "Menü geliştirmeyi açıklayın",
          "Planlama zaman çizelgesi nedir?",
          "Lojistik hakkında bilgi verin",
        ],
      },
      services: {
        content: `Kapsamlı catering hizmetleri sunuyoruz:\n\n• Kurumsal Etkinlik Catering\n  İş etkinlikleri için yapılandırılmış servis akışı\n\n• Düğün & Nişan Catering\n  Premium sunum ile kutlama odaklı servis\n\n• Festival & Büyük Etkinlik Catering\n  Hız ve koordinasyon ile yüksek hacimli operasyonlar\n\n• Workshop & Özel Deneyim Catering\n  Konsept bazlı menüler ve küratörlü deneyimler\n\n• Seminer & Konferans Catering\n  Uzun süreli etkinlikler için sürekli servis\n\n• Açık Alan & Aktivite Catering\n  Mobil kurulumlar ve esnek servis noktaları\n\nHangi hizmet ilginizi çekiyor?`,
        suggestions: [
          "Kurumsal catering hakkında bilgi verin",
          "Düğün catering'i nasıl?",
          "Festival catering'i açıklayın",
        ],
      },
      capacity: {
        content: `Etkinlik kapasitemiz:\n• Kurumsal etkinlikler: 20 - 500 misafir\n• Düğün etkinlikleri: 50 - 500 misafir\n• Festival etkinlikleri: 500 - 10.000 misafir\n• Workshop etkinlikleri: 10 - 200 misafir\n• Konferans etkinlikleri: 50 - 1.000 katılımcı\n• Açık hava etkinlikleri: 50 - 1.000 misafir\n• Çoklu mekan koordinasyonu mevcut\n• Her boyut için ölçeklenebilir operasyonlar\n\nHangi misafir sayısını planlıyorsunuz?`,
        suggestions: [
          "Büyük etkinlik için kapasiteye ihtiyacım var",
          "Minimum misafir sayısı nedir?",
          "Çoklu mekan etkinlikleri hakkında bilgi verin",
        ],
      },
      menu: {
        content: `Menü planlama yaklaşımımız:\n• Etkinlik temasına uygun özel menü tasarımı\n• Diyetetik düşünceler (vejetaryen, vegan, alerjiler)\n• Sunum planlaması ve servis stili\n• Onay için tadım seansları\n• Özel etkinlikler için konsept bazlı menüler\n• Premium sunum standartları\n\nMenü seçeneklerini tartışmak ister misiniz?`,
        suggestions: [
          "Diyetetik seçenekler hakkında bilgi verin",
          "Hangi menü stillerini sunuyorsunuz?",
          "Tadım sürecini açıklayın",
        ],
      },
      quote: {
        content: `Doğru bir teklif sağlamak için şunlara ihtiyacım var:\n• Etkinlik tarihi ve süresi\n• Misafir sayısı\n• Etkinlik türü ve lokasyon\n• Servis seviyesi gereksinimleri\n• Menü tercihleri\n• Gerekli ek hizmetler\n\nDetaylı bir teklif talep etmek ister misiniz?`,
        suggestions: [
          "Evet, teklif talep ediyorum",
          "Hangi bilgilere ihtiyacınız var?",
          "Teklif ne kadar sürer?",
        ],
      },
      logistics: {
        content: `Lojistik ve teslimat yeteneklerimiz:\n• Sıcaklık kontrollü taşıma\n• Gerçek zamanlı takip ve koordinasyon\n• Sahada kurulum ve staging\n• Çoklu mekan koordinasyonu\n• Ekipman ve personel desteği\n• Tam dokümantasyon\n\nEtkinliğiniz nerede?`,
        suggestions: [
          "Taşıma sürecini açıklayın",
          "Sahada kurulum hakkında ne dersiniz?",
          "Ekipmanı hallediyor musunuz?",
        ],
      },
      timeline: {
        content: `Tipik planlama zaman çizelgesi:\n• İlk danışmanlık: 1-2 gün\n• Menü geliştirme: 3-5 gün\n• Onay ve ayarlamalar: 2-3 gün\n• Üretim ve hazırlık: Etkinlik günü\n• Sahada kurulum: Etkinlikten 2-4 saat önce\n\nAcil etkinlikler için süreci hızlandırabiliriz. Etkinlik tarihiniz nedir?`,
        suggestions: [
          "Daha hızlı planlamaya ihtiyacım var",
          "Minimum bildirim süresi nedir?",
          "Acil etkinlikler hakkında bilgi verin",
        ],
      },
      quality: {
        content: `Kalite güvencemiz:\n\n• Etkinlik Öncesi\n  Menü planlaması, malzeme tedariki, kalite doğrulama\n\n• Üretim\n  Kontrollü üretim ortamı, kalite kontrol noktaları\n\n• Taşıma\n  Sıcaklık kontrolü, gerçek zamanlı izleme\n\n• Sahada\n  Servis denetimi, gerçek zamanlı ayarlamalar\n\n• Etkinlik Sonrası\n  Geri bildirim toplama, sürekli iyileştirme\n\nHer etkinlik için sıkı kalite standartları uyguluyoruz.`,
        suggestions: [
          "Yemek kalitesini nasıl sağlıyorsunuz?",
          "Kalite kontrol sürecinizi açıklayın",
          "Gıda güvenliği hakkında ne dersiniz?",
        ],
      },
      unclear: {
        content: `Daha fazla detay sağlayabilir misiniz? Şunlarda yardımcı olabilirim:\n• Catering hizmet kategorileri\n• Etkinlik planlama ve süreçler\n• Kapasite ve misafir sayıları\n• Menü planlama ve seçenekler\n• Fiyatlandırma ve teklifler\n• Lojistik ve teslimat\n• Zaman çizelgesi ve planlama`,
        suggestions: [
          "Hizmetlerinizi açıklayın",
          "Planlama süreciniz nedir?",
          "Nasıl teklif talep edebilirim?",
        ],
      },
      clarify: {
        content: (userMessage: string) => `"${userMessage}" hakkında sorduğunuzu anlıyorum.\n\nSize etkili bir şekilde yardımcı olabilmem için şunları netleştirebilir misiniz:\n• Hangi tür etkinlik planlıyorsunuz?\n• Hizmetler, fiyatlandırma veya kapasite hakkında bilgi mi gerekiyor?\n• Misafir sayınız ve etkinlik tarihiniz nedir?\n\nAyrıca sizi web sitemizin ilgili bölümüne yönlendirebilirim.`,
        suggestions: [
          "Hizmet kategorilerini gösterin",
          "Planlama sürecini açıklayın",
          "Teklif bilgisine ihtiyacım var",
        ],
      },
    },
  },
};

// Mock AI Response Generator for Event Catering
function generateResponse(
  userMessage: string,
  pageContext: string,
  memory: ChatbotContext["conversationMemory"],
  language: Language = "en"
): { content: string; suggestions?: string[] } {
  const lowerMessage = userMessage.toLowerCase();
  const translations = t[language];

  // Page-aware responses
  if (pageContext === "service-detail") {
    const serviceType = memory.serviceType || (language === "tr" ? "bu catering hizmeti" : "this catering service");
    
    if (lowerMessage.includes("process") || lowerMessage.includes("süreç") || lowerMessage.includes("planning") || lowerMessage.includes("planlama")) {
      return translations.serviceDetail.process(serviceType);
    }
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("quote") || lowerMessage.includes("pricing") || lowerMessage.includes("fiyat") || lowerMessage.includes("teklif")) {
      return translations.serviceDetail.pricing(serviceType);
    }
    if (lowerMessage.includes("capacity") || lowerMessage.includes("volume") || lowerMessage.includes("scale") || lowerMessage.includes("kapasite") || lowerMessage.includes("hacim") || lowerMessage.includes("guest") || lowerMessage.includes("misafir")) {
      return translations.serviceDetail.capacity(serviceType);
    }
  }

  if (pageContext === "service-list" || pageContext === "home") {
    if (lowerMessage.includes("what") || lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("category") || lowerMessage.includes("hizmet") || lowerMessage.includes("kategori") || lowerMessage.includes("ne")) {
      return translations.serviceList.categories;
    }
  }

  // General responses
  if (lowerMessage.includes("process") || lowerMessage.includes("süreç") || lowerMessage.includes("planning") || lowerMessage.includes("planlama") || (lowerMessage.includes("how") && lowerMessage.includes("work"))) {
    return translations.general.process;
  }

  if (lowerMessage.includes("service") || lowerMessage.includes("hizmet") || lowerMessage.includes("offer") || lowerMessage.includes("sunuyor")) {
    return translations.general.services;
  }

  if (lowerMessage.includes("capacity") || lowerMessage.includes("kapasite") || lowerMessage.includes("guest count") || lowerMessage.includes("misafir sayısı") || lowerMessage.includes("how many") || lowerMessage.includes("kaç")) {
    return translations.general.capacity;
  }

  if (lowerMessage.includes("menu") || lowerMessage.includes("menü") || lowerMessage.includes("food") || lowerMessage.includes("yemek") || lowerMessage.includes("meal") || lowerMessage.includes("yemek")) {
    return translations.general.menu;
  }

  if (lowerMessage.includes("quote") || lowerMessage.includes("teklif") || lowerMessage.includes("pricing") || lowerMessage.includes("fiyat") || lowerMessage.includes("cost") || lowerMessage.includes("maliyet")) {
    return translations.general.quote;
  }

  if (lowerMessage.includes("logistics") || lowerMessage.includes("lojistik") || lowerMessage.includes("delivery") || lowerMessage.includes("teslimat") || lowerMessage.includes("transport") || lowerMessage.includes("taşıma")) {
    return translations.general.logistics;
  }

  if (lowerMessage.includes("timeline") || lowerMessage.includes("zaman çizelgesi") || lowerMessage.includes("lead time") || lowerMessage.includes("süre") || lowerMessage.includes("how long") || lowerMessage.includes("ne kadar")) {
    return translations.general.timeline;
  }

  if (lowerMessage.includes("quality") || lowerMessage.includes("kalite") || lowerMessage.includes("standard") || lowerMessage.includes("standart")) {
    return translations.general.quality;
  }

  // Service-specific responses
  if (lowerMessage.includes("corporate") || lowerMessage.includes("kurumsal")) {
    return {
      content: language === "tr" 
        ? "Kurumsal etkinlik catering hizmetimiz:\n\n• Yapılandırılmış servis akışı\n• Kurumsal disiplin ve zamanında teslimat\n• Toplantılar, lansmanlar, yönetici zirveleri için\n• 20 - 500 misafir kapasitesi\n• Kurumsal seviye koordinasyon\n\nHangi kurumsal etkinlik türünü planlıyorsunuz?"
        : "Our corporate event catering service:\n\n• Structured service flow\n• Corporate discipline and on-time delivery\n• For meetings, launches, executive summits\n• 20 - 500 guest capacity\n• Corporate-level coordination\n\nWhat type of corporate event are you planning?",
      suggestions: language === "tr"
        ? ["Toplantı catering'i hakkında bilgi verin", "Lansman etkinlikleri için ne sunuyorsunuz?", "Yönetici zirveleri için kapasite nedir?"]
        : ["Tell me about meeting catering", "What do you offer for launch events?", "What's capacity for executive summits?"],
    };
  }

  if (lowerMessage.includes("wedding") || lowerMessage.includes("düğün") || lowerMessage.includes("nişan")) {
    return {
      content: language === "tr"
        ? "Düğün & Nişan catering hizmetimiz:\n\n• Misafir akış yönetimi\n• Servis koreografisi\n• Premium sunum\n• Düğün ölçeğinde operasyonlar\n• 50 - 500 misafir kapasitesi\n• Kutlama odaklı servis\n\nDüğününüz için hangi hizmetlere ihtiyacınız var?"
        : "Our wedding & engagement catering service:\n\n• Guest flow management\n• Service choreography\n• Premium presentation\n• Wedding-scale operations\n• 50 - 500 guest capacity\n• Celebration-focused service\n\nWhat services do you need for your wedding?",
      suggestions: language === "tr"
        ? ["Düğün menüsü hakkında bilgi verin", "Nişan partisi için ne sunuyorsunuz?", "Düğün kapasitesi nedir?"]
        : ["Tell me about wedding menus", "What do you offer for engagement parties?", "What's wedding capacity?"],
    };
  }

  if (lowerMessage.includes("festival") || lowerMessage.includes("büyük etkinlik") || lowerMessage.includes("large event")) {
    return {
      content: language === "tr"
        ? "Festival & Büyük Etkinlik catering hizmetimiz:\n\n• Yüksek hacimli üretim\n• Hız ve koordinasyon\n• Saha lojistiği\n• Toplu catering operasyonları\n• 500 - 10.000 misafir kapasitesi\n• Çok günlü etkinlik desteği\n\nHangi tür festival veya büyük etkinlik planlıyorsunuz?"
        : "Our festival & large event catering service:\n\n• High-volume production\n• Speed and coordination\n• Field logistics\n• Mass catering operations\n• 500 - 10,000 guest capacity\n• Multi-day event support\n\nWhat type of festival or large event are you planning?",
      suggestions: language === "tr"
        ? ["Festival menüsü hakkında bilgi verin", "Büyük etkinlikler için kapasite nedir?", "Çok günlü etkinlikler için ne sunuyorsunuz?"]
        : ["Tell me about festival menus", "What's capacity for large events?", "What do you offer for multi-day events?"],
    };
  }

  // Fallback for unclear questions
  if (lowerMessage.length < 5) {
    return translations.general.unclear;
  }

  // Default intelligent response
  return {
    content: translations.general.clarify.content(userMessage),
    suggestions: translations.general.clarify.suggestions,
  };
}
