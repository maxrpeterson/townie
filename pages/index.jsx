import { GoogleMap } from 'components/GoogleMap';

export async function getServerSideProps(context) {
  return {
    props: {
    }, // will be passed to the page component as props
  }
}

export default function Index({ markers }) {
  return (
    <GoogleMap />
  );
}
