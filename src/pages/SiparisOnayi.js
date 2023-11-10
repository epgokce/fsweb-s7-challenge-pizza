import React from "react";
import { useLocation } from "react-router-dom";
import "./SiparisOnayi.css";

const Success = () => {
  const location = useLocation();
  const orderDetails = location.state && location.state.orderDetails;

  return (
    <div>
      <div className="success">
        <p className="text">TEBRİKLER!</p>
        <p className="text">SİPARİŞİNİZ ALINDI!</p>
        {orderDetails && (
          <div className="order-details">
            <div className="pizzaSelection">
              <div>
                <span>Boyut: </span>
                {orderDetails.boyut}
              </div>
              <div>
                <span>Hamur: </span>
                {orderDetails.kalinlik}
              </div>
              <div>
                <span>Ek Malzemeler: </span>
                {orderDetails.extra_materials.join(", ")}
              </div>
            </div>
            <div className="pizzaTotal">
              <div>Sipariş Toplamı</div>
              <div>
                <div>{orderDetails.toplamFiyat}₺</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Success;
