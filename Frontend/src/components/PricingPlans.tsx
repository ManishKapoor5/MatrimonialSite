
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Monthly",
      price: 29.99,
      popular: false,
      features: [
        "Unlimited profile viewing",
        "Unlimited messaging",
        "Advanced search filters",
        "Profile boost (1x per week)",
        "See who viewed your profile",
      ],
      cta: "Try Premium for a Month",
    },
    {
      name: "Quarterly",
      price: 59.99,
      perMonth: 19.99,
      popular: true,
      features: [
        "All Monthly features",
        "Profile boost (3x per week)",
        "Featured in special searches",
        "Read receipts for messages",
        "Exclusive premium events",
        "Priority customer support",
      ],
      cta: "Most Popular Choice",
      savings: "Save 33%",
    },
    {
      name: "Yearly",
      price: 149.99,
      perMonth: 12.49,
      popular: false,
      features: [
        "All Quarterly features",
        "Daily profile boost",
        "Premium badge on profile",
        "Advanced compatibility reports",
        "Video chat feature",
        "Personal matchmaking suggestions",
      ],
      cta: "Best Value",
      savings: "Save 58%",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Choose Your Premium Plan
          </h2>
          <p className="text-lg text-muted-foreground">
            Select the perfect premium plan that suits your needs and start connecting with compatible matches today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border p-6 md:p-8 relative ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-white" />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-medium mb-2">{plan.name} Plan</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-semibold font-serif">${plan.price}</span>
                  {plan.perMonth && (
                    <>
                      <span className="text-muted-foreground">/quarter</span>
                    </>
                  )}
                </div>
                {plan.perMonth && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Just ${plan.perMonth}/month
                  </p>
                )}
                {plan.savings && (
                  <div className="mt-2 inline-block bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">
                    {plan.savings}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${plan.popular ? '' : 'bg-foreground/90 hover:bg-foreground'}`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          All plans include a 7-day money-back guarantee. No questions asked.
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
