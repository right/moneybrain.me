import Link from 'next/link';
import { site } from '@/lib/site';

export function Header() {
  return <header className="header"><Link className="brand" href="/"><span>🧠</span>{site.name}</Link><nav><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></nav><a className="btn small" href="/contact">Get a free quote</a></header>;
}
