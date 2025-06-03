// components/CargoMailNotifier.jsx
import { useEffect, useRef } from "react";
import { useMailContext } from "../Contexts/MailContext";
import { useGameContext } from "../Contexts/GameContext";
// Eğer statusSteps contextte yoksa, dışarıdan import et:
import { statusSteps } from "../utils/cargoStatus.js";

const CargoMailNotifier = () => {
  const { cargoTrackingList, setCargoTrackingList, seconds } = useGameContext();
  const { sendMail } = useMailContext();
  const sentMapRef = useRef({}); // runtime flag, persist gerekirse context ekle

 useEffect(() => {
  setCargoTrackingList(prevList =>
    prevList.map(item => {
      if (item.startSeconds == null) return item;

      let elapsed = seconds - item.startSeconds;
      let total = 0, currentStep = 0;
      for (let i = 0; i < statusSteps.length; i++) {
        total += statusSteps[i].durationSeconds || 0;
        if (elapsed < total) {
          currentStep = i;
          break;
        } else {
          currentStep = i;
        }
      }

      // delivered ve currentStep güncelle
      const delivered = (currentStep === statusSteps.length - 1);

      // Mail tetikleyici (her adımda sadece bir kez)
      const sentKey = `${item.trackingNo}_${currentStep}`;
      if (statusSteps[currentStep].mail && !sentMapRef.current[sentKey]) {
        const mailContent = statusSteps[currentStep].mail.content
          ? statusSteps[currentStep].mail.content({
              trackingNo: item.trackingNo,
              shippingCompany: item.shippingCompany,
              recipient: item.recipient || "Tugce Buse Ergün"
            })
          : undefined;
        sendMail(statusSteps[currentStep].mail.type, {
          from: `${item.shippingCompany} <info@${item.shippingCompany.toLowerCase()}.com>`,
          title: statusSteps[currentStep].mail.title,
          precontent: statusSteps[currentStep].mail.precontent,
          trackingNo: item.trackingNo,
          shippingCompany: item.shippingCompany,
          recipient: item.recipient || "Tugce Buse Ergün",
          content: mailContent
        });
        sentMapRef.current[sentKey] = true;
      }

      // Güncellenmiş item'ı döndür!
      return {
        ...item,
        currentStep,
        delivered
      };
    })
  );
}, [seconds, statusSteps]);



  return null; // Bu bileşen ekrana bir şey render etmez
};

export default CargoMailNotifier;
