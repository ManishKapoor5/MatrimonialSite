
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah & James",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1516589091380-5d8e87df8ad7?ixlib=rb-4.0.3",
      stars: 5,
      text: "We were both hesitant about online matchmaking, but the premium features made all the difference. The advanced filters helped us find each other quickly, and the unlimited messaging meant we could really get to know each other. We're now happily engaged!",
      marriedSince: "Engaged after 9 months"
    },
    {
      name: "Priya & Arjun",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1539181341095-b14d6798090c?ixlib=rb-4.0.3",
      stars: 5,
      text: "Our parents were looking for the perfect match for both of us. Thanks to the premium membership, they were able to connect and find the compatibility we needed. The detailed profiles and background verification gave us confidence. We're now happily married for 2 years.",
      marriedSince: "Married for 2 years"
    },
    {
      name: "Michael & David",
      location: "Toronto, Canada",
      image: "https://images.unsplash.com/photo-1515552058574-2e05fc383e72?ixlib=rb-4.0.3",
      stars: 5,
      text: "The premium features allowed us to connect in a safe, private environment. The profile boost feature made our profiles more visible to each other, and we matched right away. We appreciated the inclusive environment and found our perfect match.",
      marriedSince: "Married for 1 year"
    },
    {
      name: "Aisha & Omar",
      location: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1620931687191-8bf0bef60cb4?ixlib=rb-4.0.3",
      stars: 5,
      text: "The cultural compatibility filters in the premium plan were exactly what we needed. We were able to find someone who shared our values and traditions. The private photo feature also made us feel secure about sharing more personal pictures.",
      marriedSince: "Married for 3 years"
    },
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from happy couples who found their perfect match with our premium services.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto overflow-hidden">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="italic text-foreground mb-6">
                      "{testimonials[activeIndex].text}"
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium font-serif text-lg">
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[activeIndex].location}
                        </p>
                        <p className="text-sm text-primary mt-1">
                          {testimonials[activeIndex].marriedSince}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={prevTestimonial}
                          className="rounded-full"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">Previous</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={nextTestimonial}
                          className="rounded-full"
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Next</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-8 gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-primary w-6" : "bg-primary/30"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
