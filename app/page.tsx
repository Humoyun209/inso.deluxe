import InsopharmHomepage from '@/components/InsopharmHomepage';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const googleMapsApiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    '';

  return <InsopharmHomepage googleMapsApiKey={googleMapsApiKey} />;
}

