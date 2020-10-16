export default function bootstrap(): void {
  const reactBootstrapHTMLLink = `<link
    href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600&display=swap"
    rel="stylesheet"
  />`;

  document.head.insertAdjacentHTML('beforeend', reactBootstrapHTMLLink);
}
