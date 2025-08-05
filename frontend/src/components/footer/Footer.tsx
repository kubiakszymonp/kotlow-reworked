import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerRow}>
          <div className={styles.footerInfo}>
            <p>Numer telefonu: 573 791 098</p>
            <p>Numer konta parafii: 52 9256 0004 0082 1416 2000 0040</p>
            <p>
              Facebook parafii:{' '}
              <Link href="https://facebook.com/ParafiaKotlow" target="_blank" rel="noopener noreferrer">
                https://facebook.com/ParafiaKotlow
              </Link>
            </p>
          </div>
          
          <div className={styles.footerIcons}>
            <div className={styles.footerIcon}>
              <Link href="https://www.diecezja.kalisz.pl/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/kuria.png"
                  alt="Diecezja Kaliska"
                  width={80}
                  height={80}
                />
              </Link>
            </div>
            
            <div className={styles.footerIcon}>
              <Link href="https://www.opiekun.kalisz.pl/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/opiekun.png"
                  alt="Opiekun Kalisz"
                  width={80}
                  height={80}
                />
              </Link>
            </div>
            
            <div className={styles.footerIcon}>
              <Link href="https://www.radiorodzina.kalisz.pl/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/radio_rodzina.png"
                  alt="Radio Rodzina"
                  width={80}
                  height={80}
                />
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.footerCredits}>
          Parafia Rzymsko-katolicka w Kotłowie
        </div>
      </div>
    </footer>
  );
}