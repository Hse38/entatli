export type ServiceId =
  | "corporate-dessert-logistics"
  | "high-volume-event"
  | "premium-hospitality"
  | "corporate-event-catering"
  | "wedding-engagement-catering"
  | "festival-large-event-catering"
  | "workshop-special-experience-catering"
  | "seminar-conference-catering"
  | "outdoor-activity-catering";

export type ServiceData = {
  id: ServiceId;
  en: {
    eyebrow: string;
    title: string;
    description: string;
    overview: {
      what: string;
      who: string;
      when: string;
    };
    highlights: string[];
    process: {
      title: string;
      description: string;
    }[];
    capacity: {
      dailyProduction: string;
      eventSize: string;
      simultaneousLocations: string;
      description: string;
    };
    useCases: {
      title: string;
      description: string;
    }[];
    differentiators: string[];
    finalCta: {
      headline: string;
      primary: string;
      secondary: string;
    };
  };
  tr: {
    eyebrow: string;
    title: string;
    description: string;
    overview: {
      what: string;
      who: string;
      when: string;
    };
    highlights: string[];
    process: {
      title: string;
      description: string;
    }[];
    capacity: {
      dailyProduction: string;
      eventSize: string;
      simultaneousLocations: string;
      description: string;
    };
    useCases: {
      title: string;
      description: string;
    }[];
    differentiators: string[];
    finalCta: {
      headline: string;
      primary: string;
      secondary: string;
    };
  };
};

