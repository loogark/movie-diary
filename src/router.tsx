// src/router.tsx
import { createBrowserRouter } from "react-router-dom";

import { App } from "@/App";
import { SectionPage, HomePage, MoviePage, LikedMoviesPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "watchlist", element: <p>watch list</p> },
      { path: "likes", element: <LikedMoviesPage /> },
      { path: "movie/:id", element: <MoviePage /> },

      { path: ":slug", element: <SectionPage /> },

      { path: "*", element: <p>page not found</p> },
    ],
  },
]);
