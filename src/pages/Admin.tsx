
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { UserPremiumUpgrade } from '@/components/admin/UserPremiumUpgrade';
import { UpgradeSpecificUser } from '@/components/admin/UpgradeSpecificUser';
import { ImportUniversitiesSection } from '@/components/admin/ImportUniversitiesSection';

export default function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-7xl mx-auto pt-24 pb-12 px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Panel</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <UserPremiumUpgrade />
          <UpgradeSpecificUser />
          <ImportUniversitiesSection />
        </div>
      </main>
    </div>
  );
}
