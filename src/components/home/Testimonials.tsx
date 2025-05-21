
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-opacity-90">
              Trusted by Students Worldwide
            </h2>
            <p className="text-xl text-white text-opacity-70">
              Join thousands of students who are simplifying their university application journey with FindEducation.
            </p>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">1,000+</div>
                <div className="text-white text-opacity-70">Universities</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-white text-opacity-70">Countries</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="text-white text-opacity-70">Students</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-white text-opacity-70">Success Rate</div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Join Them Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-white text-opacity-70 mb-4">
                  "FindEducation streamlined my entire application process. I was able to discover programs I didn't even know existed, and the document management system saved me countless hours of organization."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="font-medium text-white text-opacity-90">MJ</span>
                  </div>
                  <div>
                    <div className="font-medium text-white text-opacity-90">Michael Johnson</div>
                    <div className="text-sm text-white text-opacity-70">Harvard University, Class of 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-white text-opacity-70 mb-4">
                  "The deadline reminders were a lifesaver! I was juggling multiple applications and would have certainly missed some important dates without FindEducation's notification system."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="font-medium text-white text-opacity-90">SP</span>
                  </div>
                  <div>
                    <div className="font-medium text-white text-opacity-90">Sarah Parker</div>
                    <div className="text-sm text-white text-opacity-70">University of Oxford, Class of 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
