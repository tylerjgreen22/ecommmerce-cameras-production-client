import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <section>
      <h2 className="title bottom-spacer">
        Error 404: The requested resource does not exist
      </h2>
      <Link className="link" to="/">
        Return to home page
      </Link>
    </section>
  );
}

export default Error;
