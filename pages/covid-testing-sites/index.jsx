import useSwr from 'swr';

import { GoogleMap } from 'components/GoogleMap';
import { Header } from 'components/Header';
import { NavTabs } from 'components/NavTabs';

const fetcher = (...args) => fetch(...args).then(res => res.json())

// export async function getServerSideProps(context) {
//   return {
//     props: {
//     }, // will be passed to the page component as props
//   }
// }

export default function CovidTestingSitesPage({ markers }) {
  const { data, error } = useSwr('/api/testing-sites', fetcher, { initialData: [] });

  const formattedData = data.map((site) => ({
    key: `${site.site_name}+${site.coordinates.lat}+${site.coordinates.lng}`,
    text: site.site_name,
    coordinates: {
      lat: site.coordinates.lat,
      lng: site.coordinates.lng,
    },
  }));

  return (
    <div className="page-container">
      <Header />
      <NavTabs />
      <aside className="sidebar"></aside>
      <GoogleMap
        mapMarkers={formattedData}
      />
    </div>
  );
}
