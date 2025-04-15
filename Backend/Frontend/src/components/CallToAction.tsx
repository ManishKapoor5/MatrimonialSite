
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"></div>
      <div className="container relative z-10 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-6">
          <Heart size={16} className="fill-primary" />
          <span className="text-sm font-medium">Limited Time Offer</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-6 max-w-2xl mx-auto">
          Find Your Perfect Match Today with 30% Off
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Upgrade to premium now and enjoy all the exclusive benefits at a special introductory price. Offer valid for a limited time only.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-darkPurple hover:from-darkPurple hover:to-primary animate-shine bg-[length:200%_auto]">
            <span>Upgrade to Premium</span>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">
            <span>Learn More</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
