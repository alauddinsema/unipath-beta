
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Apply from "./pages/Apply";
import Path from "./pages/Path";
import AI from "./pages/AI";
import InPlatformBrowser from "./pages/InPlatformBrowser";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Documents from "./pages/Documents";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProtectedPremiumRoute from "./components/auth/ProtectedPremiumRoute";
import NotFound from "./pages/NotFound";

// Create the query client with improved caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    },
  },
});

// ScrollToTop component to handle scroll position on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  
  useEffect(() => {
    // Only scroll to top on PUSH navigation, not on POP (back/forward)
    if (navigationType === 'PUSH') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes (Authentication Only) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/apply" element={<Apply />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              
              {/* Premium Routes (Require Subscription) */}
              <Route element={<ProtectedPremiumRoute />}>
                <Route path="/path" element={<Path />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/browser" element={<InPlatformBrowser />} />
                <Route path="/documents" element={<Documents />} />
              </Route>
              
              {/* Always Accessible Routes */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/subscription-plans" element={<SubscriptionPlans />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
