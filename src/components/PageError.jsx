import { useRouteError } from "react-router-dom";

function PageError() {
  const error = useRouteError();

  if (error.message === "Network Error") {
    return (
      <section>
        <h2 className="title bottom-spacer">{error.message}</h2>
        <p className="subtitle">Please try again later</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="title bottom-spacer">
        You are unauthorized to view this resource
      </h2>
      <p className="subtitle">Please try again with moderator credentials</p>
    </section>
  );
}

export default PageError;
