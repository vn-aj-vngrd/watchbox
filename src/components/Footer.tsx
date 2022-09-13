// components/Footer.tsx

const Footer = () => {
  return (
    <footer className="p-2 px-6 py-2 text-sm border-t bg-white dark:border-[#525252] dark:bg-black">
      <div className="container flex justify-center mx-auto">
        <p>© {new Date().getFullYear()} | NextDevs</p>
      </div>
    </footer>
  );
};

export default Footer;
