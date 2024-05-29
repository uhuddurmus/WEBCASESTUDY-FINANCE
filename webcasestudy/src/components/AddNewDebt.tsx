import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../redux/redux-hooks";
import { createDebt, fetchDebts } from "../redux/slices/debtSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddNewDebt() {
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState<any>({
    debtName: "",
    lenderName: "",
    debtAmount: 0,
    interestRate: 0,
    installment: 0,
    paymentStart: new Date().toISOString().slice(0, 10), // Bugünün tarihi
    description: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: name === "debtAmount" ? parseFloat(value) : value,
    }));
  };

  async function handleOk() {
    // Bileşik faiz hesaplaması ve en yakın tam sayıya yuvarlama
    const amount = Math.round(
      formData.debtAmount *
        Math.pow(1 + formData.interestRate / 100, formData.installment)
    );
    // Taksit miktarı hesaplama ve yuvarlama
    const paymentAmount = Math.round(amount / formData.installment);
  
    // Payment plan oluşturma
    const paymentPlan = Array.from({ length: formData.installment }, (_, i) => {
      const paymentDate = new Date(
        new Date(formData.paymentStart).setMonth(new Date(formData.paymentStart).getMonth() + i)
      ).toISOString().slice(0, 10);
      return {
        paymentDate,
        paymentAmount,
      };
    });
  
    const newDebt = {
      ...formData,
      amount,
      paymentPlan,
    };
    const test = {
        "debtName": formData.debtName,
        "lenderName": formData.lenderName,
        "amount": amount,
        "debtAmount": formData.debtAmount,
        "interestRate": parseInt(formData.interestRate),
        "paymentStart": formData.paymentStart,
        "installment": parseInt(formData.installment),
        "description": formData.description,
        "paymentPlan": paymentPlan
      }
    try {
      // Yeni borcu oluşturmak için API'yi çağırma
      await dispatch(createDebt(test)).unwrap();
      // Başarılı bir şekilde borç oluşturulduğunda mesaj gösterme
      toast.success("Debt created successfully");
      // Verilerin güncellenmesi için mevcut borçları yeniden getirme
      await dispatch(fetchDebts()).unwrap();
      // Modal'ı kapatma
      setModalShow(false);
    } catch (e) {
      // Hata durumunda kullanıcıya bildirim gösterme
      toast.error("Failed to create debt");
    }
  }
  

  return (
    <>
      <ToastContainer />
      <button
        className="btn btn-primary text-white h5 float-right me-3  bg-opacity-75"
        onClick={() => setModalShow(true)}
      >
        Add New{" "}
        <svg
          style={{ marginTop: "-5px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>
      </button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Debt
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="debtName">Debt Name</label>
            <input
              type="text"
              className="form-control"
              id="debtName"
              name="debtName"
              value={formData.debtName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lenderName">Lender Name</label>
            <input
              type="text"
              className="form-control"
              id="lenderName"
              name="lenderName"
              value={formData.lenderName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="debtAmount">Debt Amount</label>
            <input
              type="number"
              className="form-control"
              id="debtAmount"
              name="debtAmount"
              value={formData.debtAmount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="interestRate">Interest Rate (%)</label>
            <input
              type="number"
              className="form-control"
              id="interestRate"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="installment">Installment</label>
            <input
              type="number"
              className="form-control"
              id="installment"
              name="installment"
              value={formData.installment}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentStart">Payment Start Date</label>
            <input
              type="date"
              className="form-control"
              id="paymentStart"
              name="paymentStart"
              value={formData.paymentStart}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleOk()}>Add</Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewDebt;
