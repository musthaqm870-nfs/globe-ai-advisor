import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Globe, MapPin, DollarSign, Shield, Users, ArrowLeft, 
  Plane, Calendar, TrendingUp, AlertTriangle, Check, Camera
} from "lucide-react";
import { Link } from "react-router-dom";

const AppPage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showPlanner, setShowPlanner] = useState(false);

  const travelerTypes = [
    { 
      id: "nomad", 
      title: "Digital Nomad", 
      icon: "💻", 
      desc: "Work remotely while exploring the world",
      features: ["Co-working spaces", "Long-term stays", "Visa guides"]
    },
    { 
      id: "solo", 
      title: "Solo Traveler", 
      icon: "🎒", 
      desc: "Independent adventures with safety first",
      features: ["Safety alerts", "Meet travelers", "Solo-friendly spots"]
    },
    { 
      id: "flyer", 
      title: "Frequent Flyer", 
      icon: "✈️", 
      desc: "Efficient travel for busy professionals",
      features: ["Real-time updates", "Fast rebooking", "Lounge finder"]
    },
    { 
      id: "backpacker", 
      title: "Backpacker", 
      icon: "🏕️", 
      desc: "Budget-friendly adventures",
      features: ["Budget tracking", "Hostel finder", "Offline maps"]
    },
    { 
      id: "influencer", 
      title: "Influencer", 
      icon: "📸", 
      desc: "Content creators on the move",
      features: ["Trending spots", "Event alerts", "Photo locations"]
    },
  ];

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <nav className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">NomadAI</span>
            </Link>
          </div>
        </nav>

        {/* Traveler Type Selection */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Badge className="bg-primary/10 text-primary">Welcome to NomadAI</Badge>
              <h1 className="text-4xl font-bold">What Type of Traveler Are You?</h1>
              <p className="text-xl text-muted-foreground">
                Choose your profile to get personalized recommendations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelerTypes.map((type) => (
                <Card 
                  key={type.id}
                  className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 hover:border-primary"
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardHeader>
                    <div className="text-5xl mb-3">{type.icon}</div>
                    <CardTitle>{type.title}</CardTitle>
                    <CardDescription>{type.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-lg bg-card/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">NomadAI</span>
            <Badge className="ml-4">
              {travelerTypes.find(t => t.id === selectedType)?.icon} {travelerTypes.find(t => t.id === selectedType)?.title}
            </Badge>
          </div>
          <Button variant="ghost" onClick={() => setSelectedType(null)}>
            Change Profile
          </Button>
        </div>
      </nav>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="planner" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
            <TabsTrigger value="planner">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Planner</span>
            </TabsTrigger>
            <TabsTrigger value="expenses">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="safety">
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Safety</span>
            </TabsTrigger>
            <TabsTrigger value="community">
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger value="trips">
              <Plane className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Trips</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Trip Planner */}
          <TabsContent value="planner" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  AI Trip Planner
                </CardTitle>
                <CardDescription>
                  Let AI create your perfect itinerary in seconds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input id="destination" placeholder="e.g., Tokyo, Japan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input id="duration" type="number" placeholder="7" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <Input id="budget" type="number" placeholder="2000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests & Preferences</Label>
                  <Textarea 
                    id="interests" 
                    placeholder="e.g., temples, street food, photography, nightlife..."
                    rows={3}
                  />
                </div>
                <Button variant="hero" size="lg" className="w-full" onClick={() => setShowPlanner(true)}>
                  Generate AI Itinerary
                </Button>

                {showPlanner && (
                  <div className="space-y-4 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Your AI-Generated Itinerary</h3>
                      <Badge className="bg-secondary">7 Days in Tokyo</Badge>
                    </div>
                    {[1, 2, 3].map((day) => (
                      <Card key={day} className="border-l-4 border-l-primary">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Day {day}</CardTitle>
                            <Badge variant="outline">$280 est.</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-semibold">Morning: Senso-ji Temple</div>
                              <p className="text-sm text-muted-foreground">Explore Tokyo's oldest temple in Asakusa. Arrive early to avoid crowds.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-semibold">Afternoon: Tsukiji Outer Market</div>
                              <p className="text-sm text-muted-foreground">Fresh sushi and street food. Budget: $50</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-semibold">Evening: Shibuya Crossing</div>
                              <p className="text-sm text-muted-foreground">Experience the world's busiest intersection and explore Shibuya nightlife.</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="flex gap-3">
                      <Button className="flex-1">Export to PDF</Button>
                      <Button variant="outline" className="flex-1">Adjust Itinerary</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expense Tracker */}
          <TabsContent value="expenses" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Total Budget</CardTitle>
                  <div className="text-3xl font-bold">$2,000</div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Spent</CardTitle>
                  <div className="text-3xl font-bold text-secondary">$1,247</div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Remaining</CardTitle>
                  <div className="text-3xl font-bold text-primary">$753</div>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-6 w-6 text-primary" />
                  Scan Receipt
                </CardTitle>
                <CardDescription>Use OCR to automatically track expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Click to upload receipt or take photo</p>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold">Recent Expenses</h4>
                  {[
                    { name: "Ramen Dinner", amount: "$45", category: "Food", date: "Today" },
                    { name: "Metro Pass", amount: "$12", category: "Transport", date: "Today" },
                    { name: "Hotel", amount: "$180", category: "Accommodation", date: "Yesterday" },
                  ].map((expense, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">{expense.name}</div>
                        <div className="text-sm text-muted-foreground">{expense.category} • {expense.date}</div>
                      </div>
                      <div className="font-bold">{expense.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Alerts */}
          <TabsContent value="safety" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Travel Safety Center
                </CardTitle>
                <CardDescription>Real-time alerts for your location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl">
                      8.2
                    </div>
                    <div>
                      <div className="font-semibold">Tokyo Safety Score</div>
                      <div className="text-sm text-muted-foreground">Very Safe - Updated 2 hours ago</div>
                    </div>
                  </div>
                  <Badge className="bg-primary">Excellent</Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-secondary" />
                    Active Alerts
                  </h4>
                  {[
                    { type: "Weather", title: "Heavy Rain Expected", desc: "Tomorrow 2-5 PM. Plan indoor activities.", severity: "low" },
                    { type: "Traffic", title: "Station Closure", desc: "Shibuya Station maintenance this weekend.", severity: "medium" },
                  ].map((alert, i) => (
                    <div key={i} className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === "low" ? "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20" : "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20"
                    }`}>
                      <div className="font-semibold">{alert.type}: {alert.title}</div>
                      <p className="text-sm text-muted-foreground">{alert.desc}</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  View All Safety Tips for Tokyo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Travelers Nearby
                </CardTitle>
                <CardDescription>Connect with verified travelers in Tokyo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Sarah Chen", type: "Digital Nomad 💻", location: "Shibuya", interests: "Co-working, cafes", verified: true },
                  { name: "Mike Torres", type: "Backpacker 🏕️", location: "Shinjuku", interests: "Street food, hiking", verified: true },
                  { name: "Emma Liu", type: "Influencer 📸", location: "Harajuku", interests: "Photography, fashion", verified: true },
                ].map((traveler, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold">
                        {traveler.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {traveler.name}
                          {traveler.verified && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="text-sm text-muted-foreground">{traveler.type} • {traveler.location}</div>
                        <div className="text-xs text-muted-foreground">{traveler.interests}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                ))}
                <Button className="w-full" variant="hero">
                  Find More Travelers
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Trips */}
          <TabsContent value="trips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-6 w-6 text-primary" />
                  My Trips
                </CardTitle>
                <CardDescription>Manage your travel history and upcoming adventures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Upcoming</h4>
                  <div className="p-4 bg-gradient-sky rounded-lg text-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl font-bold">Tokyo, Japan</div>
                      <Badge className="bg-white/20 text-white border-0">7 days</Badge>
                    </div>
                    <p className="text-sm opacity-90">Dec 15 - Dec 22, 2025</p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="bg-white/20 hover:bg-white/30 border-0">
                        View Itinerary
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Past Trips</h4>
                  {[
                    { dest: "Barcelona, Spain", dates: "Oct 2025", spent: "$1,850" },
                    { dest: "Bangkok, Thailand", dates: "Aug 2025", spent: "$980" },
                  ].map((trip, i) => (
                    <div key={i} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{trip.dest}</div>
                          <div className="text-sm text-muted-foreground">{trip.dates} • Spent: {trip.spent}</div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppPage;
