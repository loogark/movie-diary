import { http, HttpResponse } from "msw";

const supabaseUrl = "https://mock.supabase.co/rest/v1";
let mockReview = null;

export const handlers = [
  http.get(`${supabaseUrl}/movies`, () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "Inception",
        release_date: "2010-07-16",
        poster_path: "/poster.jpg",
        overview:
          "A thief who steals corporate secrets through dream-sharing technology...",
      },
    ]);
  }),

  http.get("https://api.themoviedb.org/3/discover/movie", () => {
    return HttpResponse.json({
      results: Array.from({ length: 6 }, (_, i) => ({
        id: i,
        title: `Mock Movie ${i + 1}`,
        poster_path: "/mock-poster.jpg",
      })),
    });
  }),

  http.get("https://api.themoviedb.org/3/movie/popular", () => {
    return HttpResponse.json({
      results: Array.from({ length: 6 }, (_, i) => ({
        id: 100 + i,
        title: `Popular Movie ${i + 1}`,
        poster_path: "/popular-mock.jpg",
      })),
    });
  }),

  http.get("https://mock.supabase.co/rest/v1/liked_movies", () => {
    return HttpResponse.json([
      {
        id: "1",
        movie_id: "100",
        user_id: "user123",
        created_at: new Date().toISOString(),
      },
    ]);
  }),

  http.get("https://api.themoviedb.org/3/movie/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      title: "Mock Movie Title",
      poster_path: "/mock-poster.jpg",
      backdrop_path: "/mock-backdrop.jpg",
      overview: "This is a mock overview of the movie.",
      release_date: "2024-01-01",
      vote_average: 8.2,
      genres: [{ id: 1, name: "Drama" }],
      runtime: 120,
    });
  }),

  // Get review for current user
  http.get("https://mock.supabase.co/rest/v1/reviews", () => {
    return HttpResponse.json(mockReview ? [mockReview] : []);
  }),

  // Add or update review
  http.post("https://mock.supabase.co/rest/v1/reviews", async ({ request }) => {
    const body = (await request.json()) as any;
    mockReview = { ...body, id: "123", created_at: new Date().toISOString() };
    return HttpResponse.json(mockReview);
  }),

  http.patch(
    "https://mock.supabase.co/rest/v1/reviews",
    async ({ request }) => {
      const body = (await request.json()) as any;
      mockReview = { ...(mockReview as any), ...body };
      return HttpResponse.json(mockReview);
    }
  ),

  http.delete("https://mock.supabase.co/rest/v1/reviews", () => {
    mockReview = null;
    return HttpResponse.json({});
  }),
];
