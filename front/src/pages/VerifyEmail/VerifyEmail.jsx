import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { verifyEmail } = useAuthContext();
  const [isCalled, setIsCalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("E-posta doğrulama sayfası useEffect çalıştı");
    const verify = async () => {
      if (isCalled) return;
      setIsCalled(true);
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      if (!token) {
        setError(true);
        setMessage("Geçersiz aktivasyon bağlantısı.");
        return;
      }

      try {
        const successMessage = await verifyEmail(token);
        setMessage(successMessage);
        setError(false);
        setTimeout(() => navigate("/login"), 3000); // Başarılıysa giriş sayfasına yönlendir
      } catch (err) {
        setMessage(err.message || "E-posta doğrulama işlemi başarısız.");
        setError(true);
      }
    };
    verify();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{error ? "Hata!" : "Başarılı!"}</h1>
      <p>{message}</p>
      {error && <button onClick={() => navigate("/")}>Ana Sayfaya Dön</button>}
    </div>
  );
};

export default VerifyEmail;
