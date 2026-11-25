'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMapsLibrary,
  useMap,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Search,
  Building2,
  Navigation,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '@/lib/insopharm-data';
import { getDictionary } from '@/locales';

// Tier 1 Global Quota & Auth Failure Tap for Demo Key (Section 8 Case A)
if (typeof window !== 'undefined' && !(window as unknown as Record<string, boolean>).__gmpTapInstalled) {
  (window as unknown as Record<string, boolean>).__gmpTapInstalled = true;
  (window as unknown as Record<string, () => void>).gm_authFailure = () => {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  };
  const origError = console.error;
  console.error = (...args: unknown[]) => {
    origError.apply(console, args);
    const msg = args.map((a) => String(a)).join(' ');
    if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    }
  };
}

interface LivePlaceResult {
  id: string;
  displayName: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
  rating?: number | null;
  userRatingCount?: number | null;
  googleMapsURI?: string | null;
}

function PlacesMapController({
  activeQuery,
  lang,
  onPlacesLoaded,
  onLoadingChange,
}: {
  activeQuery: string;
  lang: Language;
  onPlacesLoaded: (places: LivePlaceResult[]) => void;
  onLoadingChange: (loading: boolean) => void;
}) {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const coreLib = useMapsLibrary('core');

  const executeTextSearch = useCallback(
    async (queryText: string) => {
      if (!placesLib || !queryText.trim()) return;
      onLoadingChange(true);
      try {
        const { Place } = placesLib;
        const request: google.maps.places.SearchByTextRequest = {
          textQuery: queryText,
          fields: [
            'id',
            'displayName',
            'formattedAddress',
            'location',
            'rating',
            'userRatingCount',
            'googleMapsURI',
          ],
          language: lang === 'ru' ? 'ru' : lang === 'uz' ? 'uz' : 'en',
          region: 'uz',
          maxResultCount: 6,
        };

        const response = await Place.searchByText(request);
        const rawPlaces = response?.places ?? [];

        const mapped: LivePlaceResult[] = [];
        for (const p of rawPlaces) {
          if (p.location) {
            const lat =
              typeof p.location.lat === 'function'
                ? p.location.lat()
                : (p.location as unknown as google.maps.LatLngLiteral).lat;
            const lng =
              typeof p.location.lng === 'function'
                ? p.location.lng()
                : (p.location as unknown as google.maps.LatLngLiteral).lng;

            mapped.push({
              id: p.id || `${lat}-${lng}`,
              displayName: p.displayName || '',
              formattedAddress: p.formattedAddress || '',
              location: { lat, lng },
              rating: p.rating,
              userRatingCount: p.userRatingCount,
              googleMapsURI: p.googleMapsURI,
            });
          }
        }

        onPlacesLoaded(mapped);

        if (map && mapped.length > 0 && coreLib) {
          if (mapped.length === 1) {
            map.panTo(mapped[0].location);
            map.setZoom(15);
          } else {
            const bounds = new coreLib.LatLngBounds();
            mapped.forEach((item) => bounds.extend(item.location));
            map.fitBounds(bounds, 48);
          }
        }
      } catch (err: unknown) {
        const errMsg = String(err);
        if (
          errMsg.includes('OVER_QUERY_LIMIT') ||
          errMsg.includes('RESOURCE_EXHAUSTED') ||
          errMsg.includes('429') ||
          errMsg.includes('QuotaExceeded')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      } finally {
        onLoadingChange(false);
      }
    },
    [placesLib, coreLib, map, lang, onPlacesLoaded, onLoadingChange]
  );

  useEffect(() => {
    void executeTextSearch(activeQuery);
  }, [activeQuery, executeTextSearch]);

  return null;
}

export default function InsoLocationMap({
  apiKey,
  lang,
}: {
  apiKey: string;
  lang: Language;
}) {
  const copy = getDictionary(lang).map;
  const [searchInput, setSearchInput] = useState('Bogishamol Street, Yunusabad, Tashkent');
  const [activeQuery, setActiveQuery] = useState('Bogishamol Street, Yunusabad, Tashkent');
  const [places, setPlaces] = useState<LivePlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<LivePlaceResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePlacesLoaded = useCallback((results: LivePlaceResult[]) => {
    setPlaces(results);
    setSelectedPlace(results[0] ?? null);
  }, []);

  const handlePresetClick = (q: string) => {
    setSearchInput(q);
    setActiveQuery(q);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveQuery(searchInput.trim());
    }
  };

  const initialCenter =
    places[0]?.location ?? ({ lat: 41.3111, lng: 69.2797 } as google.maps.LatLngLiteral);

  return (
    <section
      id="map"
      className="py-14 sm:py-20 bg-white border-t border-b border-slate-200/80"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0D9488] uppercase tracking-wider mb-2">
              <Navigation className="w-3.5 h-3.5" />
              <span>{copy.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight text-slate-900 text-balance">
              {copy.title}
            </h2>
            <p className="mt-2.5 text-[16px] sm:text-[17px] text-slate-600 leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-50/80 border border-teal-200/80 text-xs font-semibold text-[#0F766E] self-start lg:self-auto">
            <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
            <span>{copy.gdpNote}</span>
          </div>
        </div>

        {/* Interactive Controls + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Panel: Live Places Search & Interactive Results List */}
          <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={copy.searchPlaceholder}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B3B60]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#082B47] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  {copy.searchBtn}
                </button>
              </form>

              {/* Quick Filter Presets */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  {
                    label: copy.presetHub,
                    query: 'Bogishamol Street, Yunusabad, Tashkent',
                  },
                  {
                    label: copy.presetPharmacies,
                    query: 'Pharmacies in Yunusabad, Tashkent',
                  },
                  {
                    label: copy.presetClinics,
                    query: 'Medical clinics in Tashkent',
                  },
                ].map((preset) => {
                  const isActive = activeQuery === preset.query;
                  return (
                    <button
                      key={preset.query}
                      type="button"
                      onClick={() => handlePresetClick(preset.query)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0D9488] text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Live Places Results */}
              <div className="pt-2 border-t border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{copy.resultsLabel}</span>
                  <span className="font-[family-name:var(--font-mono)] text-[#0D9488]">
                    {places.length}
                  </span>
                </div>

                {isLoading ? (
                  <div className="py-8 text-center text-xs text-slate-500 animate-pulse">
                    {copy.loadingText}
                  </div>
                ) : places.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    {copy.noResultsText}
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                    {places.map((place) => {
                      const isSelected = selectedPlace?.id === place.id;
                      return (
                        <button
                          key={place.id}
                          type="button"
                          onClick={() => setSelectedPlace(place)}
                          className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-xs'
                              : 'bg-white text-slate-800 border-slate-200/80 hover:border-[#0B3B60]/40'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-white/15 text-teal-300'
                                : 'bg-teal-50 text-[#0D9488]'
                            }`}
                          >
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-bold truncate">
                              {place.displayName}
                            </div>
                            {place.formattedAddress && (
                              <div
                                className={`text-[11px] mt-0.5 line-clamp-2 ${
                                  isSelected ? 'text-slate-200' : 'text-slate-500'
                                }`}
                              >
                                {place.formattedAddress}
                              </div>
                            )}
                            {typeof place.rating === 'number' && (
                              <div
                                className={`mt-1 inline-flex items-center gap-1 text-[11px] font-semibold ${
                                  isSelected ? 'text-teal-300' : 'text-[#0D9488]'
                                }`}
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>
                                  {place.rating.toFixed(1)}
                                  {place.userRatingCount
                                    ? ` (${place.userRatingCount})`
                                    : ''}
                                </span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Corporate Note */}
            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>INSO GROUP · Tashkent Hub (10 000 m² GDP)</span>
              </span>
              {selectedPlace?.googleMapsURI && (
                <a
                  href={selectedPlace.googleMapsURI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#0B3B60] hover:underline"
                >
                  <span>{copy.openInMaps}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Right Panel: Interactive Google Map with AdvancedMarkerElement */}
          <div className="lg:col-span-7 h-[360px] sm:h-[460px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_14px_34px_-12px_rgba(15,23,42,0.1)] relative bg-slate-100">
            <APIProvider
              apiKey={apiKey}
              language={lang === 'ru' ? 'ru' : lang === 'uz' ? 'uz' : 'en'}
              region="UZ"
            >
              <PlacesMapController
                activeQuery={activeQuery}
                lang={lang}
                onPlacesLoaded={handlePlacesLoaded}
                onLoadingChange={setIsLoading}
              />
              <GoogleMap
                mapId="DEMO_MAP_ID"
                defaultCenter={initialCenter}
                defaultZoom={13}
                gestureHandling="cooperative"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                className="w-full h-full"
              >
                {places.map((place) => {
                  const isSelected = selectedPlace?.id === place.id;
                  return (
                    <AdvancedMarker
                      key={place.id}
                      position={place.location}
                      title={place.displayName}
                      onClick={() => setSelectedPlace(place)}
                    >
                      <Pin
                        background={isSelected ? '#0D9488' : '#0B3B60'}
                        borderColor="#FFFFFF"
                        glyphColor="#FFFFFF"
                        scale={isSelected ? 1.25 : 1.05}
                      />
                    </AdvancedMarker>
                  );
                })}

                {selectedPlace && (
                  <InfoWindow
                    position={selectedPlace.location}
                    pixelOffset={[0, -36]}
                    maxWidth={260}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <div className="p-1 text-slate-900 space-y-1">
                      <div className="text-xs font-extrabold text-[#0B3B60]">
                        {selectedPlace.displayName}
                      </div>
                      {selectedPlace.formattedAddress && (
                        <div className="text-[11px] text-slate-600 leading-snug">
                          {selectedPlace.formattedAddress}
                        </div>
                      )}
                      {selectedPlace.googleMapsURI && (
                        <a
                          href={selectedPlace.googleMapsURI}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 pt-1 text-[11px] font-bold text-[#0D9488] hover:underline"
                        >
                          <span>{copy.openInMaps}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </APIProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
