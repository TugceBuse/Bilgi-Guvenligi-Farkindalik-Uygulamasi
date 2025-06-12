// components/CargoMailNotifier.jsx
import { useEffect, useRef } from "react";
import { useMailContext } from "../Contexts/MailContext";
import { useGameContext } from "../Contexts/GameContext";
import { statusSteps } from "../utils/cargoStatus.js";
import { usePhoneContext } from "../Contexts/PhoneContext";

const CargoMailNotifier = () => {
  const { cargoTrackingList, seconds } = useGameContext(); // <-- sadece oku!
  const { addMessage } = usePhoneContext();
  const { sendMail } = useMailContext();
  const sentMapRef = useRef({});

  useEffect(() => {
    cargoTrackingList.forEach(item => {
      if (item.startSeconds == null) return;

      const currentStep = item.currentStep; // Hesaplamak yerine hazır kullan!
      const sentKey = `${item.trackingNo}_${currentStep}`;

      if ((statusSteps[currentStep].mail || statusSteps[currentStep].sms) && !sentMapRef.current[sentKey]) {
        // Önce mail gönderimi (varsa)
        if (statusSteps[currentStep].mail) {
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
        }
        // Sonra sms gönderimi (varsa) — gecikmeli!
        if (statusSteps[currentStep].sms) {
          const smsText = statusSteps[currentStep].sms({
            trackingNo: item.trackingNo,
            shippingCompany: item.shippingCompany,
            recipient: item.recipient || "Tugce Buse Ergün"
          });
          const delayMs = 60000;
          setTimeout(() => {
            addMessage(item.shippingCompany || "TechDepo Kargo", smsText);
          }, delayMs);
        }
        sentMapRef.current[sentKey] = true;
      }
    });
  }, [cargoTrackingList, statusSteps, sendMail, addMessage]);

  return null;
};

export default CargoMailNotifier;
