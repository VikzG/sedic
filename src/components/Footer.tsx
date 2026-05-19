export default function Footer() {
  return (
    <footer className="bg-[#111827] py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-[10px] tracking-[0.25em] text-white/30 uppercase"
          style={{ fontFamily: 'Commissioner, sans-serif' }}
        >
          © {new Date().getFullYear()} SEDIC — Tous droits réservés
        </p>
        <div className="flex gap-6">
          {['Mentions légales', 'Politique de confidentialité'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[10px] tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors duration-200 uppercase"
              style={{ fontFamily: 'Commissioner, sans-serif' }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
