import Lastnews from './Lastnews';
import News from './News';
import ContactForm from './Contactform';

export default function Heronews() {
  return (
    <div className="pt-20">
      <News compact />
      <Lastnews />
      <ContactForm />
    </div>
  );
}
