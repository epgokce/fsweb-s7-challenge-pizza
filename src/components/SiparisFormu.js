import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import "./SiparisFormu.css";

const ekMalzeme = [
  "Pepperoni",
  "Domates",
  "Biber",
  "Sosis",
  "Mısır",
  "Roka",
  "Kanada Jambonu",
  "Sucuk",
  "Ananas",
  "Tavuk Izgara",
  "Jalepeno",
  "Kabak",
  "Soğan",
  "Sarımsak",
];

const Order = () => {
  const [urunPuani, setUrunPuani] = useState("");
  const [stok, setStok] = useState("");
  const [secilenEkMalzeme, setEkMalzeme] = useState([]);
  const [pizzaSiparis, setPizzaSiparis] = useState(0);
  const [toplamFiyat, setToplamFiyat] = useState(0);
  const [pizzaSayisi, setPizzaSayisi] = useState(1);
  const [formDoldur, setFormDoldur] = useState(false);
  const [form, setForm] = useState({});
  const history = useHistory();

  // hata mesaji
  const [formErrors, setFormErrors] = useState({
    boyut: '',
    kalinlik:'' ,
    name: '',
    note: '',
  });

  const formSchema = Yup.object().shape({
    boyut: Yup.string().required("En az bir adet seçim yapmalısınız."),
    kalinlik: Yup.string().required("Pizza hamuru kalınlığını seçiniz."),
    name: Yup.string()
      .required("Lütfen bu alanı doldurunuz..")
      .min(3, "İsim en az 2 karakter olmalıdır"),
    note: Yup.string()
      .required("Lütfen bu alanı doldurunuz..")
      .min(3, "Not bölümü en az iki karakter olabilir."),
  });

  useEffect(() => {
    console.warn("error:", formErrors);
  }, [formErrors]);

  const handleBoyutChange = (e) => {
    const { type, name, value } = e.target;

    // Boyut
    const pizzaDetails = {
      kucuk: { price: 89, rate: 5, stock: 670 },
      orta: { price: 129, rate: 4, stock: 550 },
      buyuk: { price: 159, rate: 3, stock: 500 },
    };
    // Hamur
    if (type === "radio" && pizzaDetails[value]) {
      const { price, rate, stock } = pizzaDetails[value];
      setPizzaSiparis(price);
      setUrunPuani(rate);
      setStok(stock);
    }
    // form yukle
    setForm({ ...form, [name]: value });
    // yup state
    Yup.reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: " " });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(form).then((valid) => {
      setFormDoldur(valid);
    });
  }, [form, formSchema]);

  // ek Malzeme
  const handleBoyutChangeExtras = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setEkMalzeme([...secilenEkMalzeme, value]);
    } else {
      setEkMalzeme(secilenEkMalzeme.filter((item) => item !== value));
    }
  };

  // forma ekle
  useEffect(() => {
    setForm({ ...form, extra_materials: secilenEkMalzeme });
  }, [secilenEkMalzeme]);

  // pizza Sayısi
  const handleBoyutChangeCounter = (e) => {
    if (e.target.id === "decrease" && pizzaSayisi > 0) {
      setPizzaSayisi(pizzaSayisi - 1);
    } else if (e.target.id === "increase" && pizzaSayisi < stok) {
      setPizzaSayisi(pizzaSayisi + 1);
    }
  };
  // form yukleme
  useEffect(() => {
    setForm({ ...form, number_of_pizzas: pizzaSayisi });
  }, [pizzaSayisi]);

  useEffect(() => {
    setToplamFiyat(
      pizzaSiparis * pizzaSayisi + secilenEkMalzeme.length * 5 * pizzaSayisi
    );
  }, [pizzaSiparis, pizzaSayisi, secilenEkMalzeme]);
  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formDoldur) {
      axios
        .post("https://reqres.in/api/orders", form)
        .then((res) => {
          console.log("Post Edilen Data Kontrol Edildi:", res.data);
          history.push("/success");
        })
        .catch(() => {
          // Handle errors
        });
    } else {
      console.log("hatalı veri....");
    }
  };

  return (
    <div className="pizza-page">
      <div className="order-container">
        <div className="header-link-bar">
          <ul>
            <li>
              <NavLink to="/" exact activeClassName="active">
                Anasayfa
              </NavLink>
            </li>
            <span>-</span>
            <li>Seçenekler</li>
            <span>-</span>
            <li>
              <NavLink to="/pizza" activeClassName="active">
                Siparişi Oluştur
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="pizza-detail">
        <div className="form">
          <br />
          <div className="product-name">
            <h4>Position Absolute Acı Pizza</h4>
          </div>
          <br />
          <div className="product-count-rate-stock">
            <h4>{pizzaSiparis}₺</h4>
            <h6>{urunPuani}</h6>
            <h6>({stok} Adet)</h6>
          </div>
          <br />
          <div className="pizza-detail-p">
            <p>
              Frontend Dev olarak hala position:absolute kullanıyorsan bu çok
              acı pizza tam sana göre. Pizza, domates, peynir ve genellikle
              çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak
              odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
              yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan
              İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen
              pizatta denir.
            </p>
          </div>
          {/* form */}
          <form id="pizza-form" onSubmit={handleSubmit}>
            <div className="form-one">
              <div className="form-first-choice-panel">
                <div className="select-pizza-size">
                  <h5>
                    Boyut Seç <span style={{ color: "#CE2829" }}>*</span>
                  </h5>
                  <div>
                    <label>
                      <input
                        className="radio"
                        type="radio"
                        id="kucuk"
                        name="boyut"
                        value="kucuk"
                        onChange={handleBoyutChange}
                      />
                      Küçük
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        className="radio"
                        type="radio"
                        id="orta"
                        name="boyut"
                        value="orta"
                        onChange={handleBoyutChange}
                      />
                      Orta
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        className="radio"
                        type="radio"
                        id="boyut"
                        name="boyut"
                        value="buyuk"
                        onChange={handleBoyutChange}
                      />
                      Büyük
                    </label>
                  </div>
                  {formErrors.boyut && <h6> {formErrors.boyut} </h6>}
                </div>

                <div className="select-pizza-size">
                  <h5>
                    Hamur Seç <span>*</span>
                  </h5>
                  <select
                    id="size-dropdown"
                    name="kalinlik"
                    defaultValue="none"
                    onChange={handleBoyutChange}
                  >
                    <option value="none" disabled>
                      Hamur Kalınlığı:
                    </option>
                    <option type="option" value="kucuk">
                      İnce
                    </option>
                    <option type="option" value="normal">
                      Normal
                    </option>
                    <option type="option" value="kalın">
                      Kalın
                    </option>
                  </select>
                  {formErrors.kalinlik && <h6> {formErrors.kalinlik} </h6>}
                </div>
              </div>
            </div>
            {/*checkbox*/}
            <div className="form-extra">
              <div className="form-extra-details">
                <h5>Ek Malzemeler</h5>
                <p>En fazla 10 ürün seçebilirsiniz. 5₺ </p>
              </div>
              <div className="form-extra-list">
                {ekMalzeme.map((item, index) => {
                  return (
                    <div key={index}>
                      <label>
                        <input
                          className="checkbox"
                          type="checkbox"
                          name="extra_materials"
                          disabled={
                            secilenEkMalzeme.length === 10 &&
                            !secilenEkMalzeme.includes(item)
                          }
                          value={item}
                          onChange={handleBoyutChangeExtras}
                        />
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* isim, notlar */}

            <div className="form-text">
              <label className="musteri-ismi">
                <h5>İsim</h5>
                <textarea
                  className="rounded"
                  type="text"
                  id="name-input"
                  placeholder="Min. 2 karakter içermeli"
                  name="name"
                  onChange={handleBoyutChange}
                />
              </label>
              {formErrors.name && <h6>{formErrors.name}</h6>}

              <label className="special-text">
                <h5>Sipariş Notu</h5>
                <textarea
                  className="rounded"
                  type="text-area"
                  id="special-text"
                  placeholder="Siparişine eklemek istediğin bir not var mı?"
                  name="note"
                  onChange={handleBoyutChange}
                />
              </label>
              {formErrors.note && <h6>{formErrors.note}</h6>}
            </div>

            <hr />
            {/* adet*/}
            <div className="form-change-number">
              <div className="form-change-numberof">
                <button
                  className="decrease-button"
                  type="button"
                  id="decrease"
                  onClick={handleBoyutChangeCounter}
                  disabled={pizzaSiparis === 0}
                >
                  -
                </button>
                <h4 data-test-id="numberofpizza">{pizzaSayisi}</h4>
                <button
                  className="increase-button"
                  type="button"
                  id="increase"
                  onClick={handleBoyutChangeCounter}
                  disabled={pizzaSiparis === 0}
                >
                  +
                </button>
              </div>
              {/* Toplam, Siparis ver */}
              <div className="form-change-total">
                <div className="text-container">
                  <h5>Sipariş Toplamı</h5>
                  <div className="between">
                    <h6>Ekstra Seçimler</h6>
                    <h6>{secilenEkMalzeme.length * 5 * pizzaSayisi}₺</h6>
                  </div>
                  <div className="between">
                    <h6 id="total" className="rounded">
                      Toplam
                    </h6>
                    <h6 id="total">{toplamFiyat}₺</h6>
                  </div>
                </div>
                <div>
                  <button
                    className="rounded"
                    id="button-order"
                    type="submit"
                    disabled={!formDoldur}
                  >
                    SİPARİŞİ VER
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
