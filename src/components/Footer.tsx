// components/Footer.tsx

const Footer = () => {
  return (
    <footer className="flex justify-center p-2 px-6 py-2 text-sm border-t footer bg-neutral text-neutral-content dark:border-[#525252]">
      <div>
        <p>© {new Date().getFullYear()} | NextDevs</p>
      </div>
    </footer>
  );
};

export default Footer;