export const services: ServiceData[] = [
  {
    id: "corporate-dessert-logistics",
    en: {
      eyebrow: "CORPORATE OPERATIONS",
      title: "Corporate Dessert Logistics for Large-Scale Events",
      description: "Enterprise-grade dessert logistics with controlled production, on-site coordination, and time-critical delivery for corporate organizations.",
      overview: {
        what: "A dedicated logistics service designed for corporate events requiring precise dessert delivery, controlled production windows, and on-site deployment.",
        who: "Corporate organizations, enterprise event planners, and large-scale business gatherings requiring operational reliability.",
        when: "Corporate galas, executive summits, product launches, annual meetings, and high-stakes business events where precision matters.",
      },
      highlights: [
        "Controlled production windows",
        "On-site coordination teams",
        "Time-critical delivery protocols",
        "Multi-location execution",
        "Corporate-level reporting",
      ],
      process: [
        {
          title: "Planning & Requirement Analysis",
          description: "Detailed consultation, timeline development, and operational requirement mapping.",
        },
        {
          title: "Production & Preparation",
          description: "Controlled production in dedicated facilities with quality checkpoints at each stage.",
        },
        {
          title: "Logistics & Transportation",
          description: "Temperature-stable transport with real-time tracking and contingency routing.",
        },
        {
          title: "On-Site Setup",
          description: "Dedicated field teams arrive early for staging, presentation, and service preparation.",
        },
        {
          title: "Service Execution",
          description: "Coordinated service delivery with on-site supervision and real-time adjustments.",
        },
        {
          title: "Quality Control & Wrap-Up",
          description: "Post-service verification, documentation, and structured feedback collection.",
        },
      ],
      capacity: {
        dailyProduction: "5,000+ servings",
        eventSize: "50 - 5,000 guests",
        simultaneousLocations: "Up to 10 venues",
        description: "This service is designed for high-volume, time-critical operations requiring operational discipline and predictable outcomes.",
      },
      useCases: [
        {
          title: "Corporate Events",
          description: "Annual meetings, product launches, and executive gatherings requiring flawless execution.",
        },
        {
          title: "Public Festivals",
          description: "Large-scale public events with multiple service points and high guest volumes.",
        },
        {
          title: "VIP Receptions",
          description: "Exclusive corporate receptions where presentation and timing are critical.",
        },
        {
          title: "Multi-Day Organizations",
          description: "Extended events requiring consistent service quality across multiple days and locations.",
        },
      ],
      differentiators: [
        "Risk-controlled workflows with documented checkpoints",
        "Experienced field teams with corporate event expertise",
        "Predictable delivery timelines with real-time tracking",
        "Corporate-level reporting and coordination protocols",
        "Backup inventory and contingency planning",
      ],
      finalCta: {
        headline: "If your event requires precision, this service is built for it.",
        primary: "Get in Touch",
        secondary: "Contact Our Team",
      },
    },
    tr: {
      eyebrow: "KURUMSAL OPERASYONLAR",
      title: "Büyük Ölçekli Etkinlikler için Kurumsal Tatlı Lojistiği",
      description: "Kontrollü üretim, sahada koordinasyon ve zaman kritik teslimat ile kurumsal seviyede tatlı lojistiği.",
      overview: {
        what: "Kurumsal etkinlikler için tasarlanmış, hassas tatlı teslimatı, kontrollü üretim pencereleri ve sahada kurulum sağlayan özel lojistik hizmeti.",
        who: "Operasyonel güvenilirlik gerektiren kurumsal organizasyonlar, kurumsal etkinlik planlayıcıları ve büyük ölçekli iş toplantıları.",
        when: "Hassasiyetin önemli olduğu kurumsal galalar, yönetici zirveleri, ürün lansmanları, yıllık toplantılar ve yüksek riskli iş etkinlikleri.",
      },
      highlights: [
        "Kontrollü üretim pencereleri",
        "Sahada koordinasyon ekipleri",
        "Zaman kritik teslimat protokolleri",
        "Çoklu lokasyon uygulaması",
        "Kurumsal seviye raporlama",
      ],
      process: [
        {
          title: "Planlama ve Gereksinim Analizi",
          description: "Detaylı danışmanlık, zaman çizelgesi geliştirme ve operasyonel gereksinim haritalama.",
        },
        {
          title: "Üretim ve Hazırlık",
          description: "Her aşamada kalite kontrol noktaları ile özel tesislerde kontrollü üretim.",
        },
        {
          title: "Lojistik ve Taşıma",
          description: "Gerçek zamanlı takip ve yedek rota ile sıcaklık kontrollü taşıma.",
        },
        {
          title: "Sahada Kurulum",
          description: "Staging, sunum ve servis hazırlığı için özel saha ekipleri erken gelir.",
        },
        {
          title: "Servis Uygulaması",
          description: "Sahada denetim ve gerçek zamanlı ayarlamalarla koordineli servis teslimatı.",
        },
        {
          title: "Kalite Kontrolü ve Kapanış",
          description: "Servis sonrası doğrulama, dokümantasyon ve yapılandırılmış geri bildirim toplama.",
        },
      ],
      capacity: {
        dailyProduction: "5.000+ porsiyon",
        eventSize: "50 - 5.000 misafir",
        simultaneousLocations: "10'a kadar mekan",
        description: "Bu hizmet, operasyonel disiplin ve öngörülebilir sonuçlar gerektiren yüksek hacimli, zaman kritik operasyonlar için tasarlanmıştır.",
      },
      useCases: [
        {
          title: "Kurumsal Etkinlikler",
          description: "Kusursuz uygulama gerektiren yıllık toplantılar, ürün lansmanları ve yönetici toplantıları.",
        },
        {
          title: "Halka Açık Festivaller",
          description: "Çoklu servis noktaları ve yüksek misafir hacimleri ile büyük ölçekli halka açık etkinlikler.",
        },
        {
          title: "VIP Resepsiyonlar",
          description: "Sunum ve zamanlamanın kritik olduğu özel kurumsal resepsiyonlar.",
        },
        {
          title: "Çok Günlü Organizasyonlar",
          description: "Birden fazla gün ve lokasyonda tutarlı servis kalitesi gerektiren uzun süreli etkinlikler.",
        },
      ],
      differentiators: [
        "Dokümante edilmiş kontrol noktaları ile risk kontrollü iş akışları",
        "Kurumsal etkinlik uzmanlığına sahip deneyimli saha ekipleri",
        "Gerçek zamanlı takip ile öngörülebilir teslimat zaman çizelgeleri",
        "Kurumsal seviye raporlama ve koordinasyon protokolleri",
        "Yedek envanter ve acil durum planlaması",
      ],
      finalCta: {
        headline: "Etkinliğiniz hassasiyet gerektiriyorsa, bu hizmet bunun için tasarlandı.",
        primary: "İletişime Geçin",
        secondary: "Ekibimizle İletişime Geçin",
      },
    },
  },
  {
    id: "high-volume-event",
    en: {
      eyebrow: "HIGH-CAPACITY OPERATIONS",
      title: "High-Volume Event Execution",
      description: "Multi-venue coordination with temperature-stable transport and zero-compromise presentation for large-scale events.",
      overview: {
        what: "A scalable logistics solution for events requiring simultaneous service across multiple venues with coordinated delivery and consistent quality.",
        who: "Event organizers managing festivals, conferences, and large-scale public gatherings with complex logistics requirements.",
        when: "Public festivals, multi-venue conferences, large-scale celebrations, and events requiring synchronized service delivery.",
      },
      highlights: [
        "Multi-venue coordination",
        "Temperature-stable transport",
        "Synchronized delivery schedules",
        "High-capacity staging",
        "Real-time logistics tracking",
      ],
      process: [
        {
          title: "Multi-Venue Planning",
          description: "Comprehensive logistics mapping across all venues with synchronized timelines.",
        },
        {
          title: "Production Scaling",
          description: "High-volume production with quality control maintained at scale.",
        },
        {
        title: "Coordinated Transportation",
          description: "Fleet coordination with temperature control and real-time routing adjustments.",
        },
        {
          title: "Staging & Setup",
          description: "Parallel setup across venues with dedicated teams at each location.",
        },
        {
          title: "Synchronized Service",
          description: "Coordinated service delivery across all venues with central oversight.",
        },
        {
          title: "Post-Event Analysis",
          description: "Comprehensive reporting and performance analysis across all service points.",
        },
      ],
      capacity: {
        dailyProduction: "10,000+ servings",
        eventSize: "500 - 10,000 guests",
        simultaneousLocations: "Up to 20 venues",
        description: "Designed for events requiring high-volume production and multi-location coordination with operational precision.",
      },
      useCases: [
        {
          title: "Public Festivals",
          description: "Large-scale public events with multiple service points and high guest volumes.",
        },
        {
          title: "Multi-Venue Conferences",
          description: "Corporate or public conferences spanning multiple locations with synchronized service.",
        },
        {
          title: "Celebrations & Galas",
          description: "Large celebrations requiring consistent service quality across multiple venues.",
        },
        {
          title: "Cultural Events",
          description: "Cultural festivals and events with distributed service requirements.",
        },
      ],
      differentiators: [
        "Multi-venue coordination with central oversight",
        "Scalable production capacity without quality compromise",
        "Real-time logistics tracking across all locations",
        "Experienced teams trained for high-volume operations",
        "Redundant systems for critical event support",
      ],
      finalCta: {
        headline: "For events that demand scale and precision, this service delivers both.",
        primary: "Get in Touch",
        secondary: "Contact Our Team",
      },
    },
    tr: {
      eyebrow: "YÜKSEK KAPASİTELİ OPERASYONLAR",
      title: "Yüksek Hacimli Etkinlik Yönetimi",
      description: "Sıcaklık kontrollü taşıma ve kusursuz sunum ile çoklu mekan koordinasyonu.",
      overview: {
        what: "Koordineli teslimat ve tutarlı kalite ile birden fazla mekanda eşzamanlı servis gerektiren etkinlikler için ölçeklenebilir lojistik çözümü.",
        who: "Karmaşık lojistik gereksinimleri olan festivaller, konferanslar ve büyük ölçekli halka açık toplantıları yöneten etkinlik organizatörleri.",
        when: "Halka açık festivaller, çoklu mekan konferansları, büyük ölçekli kutlamalar ve senkronize servis teslimatı gerektiren etkinlikler.",
      },
      highlights: [
        "Çoklu mekan koordinasyonu",
        "Sıcaklık kontrollü taşıma",
        "Senkronize teslimat planları",
        "Yüksek kapasiteli planlama",
        "Gerçek zamanlı lojistik takibi",
      ],
      process: [
        {
          title: "Çoklu Mekan Planlaması",
          description: "Tüm mekanlarda senkronize zaman çizelgeleri ile kapsamlı lojistik haritalama.",
        },
        {
          title: "Üretim Ölçeklendirme",
          description: "Ölçekte kalite kontrolü korunarak yüksek hacimli üretim.",
        },
        {
          title: "Koordineli Taşıma",
          description: "Sıcaklık kontrolü ve gerçek zamanlı rota ayarlamaları ile filo koordinasyonu.",
        },
        {
          title: "Staging ve Kurulum",
          description: "Her lokasyonda özel ekiplerle mekanlar arasında paralel kurulum.",
        },
        {
          title: "Senkronize Servis",
          description: "Merkezi denetim ile tüm mekanlarda koordineli servis teslimatı.",
        },
        {
          title: "Etkinlik Sonrası Analiz",
          description: "Tüm servis noktalarında kapsamlı raporlama ve performans analizi.",
        },
      ],
      capacity: {
        dailyProduction: "10.000+ porsiyon",
        eventSize: "500 - 10.000 misafir",
        simultaneousLocations: "20'ye kadar mekan",
        description: "Yüksek hacimli üretim ve operasyonel hassasiyet ile çoklu lokasyon koordinasyonu gerektiren etkinlikler için tasarlanmıştır.",
      },
      useCases: [
        {
          title: "Halka Açık Festivaller",
          description: "Çoklu servis noktaları ve yüksek misafir hacimleri ile büyük ölçekli halka açık etkinlikler.",
        },
        {
          title: "Çoklu Mekan Konferansları",
          description: "Senkronize servis ile birden fazla lokasyonu kapsayan kurumsal veya halka açık konferanslar.",
        },
        {
          title: "Kutlamalar ve Galalar",
          description: "Birden fazla mekanda tutarlı servis kalitesi gerektiren büyük kutlamalar.",
        },
        {
          title: "Kültürel Etkinlikler",
          description: "Dağıtılmış servis gereksinimleri olan kültürel festivaller ve etkinlikler.",
        },
      ],
      differentiators: [
        "Merkezi denetim ile çoklu mekan koordinasyonu",
        "Kalite ödünü olmadan ölçeklenebilir üretim kapasitesi",
        "Tüm lokasyonlarda gerçek zamanlı lojistik takibi",
        "Yüksek hacimli operasyonlar için eğitilmiş deneyimli ekipler",
        "Kritik etkinlik desteği için yedek sistemler",
      ],
      finalCta: {
        headline: "Ölçek ve hassasiyet gerektiren etkinlikler için, bu hizmet her ikisini de sağlar.",
        primary: "İletişime Geçin",
        secondary: "Ekibimizle İletişime Geçin",
      },
    },
  },
  {
    id: "premium-hospitality",
    en: {
      eyebrow: "PREMIUM HOSPITALITY",
      title: "Premium Hospitality Catering",
      description: "Luxury dessert stations, VIP guest flow management, and impeccable service choreography for exclusive events.",
      overview: {
        what: "A premium hospitality service focused on presentation, guest experience, and service choreography for exclusive and VIP events.",
        who: "Luxury event planners, VIP event organizers, and exclusive gatherings requiring elevated service standards.",
        when: "VIP receptions, exclusive corporate events, luxury celebrations, and high-profile gatherings where presentation is paramount.",
      },
      highlights: [
        "Luxury dessert stations",
        "VIP guest flow management",
        "Impeccable service choreography",
        "Premium presentation standards",
        "Dedicated hospitality teams",
      ],
      process: [
        {
          title: "Experience Design",
          description: "Custom service design focused on guest experience and presentation aesthetics.",
        },
        {
          title: "Premium Production",
          description: "Artisanal production with attention to detail and presentation quality.",
        },
        {
          title: "Service Choreography",
          description: "Detailed service flow planning with timing and presentation protocols.",
        },
        {
          title: "VIP Setup",
          description: "Premium staging and presentation setup with attention to aesthetic details.",
        },
        {
          title: "Guest Flow Management",
          description: "Coordinated service delivery with seamless guest experience management.",
        },
        {
          title: "Experience Refinement",
          description: "Post-event analysis and refinement for continuous service improvement.",
        },
      ],
      capacity: {
        dailyProduction: "2,000+ premium servings",
        eventSize: "20 - 500 VIP guests",
        simultaneousLocations: "Up to 5 premium venues",
        description: "Designed for exclusive events where presentation, service quality, and guest experience are the primary focus.",
      },
      useCases: [
        {
          title: "VIP Receptions",
          description: "Exclusive corporate receptions where presentation and timing are critical.",
        },
        {
          title: "Luxury Celebrations",
          description: "High-end celebrations requiring premium presentation and service standards.",
        },
        {
          title: "Executive Events",
          description: "Exclusive executive gatherings with elevated service expectations.",
        },
        {
          title: "Exclusive Galas",
          description: "Premium galas and exclusive events where service choreography matters.",
        },
      ],
      differentiators: [
        "Artisanal production with presentation focus",
        "Experienced hospitality teams trained for VIP service",
        "Custom service choreography for each event",
        "Premium presentation standards maintained throughout",
        "Attention to aesthetic and experiential details",
      ],
      finalCta: {
        headline: "For events where presentation and experience define success, this service delivers both.",
        primary: "Get in Touch",
        secondary: "Contact Our Team",
      },
    },
    tr: {
      eyebrow: "PREMIUM MİSAFİRPERVERLİK",
      title: "Premium Misafirperverlik Catering",
      description: "Özel etkinlikler için lüks tatlı istasyonları, VIP misafir akış yönetimi ve kusursuz servis koreografisi.",
      overview: {
        what: "Özel ve VIP etkinlikler için sunum, misafir deneyimi ve servis koreografisine odaklanan premium misafirperverlik hizmeti.",
        who: "Yüksek servis standartları gerektiren lüks etkinlik planlayıcıları, VIP etkinlik organizatörleri ve özel toplantılar.",
        when: "Sunumun en önemli olduğu VIP resepsiyonlar, özel kurumsal etkinlikler, lüks kutlamalar ve yüksek profilli toplantılar.",
      },
      highlights: [
        "Lüks tatlı istasyonları",
        "VIP misafir akış yönetimi",
        "Kusursuz servis koreografisi",
        "Premium sunum standartları",
        "Özel misafirperverlik ekipleri",
      ],
      process: [
        {
          title: "Deneyim Tasarımı",
          description: "Misafir deneyimi ve sunum estetiğine odaklanan özel servis tasarımı.",
        },
        {
          title: "Premium Üretim",
          description: "Detay ve sunum kalitesine dikkat eden zanaatkar üretim.",
        },
        {
          title: "Servis Koreografisi",
          description: "Zamanlama ve sunum protokolleri ile detaylı servis akış planlaması.",
        },
        {
          title: "VIP Kurulum",
          description: "Estetik detaylara dikkat ederek premium staging ve sunum kurulumu.",
        },
        {
          title: "Misafir Akış Yönetimi",
          description: "Kesintisiz misafir deneyimi yönetimi ile koordineli servis teslimatı.",
        },
        {
          title: "Deneyim İyileştirme",
          description: "Sürekli servis iyileştirmesi için etkinlik sonrası analiz ve iyileştirme.",
        },
      ],
      capacity: {
        dailyProduction: "2.000+ premium porsiyon",
        eventSize: "20 - 500 VIP misafir",
        simultaneousLocations: "5'e kadar premium mekan",
        description: "Sunum, servis kalitesi ve misafir deneyiminin birincil odak olduğu özel etkinlikler için tasarlanmıştır.",
      },
      useCases: [
        {
          title: "VIP Resepsiyonlar",
          description: "Sunum ve zamanlamanın kritik olduğu özel kurumsal resepsiyonlar.",
        },
        {
          title: "Lüks Kutlamalar",
          description: "Premium sunum ve servis standartları gerektiren yüksek kaliteli kutlamalar.",
        },
        {
          title: "Yönetici Etkinlikleri",
          description: "Yüksek servis beklentileri olan özel yönetici toplantıları.",
        },
        {
          title: "Özel Galalar",
          description: "Servis koreografisinin önemli olduğu premium galalar ve özel etkinlikler.",
        },
      ],
      differentiators: [
        "Sunum odaklı zanaatkar üretim",
        "VIP servisi için eğitilmiş deneyimli misafirperverlik ekipleri",
        "Her etkinlik için özel servis koreografisi",
        "Baştan sona korunan premium sunum standartları",
        "Estetik ve deneyimsel detaylara dikkat",
      ],
      finalCta: {
        headline: "Sunum ve deneyimin başarıyı tanımladığı etkinlikler için, bu hizmet her ikisini de sağlar.",
        primary: "İletişime Geçin",
        secondary: "Ekibimizle İletişime Geçin",
      },
    },
  },
  {
    id: "corporate-event-catering",
    en: {
      eyebrow: "CORPORATE EVENT CATERING",
      title: "Corporate Event Catering",
      description: "Planned service flow, corporate discipline, and on-time catering for meetings, launches, and internal corporate events.",
      overview: {
        what: "Professional event catering service designed for corporate meetings, product launches, and internal corporate events requiring structured service flow and operational discipline.",
        who: "Corporate organizations, enterprise event planners, and businesses organizing internal meetings, product launches, and corporate gatherings.",
        when: "Corporate meetings, product launches, annual meetings, executive summits, and internal corporate events where timing and service quality are critical.",
      },
      highlights: [
        "Planned service flow",
        "Corporate discipline",
        "On-time catering delivery",
        "Structured service protocols",
        "Corporate-level coordination",
      ],
      process: [
        {
          title: "Event Planning & Requirements",
          description: "Detailed consultation to understand event structure, guest count, and catering requirements.",
        },
        {
          title: "Menu Development & Approval",
          description: "Corporate-appropriate menu development with approval workflow and dietary considerations.",
        },
        {
          title: "Production & Preparation",
          description: "Controlled production with quality checkpoints ensuring corporate service standards.",
        },
        {
          title: "On-Site Setup",
          description: "Early arrival for staging, presentation setup, and service point preparation.",
        },
        {
          title: "Service Execution",
          description: "Coordinated service delivery with on-site supervision and real-time adjustments.",
        },
        {
          title: "Post-Event Review",
          description: "Service documentation and structured feedback collection for continuous improvement.",
        },
      ],
      capacity: {
        dailyProduction: "500 - 2,000 servings",
        eventSize: "20 - 500 corporate guests",
        simultaneousLocations: "Up to 5 venues",
        description: "Designed for corporate events requiring structured service flow, operational discipline, and predictable quality.",
      },
      useCases: [
        {
          title: "Corporate Meetings",
          description: "Internal corporate meetings requiring professional catering with structured service flow.",
        },
        {
          title: "Product Launches",
          description: "Corporate product launches where presentation and timing are critical.",
        },
        {
          title: "Executive Summits",
          description: "High-level executive gatherings requiring premium service standards.",
        },
        {
          title: "Annual Meetings",
          description: "Corporate annual meetings with large guest counts and structured service requirements.",
        },
      ],
      differentiators: [
        "Structured service flow with documented protocols",
        "Corporate discipline in timing and presentation",
        "On-time delivery with contingency planning",
        "Corporate-level coordination and reporting",
        "Experienced teams trained for corporate events",
      ],
      finalCta: {
        headline: "For corporate events requiring precision and discipline, this catering service delivers both.",
        primary: "Get in Touch",
        secondary: "Contact Our Team",
      },
    },
    tr: {
      eyebrow: "KURUMSAL ETKİNLİK CATERING",
      title: "Kurumsal Etkinlik Catering",
      description: "Toplantılar, lansmanlar ve kurumsal iç etkinlikler için planlı servis akışı, kurumsal disiplin ve zamanında catering.",
      overview: {
        what: "Yapılandırılmış servis akışı ve operasyonel disiplin gerektiren kurumsal toplantılar, ürün lansmanları ve kurumsal iç etkinlikler için tasarlanmış profesyonel etkinlik catering hizmeti.",
        who: "Kurumsal organizasyonlar, kurumsal etkinlik planlayıcıları ve iç toplantılar, ürün lansmanları ve kurumsal toplantılar düzenleyen işletmeler.",
        when: "Zamanlama ve servis kalitesinin kritik olduğu kurumsal toplantılar, ürün lansmanları, yıllık toplantılar, yönetici zirveleri ve kurumsal iç etkinlikler.",
      },
      highlights: [
        "Planlı servis akışı",
        "Kurumsal disiplin",
        "Zamanında catering teslimatı",
        "Yapılandırılmış servis protokolleri",
        "Kurumsal seviye koordinasyon",
      ],
      process: [
        {
          title: "Etkinlik Planlama ve Gereksinimler",
          description: "Etkinlik yapısı, misafir sayısı ve catering gereksinimlerini anlamak için detaylı danışmanlık.",
        },
        {
          title: "Menü Geliştirme ve Onay",
          description: "Onay iş akışı ve diyetetik düşüncelerle kurumsal uygun menü geliştirme.",
        },
        {
          title: "Üretim ve Hazırlık",
          description: "Kurumsal servis standartlarını sağlayan kalite kontrol noktalarıyla kontrollü üretim.",
        },
        {
          title: "Sahada Kurulum",
          description: "Staging, sunum kurulumu ve servis noktası hazırlığı için erken varış.",
        },
        {
          title: "Servis Uygulaması",
          description: "Sahada denetim ve gerçek zamanlı ayarlamalarla koordineli servis teslimatı.",
        },
        {
          title: "Etkinlik Sonrası İnceleme",
          description: "Sürekli iyileştirme için servis dokümantasyonu ve yapılandırılmış geri bildirim toplama.",
        },
      ],
      capacity: {
        dailyProduction: "500 - 2.000 porsiyon",
        eventSize: "20 - 500 kurumsal misafir",
        simultaneousLocations: "5'e kadar mekan",
        description: "Yapılandırılmış servis akışı, operasyonel disiplin ve öngörülebilir kalite gerektiren kurumsal etkinlikler için tasarlanmıştır.",
      },
      useCases: [
        {
          title: "Kurumsal Toplantılar",
          description: "Yapılandırılmış servis akışı ile profesyonel catering gerektiren kurumsal iç toplantılar.",
        },
        {
          title: "Ürün Lansmanları",
          description: "Sunum ve zamanlamanın kritik olduğu kurumsal ürün lansmanları.",
        },
        {
          title: "Yönetici Zirveleri",
          description: "Premium servis standartları gerektiren üst düzey yönetici toplantıları.",
        },
        {
          title: "Yıllık Toplantılar",
          description: "Yüksek misafir sayıları ve yapılandırılmış servis gereksinimleri olan kurumsal yıllık toplantılar.",
        },
      ],
      differentiators: [
        "Dokümante edilmiş protokollerle yapılandırılmış servis akışı",
        "Zamanlama ve sunumda kurumsal disiplin",
        "Acil durum planlaması ile zamanında teslimat",
        "Kurumsal seviye koordinasyon ve raporlama",
        "Kurumsal etkinlikler için eğitilmiş deneyimli ekipler",
      ],
      finalCta: {
        headline: "Hassasiyet ve disiplin gerektiren kurumsal etkinlikler için, bu catering hizmeti her ikisini de sağlar.",
        primary: "İletişime Geçin",
        secondary: "Ekibimizle İletişime Geçin",
      },
    },
  },
  {
    id: "wedding-engagement-catering",
    en: {
      eyebrow: "WEDDING CATERING",
      title: "Wedding & Engagement Catering",
      description: "Wedding-scale catering operations with guest flow management, service choreography, and premium presentation.",
      overview: {
        what: "Comprehensive wedding and engagement catering service focused on guest experience, service choreography, and premium presentation for special celebrations.",
        who: "Couples planning weddings and engagement celebrations, wedding planners, and venues hosting wedding events.",
        when: "Wedding ceremonies, engagement parties, wedding receptions, and special celebration events where presentation and guest experience are paramount.",
      },
      highlights: [
        "Guest flow management",
        "Service choreography",
        "Premium presentation",
        "Wedding-scale operations",
        "Celebration-focused service",
      ],
      process: [
        {
          title: "Wedding Consultation",
          description: "Detailed consultation to understand wedding vision, guest count, and celebration requirements.",
        },
        {
          title: "Menu Design & Tasting",
          description: "Custom menu development with tasting sessions and approval workflow.",
        },
        {
          title: "Production & Preparation",
          description: "Artisanal production with attention to presentation quality and celebration aesthetics.",
        },
        {
          title: "Venue Setup",
          description: "Premium staging and presentation setup with attention to celebration details.",
        },
        {
          title: "Service Execution",
          description: "Coordinated service delivery with seamless guest flow and celebration choreography.",
        },
        {
          title: "Celebration Support",
          description: "Continuous service throughout the celebration with real-time adjustments.",
        },
      ],
      capacity: {
        dailyProduction: "100 - 1,000 servings",
        eventSize: "50 - 500 wedding guests",
        simultaneousLocations: "Up to 3 venues",
        description: "Designed for wedding celebrations where guest experience, presentation quality, and service choreography define success.",
      },
      useCases: [
        {
          title: "Wedding Ceremonies",
          description: "Wedding ceremonies requiring premium presentation and seamless service flow.",
        },
        {
          title: "Engagement Parties",
          description: "Engagement celebrations with focus on guest experience and celebration atmosphere.",
        },
        {
          title: "Wedding Receptions",
          description: "Wedding receptions requiring coordinated service and premium presentation.",
        },
        {
          title: "Special Celebrations",
          description: "Special celebration events where service quality and presentation matter most.",
        },
      ],
      differentiators: [
        "Wedding-focused service choreography",
        "Experienced teams trained for celebration events",
        "Premium presentation standards maintained throughout",
        "Guest flow management for seamless experience",
        "Celebration-appropriate service timing",
      ],
      finalCta: {
        headline: "For wedding celebrations where experience and presentation define success, this catering service delivers both.",
        primary: "Get in Touch",
        secondary: "Contact Our Team",
      },
    },
    tr: {
      eyebrow: "DÜĞÜN CATERING",
      title: "Düğün & Nişan Catering",
      description: "Misafir akış yönetimi, servis koreografisi ve premium sunum ile düğün ölçeğinde catering operasyonları.",
      overview: {
        what: "Özel kutlamalar için misafir deneyimi, servis koreografisi ve premium sunuma odaklanan kapsamlı düğün ve nişan catering hizmeti.",
        who: "Düğün ve nişan kutlamaları planlayan çiftler, düğün planlayıcıları ve düğün etkinliklerine ev sahipliği yapan mekanlar.",
        when: "Sunum ve misafir deneyiminin en önemli olduğu düğün törenleri, nişan partileri, düğün resepsiyonları ve özel kutlama etkinlikleri.",
      },
      highlights: [
        "Misafir akış yönetimi",
        "Servis koreografisi",
        "Premium sunum",
        "Düğün ölçeğinde operasyonlar",
        "Kutlama odaklı servis",
      ],
      process: [
        {
          title: "Düğün Danışmanlığı",
          description: "Düğün vizyonu, misafir sayısı ve kutlama gereksinimlerini anlamak için detaylı danışmanlık.",
        },
        {
          title: "Menü Tasarımı ve Tadım",
          description: "Tadım seansları ve onay iş akışı ile özel menü geliştirme.",
        },
        {
          title: "Üretim ve Hazırlık",
          description: "Sunum kalitesi ve kutlama estetiğine dikkat eden zanaatkar üretim.",
        },
        {
          title: "Mekan Kurulumu",
          description: "Kutlama detaylarına dikkat ederek premium staging ve sunum kurulumu.",
        },
        {
          title: "Servis Uygulaması",
          description: "Kesintisiz misafir akışı ve kutlama koreografisi ile koordineli servis teslimatı.",
        },
        {
          title: "Kutlama Desteği",
          description: "Gerçek zamanlı ayarlamalarla kutlama boyunca sürekli servis.",
        },
      ],
      capacity: {
        dailyProduction: "100 - 1.000 porsiyon",
        eventSize: "50 - 500 düğün misafiri",
        simultaneousLocations: "3'e kadar mekan",
        description: "Misafir deneyimi, sunum kalitesi ve servis koreografisinin başarıyı tanımladığı düğün kutlamaları için tasarlanmıştır.",
      },
      useCases: [
        {
          title: "Düğün Törenleri",
          description: "Premium sunum ve kesintisiz servis akışı gerektiren düğün törenleri.",
        },
        {
          title: "Nişan Partileri",
          description: "Misafir deneyimi ve kutlama atmosferine odaklanan nişan kutlamaları.",
        },
        {
          title: "Düğün Resepsiyonları",
          description: "Koordineli servis ve premium sunum gerektiren düğün resepsiyonları.",
        },
        {
          title: "Özel Kutlamalar",
          description: "Servis kalitesi ve sunumun en önemli olduğu özel kutlama etkinlikleri.",
        },
      ],
      differentiators: [
        "Düğün odaklı servis koreografisi",
        "Kutlama etkinlikleri için eğitilmiş deneyimli ekipler",
        "Baştan sona korunan premium sunum standartları",
        "Kesintisiz deneyim için misafir akış yönetimi",
        "Kutlamaya uygun servis zamanlaması",
      ],
      finalCta: {
        headline: "Deneyim ve sunumun başarıyı tanımladığı düğün kutlamaları için, bu catering hizmeti her ikisini de sağlar.",
        primary: "İletişime Geçin",
        secondary: "Ekibimizle İletişime Geçin",
      },
    },
  },
  {
    id: "festival-large-event-catering",
    en: {
      eyebrow: "FESTIVAL CATERING",
      title: "Festival & Large Event Catering",
      description: "High-volume, high-pressure mass catering with speed, coordination, and field logistics for large-scale events.",
      overview: {
        what: "Scalable mass catering service designed for festivals and large-scale public events requiring high-volume production, speed, and coordinated field logistics.",
        who: "Festival organizers, large event planners, and public event coordinators managing high-volume events with complex logistics.",
        when: "Public festivals, large-scale celebrations, multi-day events, and high-volume public gatherings requiring mass catering operations.",
      },
      highlights: [
        "High-volume production",
        "Speed & coordination",
        "Field logistics",
        "Mass catering operations",
        "Multi-day event support",
      ],
      process: [
        {
          title: "Event Scale Assessment",
          description: "Comprehensive assessment of event scale, guest volume, and logistics requirements.",
        },
        {
          title: "Production Scaling",
          description: "High-volume production planning with quality control maintained at scale.",
        },
        {
          title: "Field Logistics Setup",
          description: "Mobile setup coordination with multiple service points and flexible logistics.",
        },
        {
          title: "Rapid Deployment",
          description: "Fast deployment of service points with coordinated timing across locations.",
        },
        {
          title: "Continuous Service",
          description: "Continuous high-volume service delivery with real-time coordination.",
        },
        {
          title: "Event Wrap-Up",
          description: "Efficient wrap-up and logistics coordination for event conclusion.",
        },
      ],
      capacity: {
        dailyProduction: "2,000 - 10,000 servings",
        eventSize: "500 - 10,000 guests",
        simultaneousLocations: "Up to 20 service points",
        description: "Designed for festivals and large events requiring high-volume production, speed, and coordinated field logistics.",
      },
      useCases: [
        {
          title: "Public Festivals",
          description: "Large-scale public festivals with multiple service points and high guest volumes.",
        },
        {
          title: "Large Celebrations",
          description: "Mass celebrations requiring high-volume catering with speed and coordination.",
        },
        {
          title: "Multi-Day Events",
          description: "Extended events requiring consistent high-volume service across multiple days.",
        },
        {
          title: "Public Gatherings",
          description: "Large public gatherings with distributed service requirements and high-volume needs.",
        },
      ],
      differentiators: [
        "High-volume production capacity without quality compromise",
        "Experienced teams trained for mass catering operations",
        "Field logistics expertise for complex event setups",
        "Speed and coordination for time-critical service",
        "Scalable operations for events of any size",
      ],
      finalCta: {
        headline: "For festivals and large events requiring scale and speed, this catering service delivers both.",
        primary: "Get in Touch",
        secondary: "Contact Our Team",
      },
    },
    tr: {
      eyebrow: "FESTİVAL CATERING",
      title: "Festival & Büyük Etkinlik Catering",
      description: "Büyük ölçekli etkinlikler için hız, koordinasyon ve saha lojistiği ile yüksek hacimli, yüksek baskılı toplu catering.",
      overview: {
        what: "Yüksek hacimli üretim, hız ve koordineli saha lojistiği gerektiren festivaller ve büyük ölçekli halka açık etkinlikler için tasarlanmış ölçeklenebilir toplu catering hizmeti.",
        who: "Yüksek hacimli etkinlikler ve karmaşık lojistik yöneten festival organizatörleri, büyük etkinlik planlayıcıları ve halka açık etkinlik koordinatörleri.",
        when: "Toplu catering operasyonları gerektiren halka açık festivaller, büyük ölçekli kutlamalar, çok günlü etkinlikler ve yüksek hacimli halka açık toplantılar.",
      },
      highlights: [
        "Yüksek hacimli üretim",
        "Hız ve koordinasyon",
        "Saha lojistiği",
        "Toplu catering operasyonları",
        "Çok günlü etkinlik desteği",
      ],
      process: [
        {
          title: "Etkinlik Ölçeği Değerlendirmesi",
          description: "Etkinlik ölçeği, misafir hacmi ve lojistik gereksinimlerinin kapsamlı değerlendirmesi.",
        },
        {
          title: "Üretim Ölçeklendirme",
          description: "Ölçekte kalite kontrolü korunarak yüksek hacimli üretim planlaması.",
        },
        {
          title: "Saha Lojistiği Kurulumu",
          description: "Çoklu servis noktaları ve esnek lojistik ile mobil kurulum koordinasyonu.",
        },
        {
          title: "Hızlı Konuşlandırma",
          description: "Lokasyonlar arasında koordineli zamanlama ile servis noktalarının hızlı konuşlandırılması.",
        },
        {
          title: "Sürekli Servis",
          description: "Gerçek zamanlı koordinasyon ile sürekli yüksek hacimli servis teslimatı.",
        },
        {
          title: "Etkinlik Kapanışı",
          description: "Etkinlik sonu için verimli kapanış ve lojistik koordinasyonu.",
        },
      ],
      capacity: {
        dailyProduction: "2.000 - 10.000 porsiyon",
        eventSize: "500 - 10.000 misafir",
        simultaneousLocations: "20'ye kadar servis noktası",
        description: "Yüksek hacimli üretim, hız ve koordineli saha lojistiği gerektiren festivaller ve büyük etkinlikler için tasarlanmıştır.",
      },
      useCases: [
        {
          title: "Halka Açık Festivaller",
          description: "Çoklu servis noktaları ve yüksek misafir hacimleri ile büyük ölçekli halka açık festivaller.",
        },
        {
          title: "Büyük Kutlamalar",
          description: "Hız ve koordinasyon ile yüksek hacimli catering gerektiren toplu kutlamalar.",
        },
        {
          title: "Çok Günlü Etkinlikler",
          description: "Birden fazla gün boyunca tutarlı yüksek hacimli servis gerektiren uzun süreli etkinlikler.",
        },
        {
          title: "Halka Açık Toplantılar",
          description: "Dağıtılmış servis gereksinimleri ve yüksek hacimli ihtiyaçları olan büyük halka açık toplantılar.",
        },
      ],
      differentiators: [
        "Kalite ödünü olmadan yüksek hacimli üretim kapasitesi",
        "Toplu catering operasyonları için eğitilmiş deneyimli ekipler",
        "Karmaşık etkinlik kurulumları için saha lojistiği uzmanlığı",
        "Zaman kritik servis için hız ve koordinasyon",
        "Her boyuttaki etkinlik için ölçeklenebilir operasyonlar",
      ],
      finalCta: {
        headline: "Ölçek ve hız gerektiren festivaller ve büyük etkinlikler için, bu catering hizmeti her ikisini de sağlar.",
        primary: "İletişime Geçin",
        secondary: "Ekibimizle İletişime Geçin",
      },
    },
  },
  {
    id: "workshop-special-experience-catering",
    en: {
      eyebrow: "WORKSHOP CATERING",
      title: "Workshop & Special Experience Catering",
      description: "Small-to-medium scale curated events with concept-based menus, controlled service, and brand-aligned experience.",
      overview: {
        what: "Curated catering service for workshops and special experience events focusing on concept-based menus, controlled service, and brand-aligned guest experience.",
        who: "Workshop organizers, experience designers, brand event planners, and curators organizing small-to-medium scale special events.",
        when: "Workshops, brand experiences, curated events, and special gatherings where concept and experience quality are the focus.",
      },
      highlights: [
        "Concept-based menus",
        "Controlled service",
        "Brand-aligned experience",
        "Curated event focus",
        "Small-to-medium scale",
      ],
      process: [
        {
          title: "Concept Development",
          description: "Collaborative concept development aligned with event theme and brand identity.",
        },
        {
          title: "Menu Curation",
          description: "Concept-based menu development with attention to experience narrative and brand alignment.",
        },
        {
          title: "Production & Preparation",
          description: "Artisanal production with focus on concept execution and presentation quality.",
        },
        {
          title: "Experience Setup",
          description: "Curated setup aligned with event concept and brand experience goals.",
        },
        {
          title: "Service Execution",
          description: "Controlled service delivery maintaining concept integrity and experience quality.",
        },
        {
          title: "Experience Refinement",
          description: "Post-event analysis and refinement for continuous experience improvement.",
        },
      ],
      capacity: {
        dailyProduction: "50 - 500 servings",
        eventSize: "10 - 200 guests",
        simultaneousLocations: "Up to 3 venues",
        description: "Designed for curated events where concept, experience quality, and brand alignment define success.",
      },
      useCases: [
        {
          title: "Workshops",
          description: "Educational and creative workshops requiring concept-aligned catering and controlled service.",
        },
        {
          title: "Brand Experiences",
          description: "Brand experience events where catering supports brand narrative and guest experience.",
        },
        {
          title: "Curated Events",
          description: "Curated special events with focus on concept-based menus and experience quality.",
        },
        {
          title: "Special Gatherings",
          description: "Special gatherings where concept and experience are more important than scale.",
        },
      ],
      differentiators: [
        "Concept-based menu development aligned with event theme",
        "Controlled service maintaining experience integrity",
        "Brand-aligned experience design and execution",
        "Curated approach to event catering",
        "Attention to experience narrative and quality",
      ],
      finalCta: {
        headline: "For workshops and special experiences where concept and quality matter, this catering service delivers both.",
        primary: "Get in Touch",
        secondary: "Contact Our Team",
      },
    },
    tr: {
      eyebrow: "WORKSHOP CATERING",
      title: "Workshop & Özel Deneyim Catering",
      description: "Konsept bazlı menüler, kontrollü servis ve marka uyumlu deneyim ile küçük-orta ölçekli küratörlü etkinlikler.",
      overview: {
        what: "Konsept bazlı menüler, kontrollü servis ve marka uyumlu misafir deneyimine odaklanan workshop'lar ve özel deneyim etkinlikleri için küratörlü catering hizmeti.",
        who: "Küçük-orta ölçekli özel etkinlikler düzenleyen workshop organizatörleri, deneyim tasarımcıları, marka etkinlik planlayıcıları ve küratörler.",
        when: "Konsept ve deneyim kalitesinin odak olduğu workshop'lar, marka deneyimleri, küratörlü etkinlikler ve özel toplantılar.",
      },
      highlights: [
        "Konsept bazlı menüler",
        "Kontrollü servis",
        "Marka uyumlu deneyim",
        "Küratörlü etkinlik odaklı",
        "Küçük-orta ölçekli",
      ],
      process: [
        {
          title: "Konsept Geliştirme",
          description: "Etkinlik teması ve marka kimliği ile uyumlu işbirlikçi konsept geliştirme.",
        },
        {
          title: "Menü Küratörlüğü",
          description: "Deneyim anlatısı ve marka uyumuna dikkat eden konsept bazlı menü geliştirme.",
        },
        {
          title: "Üretim ve Hazırlık",
          description: "Konsept uygulaması ve sunum kalitesine odaklanan zanaatkar üretim.",
        },
        {
          title: "Deneyim Kurulumu",
          description: "Etkinlik konsepti ve marka deneyim hedefleri ile uyumlu küratörlü kurulum.",
        },
        {
          title: "Servis Uygulaması",
          description: "Konsept bütünlüğü ve deneyim kalitesini koruyan kontrollü servis teslimatı.",
        },
        {
          title: "Deneyim İyileştirme",
          description: "Sürekli deneyim iyileştirmesi için etkinlik sonrası analiz ve iyileştirme.",
        },
      ],
      capacity: {
        dailyProduction: "50 - 500 porsiyon",
        eventSize: "10 - 200 misafir",
        simultaneousLocations: "3'e kadar mekan",
        description: "Konsept, deneyim kalitesi ve marka uyumunun başarıyı tanımladığı küratörlü etkinlikler için tasarlanmıştır.",
      },
      useCases: [
        {
          title: "Workshop'lar",
          description: "Konsept uyumlu catering ve kontrollü servis gerektiren eğitim ve yaratıcı workshop'lar.",
        },
        {
          title: "Marka Deneyimleri",
          description: "Catering'in marka anlatısını ve misafir deneyimini desteklediği marka deneyim etkinlikleri.",
        },
        {
          title: "Küratörlü Etkinlikler",
          description: "Konsept bazlı menüler ve deneyim kalitesine odaklanan küratörlü özel etkinlikler.",
        },
        {
          title: "Özel Toplantılar",
          description: "Konsept ve deneyimin ölçekten daha önemli olduğu özel toplantılar.",
        },
      ],
      differentiators: [
        "Etkinlik teması ile uyumlu konsept bazlı menü geliştirme",
        "Deneyim bütünlüğünü koruyan kontrollü servis",
        "Marka uyumlu deneyim tasarımı ve uygulaması",
        "Etkinlik catering'ine küratörlü yaklaşım",
        "Deneyim anlatısı ve kalitesine dikkat",
      ],
      finalCta: {
        headline: "Konsept ve kalitenin önemli olduğu workshop'lar ve özel deneyimler için, bu catering hizmeti her ikisini de sağlar.",
        primary: "İletişime Geçin",
        secondary: "Ekibimizle İletişime Geçin",
      },
    },
  },
  {
    id: "seminar-conference-catering",
    en: {
      eyebrow: "CONFERENCE CATERING",
      title: "Seminar & Conference Catering",
      description: "Long-duration professional events with continuous service, break-time catering, and predictable quality.",
      overview: {
        what: "Professional catering service designed for seminars and conferences requiring continuous service, break-time catering, and consistent quality throughout long-duration events.",
        who: "Conference organizers, seminar planners, professional event coordinators, and organizations hosting multi-day professional events.",
        when: "Seminars, conferences, professional workshops, multi-day business events, and long-duration professional gatherings.",
      },
      highlights: [
        "Continuous service",
        "Break-time catering",
        "Predictable quality",
        "Long-duration support",
        "Professional event focus",
      ],
      process: [
        {
          title: "Event Schedule Analysis",
          description: "Detailed analysis of event schedule, break times, and service requirements.",
        },
        {
          title: "Service Planning",
          description: "Continuous service planning aligned with event schedule and break times.",
        },
        {
          title: "Production & Preparation",
          description: "Scalable production with quality control for consistent service throughout the event.",
        },
        {
          title: "Service Point Setup",
          description: "Strategic service point setup for efficient access during breaks and sessions.",
        },
        {
          title: "Continuous Service",
          description: "Continuous service delivery with break-time catering and session support.",
        },
        {
          title: "Event Conclusion",
          description: "Efficient service wrap-up and post-event coordination.",
        },
      ],
      capacity: {
        dailyProduction: "200 - 1,500 servings",
        eventSize: "50 - 1,000 attendees",
        simultaneousLocations: "Up to 5 venues",
        description: "Designed for professional events requiring continuous service, break-time catering, and predictable quality throughout long durations.",
      },
      useCases: [
        {
          title: "Seminars",
          description: "Professional seminars requiring continuous service and break-time catering.",
        },
        {
          title: "Conferences",
          description: "Multi-day conferences with continuous service and break-time catering requirements.",
        },
        {
          title: "Professional Workshops",
          description: "Long-duration professional workshops requiring consistent service quality.",
        },
        {
          title: "Business Events",
          description: "Multi-day business events with continuous service and professional catering standards.",
        },
      ],
      differentiators: [
        "Continuous service throughout long-duration events",
        "Break-time catering aligned with event schedule",
        "Predictable quality maintained across all service points",
        "Experienced teams trained for professional events",
        "Scalable operations for events of varying sizes",
      ],
      finalCta: {
        headline: "For seminars and conferences requiring continuous service and quality, this catering service delivers both.",
        primary: "Get in Touch",
        secondary: "Contact Our Team",
      },
    },
    tr: {
      eyebrow: "KONFERANS CATERING",
      title: "Seminer & Konferans Catering",
      description: "Sürekli servis, mola zamanı catering ve öngörülebilir kalite ile uzun süreli profesyonel etkinlikler.",
      overview: {
        what: "Uzun süreli etkinlikler boyunca sürekli servis, mola zamanı catering ve tutarlı kalite gerektiren seminerler ve konferanslar için tasarlanmış profesyonel catering hizmeti.",
        who: "Konferans organizatörleri, seminer planlayıcıları, profesyonel etkinlik koordinatörleri ve çok günlü profesyonel etkinliklere ev sahipliği yapan organizasyonlar.",
        when: "Seminerler, konferanslar, profesyonel workshop'lar, çok günlü iş etkinlikleri ve uzun süreli profesyonel toplantılar.",
      },
      highlights: [
        "Sürekli servis",
        "Mola zamanı catering",
        "Öngörülebilir kalite",
        "Uzun süreli destek",
        "Profesyonel etkinlik odaklı",
      ],
      process: [
        {
          title: "Etkinlik Programı Analizi",
          description: "Etkinlik programı, mola zamanları ve servis gereksinimlerinin detaylı analizi.",
        },
        {
          title: "Servis Planlaması",
          description: "Etkinlik programı ve mola zamanları ile uyumlu sürekli servis planlaması.",
        },
        {
          title: "Üretim ve Hazırlık",
          description: "Etkinlik boyunca tutarlı servis için kalite kontrolü ile ölçeklenebilir üretim.",
        },
        {
          title: "Servis Noktası Kurulumu",
          description: "Molalar ve oturumlar sırasında verimli erişim için stratejik servis noktası kurulumu.",
        },
        {
          title: "Sürekli Servis",
          description: "Mola zamanı catering ve oturum desteği ile sürekli servis teslimatı.",
        },
        {
          title: "Etkinlik Sonu",
          description: "Verimli servis kapanışı ve etkinlik sonrası koordinasyon.",
        },
      ],
      capacity: {
        dailyProduction: "200 - 1.500 porsiyon",
        eventSize: "50 - 1.000 katılımcı",
        simultaneousLocations: "5'e kadar mekan",
        description: "Uzun süreler boyunca sürekli servis, mola zamanı catering ve öngörülebilir kalite gerektiren profesyonel etkinlikler için tasarlanmıştır.",
      },
      useCases: [
        {
          title: "Seminerler",
          description: "Sürekli servis ve mola zamanı catering gerektiren profesyonel seminerler.",
        },
        {
          title: "Konferanslar",
          description: "Sürekli servis ve mola zamanı catering gereksinimleri olan çok günlü konferanslar.",
        },
        {
          title: "Profesyonel Workshop'lar",
          description: "Tutarlı servis kalitesi gerektiren uzun süreli profesyonel workshop'lar.",
        },
        {
          title: "İş Etkinlikleri",
          description: "Sürekli servis ve profesyonel catering standartları olan çok günlü iş etkinlikleri.",
        },
      ],
      differentiators: [
        "Uzun süreli etkinlikler boyunca sürekli servis",
        "Etkinlik programı ile uyumlu mola zamanı catering",
        "Tüm servis noktalarında korunan öngörülebilir kalite",
        "Profesyonel etkinlikler için eğitilmiş deneyimli ekipler",
        "Değişen boyutlardaki etkinlikler için ölçeklenebilir operasyonlar",
      ],
      finalCta: {
        headline: "Sürekli servis ve kalite gerektiren seminerler ve konferanslar için, bu catering hizmeti her ikisini de sağlar.",
        primary: "İletişime Geçin",
        secondary: "Ekibimizle İletişime Geçin",
      },
    },
  },
  {
    id: "outdoor-activity-catering",
    en: {
      eyebrow: "OUTDOOR CATERING",
      title: "Outdoor & Activity Catering",
      description: "Outdoor and dynamic events with mobile setups, flexible service points, and environmental adaptation.",
      overview: {
        what: "Flexible catering service designed for outdoor events and dynamic activities requiring mobile setups, flexible service points, and adaptation to environmental conditions.",
        who: "Outdoor event organizers, activity coordinators, festival planners, and organizers managing events in dynamic or outdoor environments.",
        when: "Outdoor festivals, activity-based events, park gatherings, beach events, and dynamic events requiring mobile and flexible catering solutions.",
      },
      highlights: [
        "Mobile setups",
        "Flexible service points",
        "Environmental adaptation",
        "Outdoor event expertise",
        "Dynamic event support",
      ],
      process: [
        {
          title: "Site Assessment",
          description: "Comprehensive assessment of outdoor site conditions, access, and environmental factors.",
        },
        {
          title: "Mobile Setup Planning",
          description: "Mobile setup design with flexible service points and environmental adaptation.",
        },
        {
          title: "Production & Preparation",
          description: "Production with focus on portability, environmental resilience, and service flexibility.",
        },
        {
          title: "Mobile Deployment",
          description: "Flexible deployment of mobile service points adapted to site conditions.",
        },
        {
          title: "Dynamic Service",
          description: "Adaptive service delivery responding to environmental conditions and event dynamics.",
        },
        {
          title: "Site Wrap-Up",
          description: "Efficient wrap-up and site restoration coordination.",
        },
      ],
      capacity: {
        dailyProduction: "100 - 2,000 servings",
        eventSize: "50 - 1,000 guests",
        simultaneousLocations: "Up to 10 mobile points",
        description: "Designed for outdoor and dynamic events requiring mobile setups, flexible service points, and environmental adaptation.",
      },
      useCases: [
        {
          title: "Outdoor Festivals",
          description: "Outdoor festivals requiring mobile catering setups and flexible service points.",
        },
        {
          title: "Activity-Based Events",
          description: "Dynamic activity-based events with flexible service requirements.",
        },
        {
          title: "Park Gatherings",
          description: "Park and outdoor gatherings requiring mobile and adaptable catering solutions.",
        },
        {
          title: "Beach Events",
          description: "Beach and waterfront events with environmental adaptation requirements.",
        },
      ],
      differentiators: [
        "Mobile setup expertise for outdoor environments",
        "Flexible service points adapted to site conditions",
        "Environmental adaptation for various outdoor conditions",
        "Experienced teams trained for dynamic event environments",
        "Portable and resilient catering solutions",
      ],
      finalCta: {
        headline: "For outdoor and dynamic events requiring flexibility and adaptation, this catering service delivers both.",
        primary: "Get in Touch",
        secondary: "Contact Our Team",
      },
    },
    tr: {
      eyebrow: "AÇIK ALAN CATERING",
      title: "Açık Alan & Aktivite Catering",
      description: "Mobil kurulumlar, esnek servis noktaları ve çevresel adaptasyon ile açık hava ve dinamik etkinlikler.",
      overview: {
        what: "Mobil kurulumlar, esnek servis noktaları ve çevresel koşullara adaptasyon gerektiren açık hava etkinlikleri ve dinamik aktiviteler için tasarlanmış esnek catering hizmeti.",
        who: "Açık hava etkinlik organizatörleri, aktivite koordinatörleri, festival planlayıcıları ve dinamik veya açık hava ortamlarında etkinlik yöneten organizatörler.",
        when: "Mobil ve esnek catering çözümleri gerektiren açık hava festivalleri, aktivite bazlı etkinlikler, park toplantıları, plaj etkinlikleri ve dinamik etkinlikler.",
      },
      highlights: [
        "Mobil kurulumlar",
        "Esnek servis noktaları",
        "Çevresel adaptasyon",
        "Açık hava etkinlik uzmanlığı",
        "Dinamik etkinlik desteği",
      ],
      process: [
        {
          title: "Saha Değerlendirmesi",
          description: "Açık hava saha koşulları, erişim ve çevresel faktörlerin kapsamlı değerlendirmesi.",
        },
        {
          title: "Mobil Kurulum Planlaması",
          description: "Esnek servis noktaları ve çevresel adaptasyon ile mobil kurulum tasarımı.",
        },
        {
          title: "Üretim ve Hazırlık",
          description: "Taşınabilirlik, çevresel dayanıklılık ve servis esnekliğine odaklanan üretim.",
        },
        {
          title: "Mobil Konuşlandırma",
          description: "Saha koşullarına adapte edilmiş esnek mobil servis noktalarının konuşlandırılması.",
        },
        {
          title: "Dinamik Servis",
          description: "Çevresel koşullara ve etkinlik dinamiklerine yanıt veren adaptif servis teslimatı.",
        },
        {
          title: "Saha Kapanışı",
          description: "Verimli kapanış ve saha restorasyon koordinasyonu.",
        },
      ],
      capacity: {
        dailyProduction: "100 - 2.000 porsiyon",
        eventSize: "50 - 1.000 misafir",
        simultaneousLocations: "10'a kadar mobil nokta",
        description: "Mobil kurulumlar, esnek servis noktaları ve çevresel adaptasyon gerektiren açık hava ve dinamik etkinlikler için tasarlanmıştır.",
      },
      useCases: [
        {
          title: "Açık Hava Festivalleri",
          description: "Mobil catering kurulumları ve esnek servis noktaları gerektiren açık hava festivalleri.",
        },
        {
          title: "Aktivite Bazlı Etkinlikler",
          description: "Esnek servis gereksinimleri olan dinamik aktivite bazlı etkinlikler.",
        },
        {
          title: "Park Toplantıları",
          description: "Mobil ve uyarlanabilir catering çözümleri gerektiren park ve açık hava toplantıları.",
        },
        {
          title: "Plaj Etkinlikleri",
          description: "Çevresel adaptasyon gereksinimleri olan plaj ve sahil etkinlikleri.",
        },
      ],
      differentiators: [
        "Açık hava ortamları için mobil kurulum uzmanlığı",
        "Saha koşullarına adapte edilmiş esnek servis noktaları",
        "Çeşitli açık hava koşulları için çevresel adaptasyon",
        "Dinamik etkinlik ortamları için eğitilmiş deneyimli ekipler",
        "Taşınabilir ve dayanıklı catering çözümleri",
      ],
      finalCta: {
        headline: "Esneklik ve adaptasyon gerektiren açık hava ve dinamik etkinlikler için, bu catering hizmeti her ikisini de sağlar.",
        primary: "İletişime Geçin",
        secondary: "Ekibimizle İletişime Geçin",
      },
    },
  },
];

export function getServiceById(id: ServiceId): ServiceData | undefined {
  return services.find((service) => service.id === id);
}
