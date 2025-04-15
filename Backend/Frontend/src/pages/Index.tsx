
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Profile1 from '@/assets/Matches.png';
import CardImg from '@/assets/CardMatrimonial.png';
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6 animate-fade-in">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-primary mb-4">
                    PBST Rishte-Nate Free Seva
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
                    Connect Hearts,<br />Build Futures
                  </h1>
                </div>
                
                <p className="text-lg text-muted-foreground max-w-lg">
                  Streamline your matchmaking process with our intelligent profile management system. Designed specifically for matrimonial services like PBST Rishte-Nate.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/auth"
                    className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 transition-all hover:shadow-md"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/profiles"
                    className="px-6 py-3 rounded-lg bg-secondary text-primary font-medium hover:bg-secondary/70 transition-all"
                  >
                    View Profiles
                  </Link>
                </div>
              </div>
              
            <div className="md:w-1/2 h-full rounded-xl glass animate-slide-in">
              <img
                src={Profile1}
                alt="Profile"
                className="rounded-lg w-full h-full object-cover animate-fade-in"
              />
            </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 border border-border/40 card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Profile Collection</h3>
                <p className="text-muted-foreground">
                  Automatically collect profiles from WhatsApp links and format them according to your standards.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border/40 card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Smart Search</h3>
                <p className="text-muted-foreground">
                  Quickly find matching profiles with advanced filters and intelligent search capabilities.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border/40 card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Private Management</h3>
                <p className="text-muted-foreground">
                  Maintain control over profile visibility with a private management system only you can access.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 h-80 rounded-xl overflow-hidden order-1 md:order-1">
                <div className="w-full h-full flex items-center justify-center p-6">
                  <div className="w-full max-w-xs space-y-4">
                    {/* <div className="h-6 bg-secondary/60 rounded-full w-3/4"></div>
                    <div className="h-10 bg-secondary/40 rounded-lg w-full"></div>
                    <div className="h-10 bg-secondary/40 rounded-lg w-full"></div>
                    <div className="h-10 bg-secondary/40 rounded-lg w-full"></div>
                    <div className="h-10 bg-primary/30 rounded-lg w-1/2 ml-auto"></div> */}
                    <img src={CardImg} alt="Profile" className="rounded-lg w-full h-full object-cover animate-fade-in" />
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 space-y-6 order-2 md:order-2">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                  Designed for Scale and Efficiency
                </h2>
                
                <p className="text-lg text-muted-foreground">
                  Handle thousands of profiles with ease. Our system is built to manage 50,000+ profiles while maintaining speed and reliability.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Responsive design for both mobile and desktop</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Track marriage bureau contacts automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Import existing WhatsApp group profiles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Ready to Simplify Your Matchmaking Process?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Start managing your profiles efficiently today with our powerful yet intuitive platform.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 transition-all hover:shadow-md"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
