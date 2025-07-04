"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Activity, 
  BookOpen, 
  Brain, 
  Dumbbell, 
  Play, 
  Star, 
  TrendingUp, 
  Users, 
  Zap,
  Menu,
  X,
  ArrowRight,
  Check,
  Target,
  Heart,
  Trophy
} from 'lucide-react';

const FitraLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update feature gradients for minimal yellow/black theme
  const features = [
    {
      icon: <Activity className="w-12 h-12" />,
      title: "Smart Workout Tracker",
      description: "Track your workouts with AI-powered insights and personalized recommendations.",
      gradient: "from-yellow-300 to-yellow-400"
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Fitness Journal",
      description: "Document your journey with mood tracking, progress photos, and personal reflections.",
      gradient: "from-zinc-200 to-yellow-100"
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Meditation Hub",
      description: "Find inner peace with guided meditations, breathing exercises, and mindfulness sessions.",
      gradient: "from-lime-200 to-yellow-200"
    },
    {
      icon: <Dumbbell className="w-12 h-12" />,
      title: "Exercise Library",
      description: "Access 1000+ exercises with video demonstrations and detailed instructions.",
      gradient: "from-yellow-200 to-yellow-400"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "1M+", label: "Workouts Completed", icon: <Dumbbell className="w-6 h-6" /> },
    { number: "95%", label: "User Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Heart className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "Fitra transformed my fitness journey completely. The meditation feature helps me stay mentally strong!",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Personal Trainer",
      content: "I recommend Fitra to all my clients. The workout tracking is incredibly detailed and motivating.",
      avatar: "👨‍💪",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Yoga Instructor",
      content: "The journaling feature is a game-changer. It helps me understand my progress on a deeper level.",
      avatar: "🧘‍♀️",
      rating: 5
    }
  ];

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} className="text-gray-800 hover:text-purple-600 font-medium transition-colors duration-300 relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
    </a>
  );

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-zinc-900 tracking-tight">
                Fitra
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#about">About</NavLink>
                <NavLink href="#testimonials">Reviews</NavLink>
                <NavLink href="#pricing">Pricing</NavLink>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-zinc-700 hover:text-yellow-500 font-medium transition-colors">
                Sign In
              </button>
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-6 py-2 rounded-full font-semibold shadow-sm hover:scale-105 transition-all duration-300"
                onClick={() => router.push("/auth/login")}
              >
                Get Started
              </button>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-purple-600"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Features</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-purple-600">About</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Reviews</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Pricing</a>
              <div className="pt-4 pb-2">
                <button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-6 py-2 rounded-full font-semibold"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/auth/login");
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-zinc-100 via-yellow-50 to-yellow-100 text-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Transform Your
                  <span className="block text-yellow-500">Fitness Journey</span>
                </h1>
                <p className="text-xl text-zinc-600 max-w-2xl">
                  The all-in-one fitness companion that tracks your workouts, nurtures your mind, 
                  and celebrates your progress. Start your transformation today.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-8 py-4 rounded-full font-semibold text-lg shadow-sm hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-zinc-900 text-zinc-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-zinc-900 hover:text-white transition-all duration-300 flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-8">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center text-sm font-bold">👩</div>
                  <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center text-sm font-bold">👨</div>
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold">👩</div>
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-sm font-bold">👨</div>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-500">Loved by 50,000+ users</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl p-8 backdrop-blur-sm border border-zinc-200 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Today's Progress</h3>
                    <div className="bg-lime-400 text-zinc-900 px-3 py-1 rounded-full text-sm font-semibold">
                      On Track!
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-100 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-bold text-yellow-500">85%</div>
                      <div className="text-sm text-zinc-500">Calories Burned</div>
                    </div>
                    <div className="bg-yellow-100 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-bold text-yellow-500">12</div>
                      <div className="text-sm text-zinc-500">Workouts</div>
                    </div>
                    <div className="bg-yellow-100 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-bold text-lime-500">8.2k</div>
                      <div className="text-sm text-zinc-500">Steps</div>
                    </div>
                    <div className="bg-yellow-100 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-bold text-cyan-500">45m</div>
                      <div className="text-sm text-zinc-500">Meditation</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-yellow-100 rounded-full opacity-30 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4 group-hover:bg-yellow-200 transition-colors">
                  <div className="text-yellow-500">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{stat.number}</div>
                <div className="text-zinc-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
              Everything You Need to
              <span className="block text-yellow-500">Succeed</span>
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              Fitra combines cutting-edge technology with proven fitness science to deliver 
              a comprehensive wellness experience tailored just for you.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-zinc-900 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{feature.title}</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">{feature.description}</p>
                <button className="mt-6 text-yellow-600 font-semibold flex items-center hover:text-yellow-700 transition-colors">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-100 to-yellow-50 text-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Beautiful Design
                  <span className="block text-yellow-500">Powerful Features</span>
                </h2>
                <p className="text-xl text-zinc-600 leading-relaxed">
                  Our intuitive interface makes tracking your fitness journey effortless and enjoyable. 
                  Every screen is designed with your success in mind.
                </p>
              </div>
              <div className="space-y-4">
                {['Real-time progress tracking', 'Personalized workout plans', 'Social community features', 'Advanced analytics'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-zinc-900" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <button className="bg-zinc-900 text-yellow-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-zinc-800 transition-colors duration-300">
                Try It Now
              </button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 backdrop-blur-sm border border-zinc-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Workout Dashboard</h3>
                    <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-yellow-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Push-ups</span>
                        <span className="text-sm text-yellow-500">3 sets</span>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full w-[75%]"></div>
                      </div>
                    </div>
                    <div className="bg-yellow-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Squats</span>
                        <span className="text-sm text-yellow-500">4 sets</span>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-2">
                        <div className="bg-lime-400 h-2 rounded-full w-[60%]"></div>
                      </div>
                    </div>
                    <div className="bg-yellow-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Planks</span>
                        <span className="text-sm text-yellow-500">5 sets</span>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-2">
                        <div className="bg-cyan-400 h-2 rounded-full w-[90%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
              Loved by Thousands
              <span className="block text-yellow-500">of Fitness Enthusiasts</span>
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our community has to say about their 
              transformation journey with Fitra.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 border border-zinc-100">
                <div className="flex items-center space-x-1 mb-6">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-700 text-lg leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900">{testimonial.name}</div>
                    <div className="text-zinc-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900 text-yellow-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Ready to Start Your
              <span className="block">Transformation?</span>
            </h2>
            <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
              Join thousands of people who have already transformed their lives with Fitra. 
              Your fitness journey starts with a single step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-yellow-400 text-zinc-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-500 transition-colors duration-300 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
              <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 hover:text-zinc-900 transition-colors duration-300">
                Contact Sales
              </button>
            </div>
            <p className="text-sm text-yellow-300">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-yellow-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="text-3xl font-bold text-yellow-400 mb-4">
                Fitra
              </div>
              <p className="text-yellow-200 text-lg max-w-md">
                Transform your fitness journey with the most comprehensive wellness app. 
                Track, journal, meditate, and exercise your way to a better you.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold text-zinc-900">f</span>
                </div>
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold text-zinc-900">t</span>
                </div>
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold text-zinc-900">i</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Product</h3>
              <div className="space-y-4">
                <a href="#" className="block text-yellow-200 hover:text-yellow-400 transition-colors">Features</a>
                <a href="#" className="block text-yellow-200 hover:text-yellow-400 transition-colors">Pricing</a>
                <a href="#" className="block text-yellow-200 hover:text-yellow-400 transition-colors">Download</a>
                <a href="#" className="block text-yellow-200 hover:text-yellow-400 transition-colors">Updates</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Support</h3>
              <div className="space-y-4">
                <a href="#" className="block text-yellow-200 hover:text-yellow-400 transition-colors">Help Center</a>
                <a href="#" className="block text-yellow-200 hover:text-yellow-400 transition-colors">Contact Us</a>
                <a href="#" className="block text-yellow-200 hover:text-yellow-400 transition-colors">Privacy Policy</a>
                <a href="#" className="block text-yellow-200 hover:text-yellow-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-yellow-800 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <p className="text-yellow-200">
                © 2025 Fitra. All rights reserved.
              </p>
              <p className="text-yellow-200 mt-4 lg:mt-0">
                Made with ❤️ for fitness enthusiasts worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FitraLandingPage;