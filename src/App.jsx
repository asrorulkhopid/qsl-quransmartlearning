import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./app/home/Home";
import Mushaf from "./app/mushaf/Mushaf";
import Learn from "./app/learn/Learn";
import Guidance from "./app/guidance/Guidance";
import NotFound from "./app/not-found/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Surah from "./app/mushaf/surah/Surah";
import NavBar from "./component/fragment/NavBar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full w-full flex flex-col">
        <Router>
          <div className="flex-none sticky top-0 z-50">
            <NavBar />
          </div>
          <div className="grow flex flex-col overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/mushaf" element={<Mushaf />} />
              <Route path="/surah/:id" element={<Surah />} />
              <Route path="/learn/*" element={<Learn />} />
              <Route path="/feedback" element={<Guidance />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
