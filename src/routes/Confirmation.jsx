import { useParams } from "react-router-dom";

function Confirmation() {
  const orderid = useParams();
  return (
    <section>
      <h2 className="title small-bottom-spacer">Confirmation</h2>
      <p className="text small-bottom-spacer">
        Thanks for your order. Your order ID is {orderid.id}
      </p>
      <p className="text">You will receive a confirmation email shortly</p>
    </section>
  );
}

export default Confirmation;
