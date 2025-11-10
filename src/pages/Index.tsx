import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Shield, DollarSign, Users, Plane, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-travel.jpg";
import planningImage from "@/assets/feature-planning.jpg";
import expensesImage from "@/assets/feature-expenses.jpg";
import safetyImage from "@/assets/feature-safety.jpg";
import communityImage from "@/assets/feature-community.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">NomadAI</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">How It Works</a>
            <a href="#pricing" className="text-foreground/70 hover:text-foreground transition-colors">Pricing</a>
            <Link to="/app">
              <Button variant="hero" size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <Badge className="bg-secondary text-secondary-foreground">AI-Powered Travel Companion</Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your Journey,
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Perfected</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Plan smarter, travel safer, and connect with fellow adventurers worldwide. All powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/app">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Start Your Adventure <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Travelers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </div>
            <div className="relative animate-float">
              <img 
                src={heroImage} 
                alt="Travelers at sunset" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">AI Trip Generated</div>
                    <div className="text-sm text-muted-foreground">In 30 seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">Features</Badge>
            <h2 className="text-4xl font-bold">Everything You Need to Travel Smart</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From AI-powered planning to real-time safety alerts, NomadAI has your back
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: MapPin, title: "AI Trip Planner", desc: "Personalized itineraries in seconds", color: "text-primary" },
              { icon: DollarSign, title: "Expense Tracker", desc: "OCR receipt scanning & budgeting", color: "text-secondary" },
              { icon: Shield, title: "Safety Alerts", desc: "Real-time location-based warnings", color: "text-primary" },
              { icon: Users, title: "Connect Travelers", desc: "Meet nomads nearby", color: "text-secondary" },
            ].map((feature, i) => (
              <Card key={i} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2">
                <CardHeader>
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <img 
                src={planningImage} 
                alt="AI Planning" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardHeader>
                <CardTitle>AI-Powered Itinerary Builder</CardTitle>
                <CardDescription>
                  Input your budget, duration, and interests. Our AI generates a perfect day-by-day plan with routes, attractions, and cost estimates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <img 
                src={expensesImage} 
                alt="Expense Tracking" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardHeader>
                <CardTitle>Smart Expense Management</CardTitle>
                <CardDescription>
                  Scan receipts with OCR, auto-convert currencies, and track spending against your budget with real-time alerts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <img 
                src={safetyImage} 
                alt="Safety Features" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardHeader>
                <CardTitle>Travel Safety AI</CardTitle>
                <CardDescription>
                  Get real-time safety scores, scam alerts, weather warnings, and political updates for every location you visit.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <img 
                src={communityImage} 
                alt="Community" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardHeader>
                <CardTitle>Traveler Community</CardTitle>
                <CardDescription>
                  Connect with verified travelers nearby, share itineraries, and find co-working spaces or local meetups.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">Simple Process</Badge>
            <h2 className="text-4xl font-bold">Get Started in 3 Steps</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Choose Your Profile", desc: "Select from Digital Nomad, Solo Traveler, Frequent Flyer, Backpacker, or Influencer" },
              { num: "02", title: "Let AI Plan", desc: "Input your destination, budget, and preferences. AI generates your perfect itinerary" },
              { num: "03", title: "Travel Smart", desc: "Track expenses, stay safe with alerts, and connect with travelers worldwide" },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-7xl font-bold text-primary/10 mb-4">{step.num}</div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 text-primary/30 h-8 w-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traveler Types */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Every Type of Traveler</h2>
            <p className="text-xl text-muted-foreground">Personalized experiences for your unique journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: "Digital Nomad", icon: "💻", desc: "Long-term stays + co-working spaces" },
              { title: "Solo Traveler", icon: "🎒", desc: "Safety-first + social connections" },
              { title: "Frequent Flyer", icon: "✈️", desc: "Efficiency + real-time updates" },
              { title: "Backpacker", icon: "🏕️", desc: "Budget-friendly + offline mode" },
              { title: "Influencer", icon: "📸", desc: "Trending spots + event alerts" },
            ].map((type, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="text-5xl mb-3">{type.icon}</div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription className="text-sm">{type.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">Pricing</Badge>
            <h2 className="text-4xl font-bold">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">Start free, upgrade when ready</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                name: "Free", 
                price: "$0", 
                desc: "Perfect for trying out NomadAI",
                features: ["Basic AI trip planning", "Safety alerts", "Community access", "Limited expense tracking"] 
              },
              { 
                name: "Pro", 
                price: "$9.99", 
                desc: "Most popular for regular travelers",
                features: ["Advanced AI itineraries", "Unlimited expense tracking", "Offline maps & phrases", "Priority support", "Multi-currency support"],
                popular: true
              },
              { 
                name: "Elite", 
                price: "$19.99", 
                desc: "For frequent travelers",
                features: ["All Pro features", "NFC wearable device", "AI voice assistant", "Priority safety alerts", "Early access to features"] 
              },
            ].map((plan, i) => (
              <Card key={i} className={`relative ${plan.popular ? 'border-primary border-2 shadow-lg' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-4xl font-bold mt-4">
                    {plan.price}
                    <span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>{plan.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/app" className="block">
                    <Button 
                      variant={plan.popular ? "hero" : "outline"} 
                      className="w-full"
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Transform Your Travel?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of travelers who plan smarter, travel safer, and connect better with NomadAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/app">
              <Button variant="secondary" size="lg" className="text-lg px-8">
                Start Free Trial <Plane className="ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">NomadAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your AI-powered travel companion for smarter, safer adventures
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 NomadAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
