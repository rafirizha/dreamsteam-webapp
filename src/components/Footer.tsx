import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-surface-dim full-width border-t border-outline-variant dark:border-outline flat no shadows mt-auto">
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-gutter flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4 md:w-1/3">
          <h2 className="font-headline-md text-headline-md font-extrabold tracking-tight mb-4 text-error">
            Dreams Team
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Empowering Excellence through intensive mentoring and updated materials for your future career.
          </p>
          <div className="flex gap-4 mt-6">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="mailto:info@kelasbimbel.com">
              <span className="material-symbols-outlined">mail</span>
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="tel:+628123456789">
              <span className="material-symbols-outlined">call</span>
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined">location_on</span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3 w-full">
          <div>
            <h3 className="font-label-sm text-label-sm font-bold text-on-background uppercase mb-4 tracking-wider">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/programs">
                  Polri
                </Link>
              </li>
              <li>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/programs">
                  TNI
                </Link>
              </li>
              <li>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/programs">
                  Kedinasan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-label-sm text-label-sm font-bold text-on-background uppercase mb-4 tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">
                  Career
                </Link>
              </li>
              <li>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">
                  Partnership
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-label-sm text-label-sm font-bold text-on-background uppercase mb-4 tracking-wider">Office</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Jl. Pulau Batam Raya, No.36, Wayhalim, Bandar Lampung 35135</p>
          </div>
        </div>
      </div>
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-6 border-t border-outline-variant/30 text-center">
        <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 Dev by Pasukan Rafi Corps™ Dreams Team Academy. Empowering Excellence.</p>
      </div>
    </footer>
  );
}
