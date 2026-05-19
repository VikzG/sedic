import { useNav } from '../App';

const PROJECTS = [
  {
    tag: 'Gouvernance',
    title: 'Renforcement institutionnel',
    location: 'Afrique de l\'Ouest',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    tag: 'Éducation',
    title: 'Formation professionnelle',
    location: 'Maghreb',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    tag: 'Développement',
    title: 'Économie locale & inclusion',
    location: 'Afrique centrale',
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Projects() {
  const { navigate } = useNav();
  return (
    <section id="projects" className="py-28 bg-[#f8f8f6]">
      <div className="max-w-7xl mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p
              className="text-xs tracking-[0.3em] text-[#1e2d6b]/50 uppercase mb-4"
              style={{ fontFamily: 'Commissioner, sans-serif' }}
            >
              Projets
            </p>
            <h2
              className="text-4xl md:text-5xl font-normal text-[#1e2d6b] leading-tight"
              style={{ fontFamily: 'Coconat, Georgia, serif' }}
            >
              Nos réalisations
            </h2>
          </div>
          <button
            onClick={() => navigate('contact')}
            className="text-xs tracking-[0.2em] text-[#1e2d6b]/60 border-b border-[#1e2d6b]/30 pb-0.5 hover:text-[#1e2d6b] hover:border-[#1e2d6b] transition-all duration-200 self-start md:self-auto whitespace-nowrap"
            style={{ fontFamily: 'Commissioner, sans-serif' }}
          >
            VOIR TOUS LES PROJETS
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PROJECTS.map((p) => (
            <article key={p.title} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-[#1e2d6b]/5">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span
                className="text-[10px] tracking-[0.3em] text-[#1e2d6b]/50 uppercase"
                style={{ fontFamily: 'Commissioner, sans-serif' }}
              >
                {p.tag}
              </span>
              <h3
                className="text-xl font-normal text-[#1e2d6b] mt-2 mb-1 leading-snug"
                style={{ fontFamily: 'Coconat, Georgia, serif' }}
              >
                {p.title}
              </h3>
              <p
                className="text-xs text-[#1e2d6b]/50 tracking-wide"
                style={{ fontFamily: 'Commissioner, sans-serif' }}
              >
                {p.location}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
