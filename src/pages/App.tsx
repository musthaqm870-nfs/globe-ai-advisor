import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Map from "@/components/Map";
import { 
  Globe, MapPin, DollarSign, Shield, Users, ArrowLeft, 
  Plane, Calendar, TrendingUp, AlertTriangle, Check, Camera, LogOut, User, Loader2, Search, Map as MapIcon
} from "lucide-react";

interface SafetyData {
  name: string;
  score: number;
  message: string;
  sources_active: number;
  updated: string;
  riskLevel: string;
  color: string;
}

const AppPage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [safetySearchCountry, setSafetySearchCountry] = useState("JP");
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null);
  const [isFetchingSafety, setIsFetchingSafety] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Fetch default safety data for Japan on mount
    fetchSafetyData("JP");
  }, []);

  const fetchSafetyData = async (countryCode: string) => {
    setIsFetchingSafety(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-travel-safety", {
        body: { countryCode },
      });

      if (error) throw error;

      setSafetyData(data);
    } catch (error: any) {
      console.error("Error fetching safety data:", error);
      toast({
        title: "Failed to fetch safety data",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsFetchingSafety(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
              <span className="text-xl font-bold">TripMind</span>
            </Link>
          </div>
        </nav>

        {/* Traveler Type Selection */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Badge className="bg-primary/10 text-primary">Welcome to TripMind</Badge>
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
            <span className="text-xl font-bold">TripMind</span>
            <Badge className="ml-4">
              {travelerTypes.find(t => t.id === selectedType)?.icon} {travelerTypes.find(t => t.id === selectedType)?.title}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="ghost">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => setSelectedType(null)}>
              Change Profile
            </Button>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="planner" className="space-y-8">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-6">
            <TabsTrigger value="planner">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Planner</span>
            </TabsTrigger>
            <TabsTrigger value="map">
              <MapIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Map</span>
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
                    <Input 
                      id="destination" 
                      placeholder="e.g., Tokyo, Japan"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      disabled={isGenerating}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      placeholder="7"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      disabled={isGenerating}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <Input 
                      id="budget" 
                      type="number" 
                      placeholder="2000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      disabled={isGenerating}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests & Preferences</Label>
                  <Textarea 
                    id="interests" 
                    placeholder="e.g., temples, street food, photography, nightlife..."
                    rows={3}
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    disabled={isGenerating}
                  />
                </div>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full" 
                  onClick={async () => {
                    if (!destination || !duration || !budget || !interests) {
                      toast({
                        title: "Missing information",
                        description: "Please fill in all fields to generate an itinerary.",
                        variant: "destructive",
                      });
                      return;
                    }

                    setIsGenerating(true);
                    setGeneratedItinerary(null);

                    try {
                      const { data, error } = await supabase.functions.invoke("generate-trip", {
                        body: { 
                          destination, 
                          duration, 
                          budget: `$${budget}`, 
                          interests 
                        },
                      });

                      if (error) throw error;

                      setGeneratedItinerary(data.itinerary);
                      toast({
                        title: "Itinerary generated!",
                        description: "Your personalized trip plan is ready.",
                      });
                    } catch (error: any) {
                      console.error("Error generating itinerary:", error);
                      toast({
                        title: "Failed to generate itinerary",
                        description: error.message || "Please try again later.",
                        variant: "destructive",
                      });
                    } finally {
                      setIsGenerating(false);
                    }
                  }}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Generating Your Perfect Trip...
                    </>
                  ) : (
                    "Generate AI Itinerary"
                  )}
                </Button>

                {generatedItinerary && (
                  <div className="space-y-4 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Your AI-Generated Itinerary</h3>
                      <Badge className="bg-secondary">
                        {duration} {parseInt(duration) === 1 ? "Day" : "Days"} in {destination}
                      </Badge>
                    </div>
                    <Card className="border-l-4 border-l-primary">
                      <CardContent className="pt-6">
                        <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
                          {generatedItinerary}
                        </div>
                      </CardContent>
                    </Card>
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          setDestination("");
                          setDuration("");
                          setBudget("");
                          setInterests("");
                          setGeneratedItinerary(null);
                        }}
                      >
                        Create New Trip
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedItinerary);
                          toast({
                            title: "Copied!",
                            description: "Itinerary copied to clipboard.",
                          });
                        }}
                      >
                        Copy to Clipboard
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interactive Map */}
          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapIcon className="h-6 w-6 text-primary" />
                  Interactive Travel Map
                </CardTitle>
                <CardDescription>
                  Visualize destinations, itinerary stops, and safety zones on an interactive map
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden border">
                  <Map 
                    destinations={[
                      { name: "Tokyo, Japan", coordinates: [139.6917, 35.6895] },
                      { name: "Paris, France", coordinates: [2.3522, 48.8566] },
                      { name: "New York, USA", coordinates: [-74.0060, 40.7128] }
                    ]}
                    safetyZones={[
                      { coordinates: [139.6917, 35.6895], level: "safe" },
                      { coordinates: [2.3522, 48.8566], level: "moderate" }
                    ]}
                  />
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Map Legend</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
                      <span>Destination markers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white opacity-70"></div>
                      <span>Safe zones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white opacity-70"></div>
                      <span>Moderate risk zones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white opacity-70"></div>
                      <span>High risk zones</span>
                    </div>
                  </div>
                </div>
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
                <CardDescription>Real-time travel advisories and safety scores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="country-code" className="text-sm mb-2 block">
                      Search by Country Code (e.g., US, JP, GB, FR)
                    </Label>
                    <Input
                      id="country-code"
                      placeholder="Enter 2-letter country code"
                      value={safetySearchCountry}
                      onChange={(e) => setSafetySearchCountry(e.target.value.toUpperCase())}
                      maxLength={2}
                      disabled={isFetchingSafety}
                    />
                  </div>
                  <Button
                    onClick={() => fetchSafetyData(safetySearchCountry)}
                    disabled={isFetchingSafety || safetySearchCountry.length !== 2}
                    className="mt-auto"
                  >
                    {isFetchingSafety ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>

                {safetyData && (
                  <>
                    <div 
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        safetyData.color === "green" 
                          ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                          : safetyData.color === "blue"
                          ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                          : safetyData.color === "yellow"
                          ? "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
                          : safetyData.color === "orange"
                          ? "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800"
                          : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className={`rounded-full h-14 w-14 flex items-center justify-center font-bold text-xl ${
                            safetyData.color === "green"
                              ? "bg-green-500 text-white"
                              : safetyData.color === "blue"
                              ? "bg-blue-500 text-white"
                              : safetyData.color === "yellow"
                              ? "bg-yellow-500 text-white"
                              : safetyData.color === "orange"
                              ? "bg-orange-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {safetyData.score.toFixed(1)}
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{safetyData.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Risk Score: {safetyData.score} / 5.0
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Updated: {new Date(safetyData.updated).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={
                          safetyData.color === "green"
                            ? "bg-green-500"
                            : safetyData.color === "blue"
                            ? "bg-blue-500"
                            : safetyData.color === "yellow"
                            ? "bg-yellow-500"
                            : safetyData.color === "orange"
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }
                      >
                        {safetyData.riskLevel}
                      </Badge>
                    </div>

                    <Card className="border-l-4 border-l-primary">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Travel Advisory
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{safetyData.message}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                          <Shield className="h-4 w-4" />
                          Based on {safetyData.sources_active} active sources
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Risk Scale Explained:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span>≤ 2.0 Very Safe</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          <span>≤ 3.0 Safe</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <span>≤ 3.5 Moderate</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                          <span>≤ 4.0 High Risk</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span>&gt; 4.0 Extreme</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!safetyData && !isFetchingSafety && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Enter a country code to view safety information</p>
                  </div>
                )}
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
