const Footer = () => {
  return (
    <footer className="py-2">
      <div className="mx-auto flex items-center justify-center px-4 text-sm text-gray-900 dark:text-white">
        <p> {new Date().getFullYear()} © NextDevs </p>
      </div>
    </footer>
  );
};

export default Footer;
