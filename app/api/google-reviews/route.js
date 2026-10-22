// Live Google reviews for HandyYet via Places API (New).
// Env: GOOGLE_PLACES_SERVER_KEY (server key, no referrer restriction), optional GOOGLE_PLACE_ID.
export const revalidate = 21600; // refresh every 6 hours

const KEY = process.env.GOOGLE_PLACES_SERVER_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY;

async function findPlaceId() {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': 'places.id' },
    body: JSON.stringify({ textQuery: 'HandyYet handyman Huntington Beach CA' }),
    next: { revalidate: 86400 },
  });
  const j = await r.json();
  return j.places?.[0]?.id;
}

export async function GET() {
  try {
    if (!KEY) return Response.json({ reviews: [], error: 'no key' });
    const id = await findPlaceId();
    if (!id) return Response.json({ reviews: [], error: 'place not found' });
    const r = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
      headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews' },
      next: { revalidate: 21600 },
    });
    const p = await r.json();
    const reviews = (p.reviews || [])
      .filter((v) => v.rating >= 4 && v.text?.text)
      .sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
      .map((v) => ({
        author: v.authorAttribution?.displayName || 'Google user',
        photo: v.authorAttribution?.photoUri || null,
        rating: v.rating,
        text: v.text.text,
        when: v.relativePublishTimeDescription,
        date: v.publishTime,
      }));
    return Response.json({ rating: p.rating, count: p.userRatingCount, url: p.googleMapsUri, reviews });
  } catch (e) {
    return Response.json({ reviews: [], error: 'fetch failed' });
  }
}
