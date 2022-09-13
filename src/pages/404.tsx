import Error from "../components/Error";

export default function Custom404() {
  return (
    <Error
      code="404"
      title="Page not found"
      description="Please check the URL in the address bar and try again."
    />
  );
}
