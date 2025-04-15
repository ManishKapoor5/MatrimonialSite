
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lavender/40 via-white to-peach/40 z-0"></div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-6">
              <Heart size={16} className="fill-primary" />
              <span className="text-sm font-medium">Premium Membership</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 leading-tight">
              Find Your Perfect Match with Premium Benefits
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Upgrade to our premium plan and increase your chances of finding your soulmate by 3x with exclusive features and priority matching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8">
                <span>Upgrade Now</span>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <span>Compare Plans</span>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">J</div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">S</div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">P</div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">5,000+</span> successful matches last month
              </p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-primary/20 rounded-xl opacity-20 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1545128485-c400ce7b75d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Happy couple"
                className="rounded-xl shadow-xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sarah & James</h3>
                    <p className="text-sm text-muted-foreground">Premium members</p>
                  </div>
                </div>
                <p className="text-sm">"We found each other within 2 weeks of upgrading to premium!"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
