
import { CheckCircle, XCircle } from "lucide-react";

const FeaturesList = () => {
  const features = [
    {
      title: "Profile Visibility",
      free: "Limited to 10 profiles per day",
      premium: "Unlimited profile visibility",
    },
    {
      title: "Messaging",
      free: "Can only respond to messages",
      premium: "Unlimited messaging & initiate conversations",
    },
    {
      title: "Advanced Filters",
      free: "Basic search filters",
      premium: "Advanced compatibility filters",
    },
    {
      title: "Profile Boost",
      free: "Standard visibility",
      premium: "Profile boosted in search results",
    },
    {
      title: "Read Receipts",
      free: "Not available",
      premium: "Know when your messages are read",
    },
    {
      title: "Interest Notifications",
      free: "Limited notifications",
      premium: "Real-time interest alerts",
    },
    {
      title: "Profile Badge",
      free: "Standard profile",
      premium: "Premium badge for higher response rates",
    },
    {
      title: "Photo Privacy",
      free: "Public photos only",
      premium: "Private photos with selective access",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Why Choose Premium?
          </h2>
          <p className="text-lg text-muted-foreground">
            Compare our plans and see how a premium membership can significantly
            increase your chances of finding your perfect match.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-6 px-4 sm:px-6 border-b">Features</th>
                <th className="text-center py-6 px-4 sm:px-6 border-b">
                  <span className="block font-normal text-muted-foreground">Basic</span>
                  <span className="text-xl font-semibold font-serif">Free</span>
                </th>
                <th className="text-center py-6 px-4 sm:px-6 border-b bg-primary/5 rounded-t-lg">
                  <span className="block font-normal text-primary">Recommended</span>
                  <span className="text-xl font-semibold font-serif">Premium</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white/50" : ""}>
                  <td className="text-left py-4 px-4 sm:px-6 font-medium">{feature.title}</td>
                  <td className="text-center py-4 px-4 sm:px-6">
                    {feature.free === "Not available" ? (
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    ) : (
                      <span className="text-sm text-muted-foreground">{feature.free}</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4 sm:px-6 bg-primary/5">
                    {feature.premium === "Not available" ? (
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-sm">{feature.premium}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
