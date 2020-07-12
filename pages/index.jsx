import { GoogleMap } from 'components/GoogleMap';
import { Header } from 'components/Header';
import { NavTabs } from 'components/NavTabs';

export async function getServerSideProps(context) {
  return {
    props: {
    }, // will be passed to the page component as props
  }
}

export default function Index({ markers }) {
  return (
    <div className="page-container">
      <Header />
      <NavTabs />
      <aside className="sidebar"></aside>
      <GoogleMap />
    </div>
  );
}
