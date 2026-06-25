import Link from 'next/link';
import { site } from '@/lib/site';

export function Header() {
  return <header className="header"><Link className="brand" href="/"><span>🧠</span>{site.name}</Link><span className="eyebrow header-tagline">Free quote help, made simple</span></header>;
}
