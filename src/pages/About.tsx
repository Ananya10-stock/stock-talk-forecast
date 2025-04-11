
import React from 'react';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* About Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  About Stock Talk
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Empowering investors with AI-driven stock market predictions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
                <p className="mt-4 text-gray-500 md:text-xl">
                  Stock Talk was created to democratize access to advanced stock prediction tools. 
                  Our mission is to help investors make informed decisions by leveraging the power 
                  of machine learning and data science.
                </p>
                <p className="mt-4 text-gray-500 md:text-xl">
                  We believe that accurate predictions should be accessible to everyone, 
                  from beginners to experienced traders, without requiring deep knowledge 
                  of technical analysis or complex algorithms.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Our mission"
                  className="aspect-[4/3] overflow-hidden rounded-xl object-cover object-center"
                  src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1374&auto=format&fit=crop"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How Stock Talk Works
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Our platform combines historical data analysis with machine learning to predict future stock movements.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 lg:gap-16 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-finance-primary text-white">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Data Collection</h3>
                <p className="text-gray-500">
                  We gather historical stock price data and market indicators from reliable financial sources.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-finance-primary text-white">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-gray-500">
                  Our machine learning algorithms analyze patterns and trends to identify meaningful correlations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-finance-primary text-white">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Price Prediction</h3>
                <p className="text-gray-500">
                  Based on the analysis, the system generates forecasts for future stock prices with confidence scores.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Technology Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Technology</h2>
                <ul className="mt-8 space-y-6">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-finance-primary/10 text-finance-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Machine Learning</h3>
                      <p className="text-gray-500">
                        We use advanced machine learning techniques including regression analysis and time series forecasting.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-finance-primary/10 text-finance-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Data Analysis</h3>
                      <p className="text-gray-500">
                        Comprehensive analysis of historical price movements, trading volumes, and market trends.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-finance-primary/10 text-finance-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Real-time Updates</h3>
                      <p className="text-gray-500">
                        Web scraping techniques fetch live stock prices to provide up-to-date data alongside predictions.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Advanced technology"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1632&auto=format&fit=crop"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Disclaimer Section */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-2xl font-bold">Important Disclaimer</h2>
              <p className="text-gray-500">
                Stock Talk is provided for informational purposes only. The predictions generated by our 
                platform should not be considered as financial advice. Stock markets are volatile and past 
                performance is not indicative of future results. Always conduct your own research and 
                consult with a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-finance-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Predicting?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
                  Use our AI-powered tools to forecast stock movements and make informed investment decisions.
                </p>
              </div>
              <Link to="/predictions">
                <Button className="bg-white text-finance-primary hover:bg-gray-100">
                  Start Predicting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 Stock Talk. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/about" className="text-sm text-gray-500 hover:underline">About</Link>
            <Link to="/predictions" className="text-sm text-gray-500 hover:underline">Predictions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
