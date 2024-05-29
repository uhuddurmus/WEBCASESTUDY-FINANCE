import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../redux/redux-hooks";
import { fetchDebts, updatePaymentPlan } from "../redux/slices/debtSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PayModal(props: any) {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleOk() {
    const SendData = {
      paymentDate: props.props.paymentDate.slice(0,10),
      paymentAmount: props.props.paymentAmount,
      isPaid: !props.props.isPaid,
    };
  
    try {
      await dispatch(updatePaymentPlan({ id: props.props.id, paymentPlan: SendData })).unwrap();
      setModalShow(false); // Modalı kapat
      toast.success("Payment successful"); // Başarılı ödeme mesajı
      // DebtList bileşenindeki verileri yenilemek için fetchDebts action creator'ını dispatch et
      await dispatch(fetchDebts()).unwrap();
    } catch (e) {
      toast.error("Payment failed"); // Ödeme başarısız olduğunda hata mesajı
    }
  }
  
  return (
    <>
      <ToastContainer />

      <Button style={{width:'150px'}} variant={props.props.isPaid == true? "danger":"success"} onClick={() => setModalShow(true)}>
      {props.props.isPaid == true? "Remove Payment":"Pay"}
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Pay Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.props.paymentAmount} will {props.props.isPaid == true? "Not Paid":"Paid"}. Are you sure ?
        </Modal.Body>
        <Modal.Footer>
          <Button className={props.props.isPaid == true? "btn-danger":"btn-success"} onClick={()=>handleOk()}>
            Yes
          </Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PayModal;
