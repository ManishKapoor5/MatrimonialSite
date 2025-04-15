
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is included in the premium membership?",
      answer: "Our premium membership includes unlimited profile viewing and messaging, advanced search filters, profile boosts, read receipts, exclusive events, and priority customer support. The specific features vary based on the plan you choose."
    },
    {
      question: "How much does the premium plan cost?",
      answer: "We offer multiple premium plans to suit your needs. The monthly plan is $29.99, the quarterly plan is $59.99 ($19.99/month), and the yearly plan is $149.99 ($12.49/month), offering the best value with a 58% savings."
    },
    {
      question: "Can I cancel my premium membership?",
      answer: "Yes, you can cancel your premium membership at any time. We offer a 7-day money-back guarantee for all new subscriptions. After cancellation, you will continue to enjoy premium benefits until the end of your billing period."
    },
    {
      question: "How do I upgrade to premium?",
      answer: "To upgrade to premium, simply click on the 'Upgrade Now' button, select your preferred plan, and complete the payment process. Your premium features will be activated immediately after successful payment."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, all payment information is processed securely through industry-standard encryption. We never store your complete credit card details on our servers and use trusted payment processors."
    },
    {
      question: "Will my subscription renew automatically?",
      answer: "Yes, all premium plans are set to auto-renew by default to ensure uninterrupted service. You can turn off auto-renewal at any time from your account settings."
    },
    {
      question: "Do you offer special discounts?",
      answer: "We occasionally offer promotional discounts for new users or during special events. Subscribe to our newsletter to stay informed about any upcoming promotions or special offers."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our premium membership.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <a href="#" className="text-primary hover:underline font-medium">
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
