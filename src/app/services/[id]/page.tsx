"use client";

import { useParams } from "next/navigation";
import { getServiceById, type ServiceId } from "../../../data/services";
import { ServiceDetailPage } from "../../../components/ServiceDetailPage";
import { useEffect, useState } from "react";

export default function ServicePage() {
  const params = useParams();
  const serviceId = params?.id as ServiceId;
  const [lang, setLang] = useState<"tr" | "en">("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "tr" || stored === "en") {
      setLang(stored);
      return;
    }
    if (navigator.language.toLowerCase().startsWith("tr")) {
      setLang("tr");
    }
  }, []);

  const service = getServiceById(serviceId);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-dark">Service Not Found</h1>
          <p className="mt-2 text-dark/70">The requested service could not be found.</p>
        </div>
      </div>
    );
  }

  return <ServiceDetailPage service={service} language={lang} />;
}
