import Link from 'next/link';

export function NavTabs() {
  return (
    <nav className="nav-tabs">
      <Link href="/covid-testing-sites">
        <a>Covid Testing Sites</a>
      </Link>
    </nav>
  );
}
