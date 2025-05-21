
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";
import { Menu } from 'lucide-react';
import { NavLink } from './NavLink';
import { navigation } from './navData';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileMenu = ({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          className="transition-all duration-300 hover:bg-primary/10"
        >
          <Menu className="h-5 w-5 transition-all duration-300" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="sm:w-2/3 md:hidden backdrop-blur-xl bg-background/95 border-r border-primary/10"
      >
        <SheetHeader className="text-left">
          <SheetTitle>
            <Logo size="sm" />
          </SheetTitle>
          <SheetDescription>
            Navigate through the app
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              icon={item.icon}
              isMobile={true}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
          
          {user ? (
            <>
              <NavLink 
                to="/profile" 
                isMobile={true}
                onClick={() => setIsMenuOpen(false)}
              >
                <Avatar className="mr-3 h-6 w-6">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name} />
                  <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
                </Avatar>
                Profile
              </NavLink>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut} 
                className="mt-4 w-full justify-start"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <div className="grid gap-4 mt-4">
              <NavLink 
                to="/login" 
                isMobile={true}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </NavLink>
              <NavLink 
                to="/signup" 
                className="flex items-center justify-center rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 transition-all duration-300 hover:shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
