import React from 'react';

const About = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">
        <span className="text-white">About</span>
        <span className="text-neon-blue"> Us</span>
      </h2>
      <p className="text-accent/70 mb-8 sm:mb-12 text-sm sm:text-base">Learn about our journey, mission, and what makes us unique</p>
      
      {/* Company Overview */}
      <div className="relative overflow-hidden rounded-2xl mb-10 sm:mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-neon-purple/10 z-0"></div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 p-4 sm:p-8 z-10">
          <div className="col-span-1">
            <div className="h-full flex flex-col">
              <div className="flex-grow">
                <div className="w-12 sm:w-16 h-1 bg-neon-blue mb-4 sm:mb-6"></div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Our Story</h3>
              </div>
              <div className="mt-6 sm:mt-8 w-20 h-20 sm:w-24 sm:h-24 relative mx-auto md:mx-0">
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-slow"></div>
                <div className="absolute inset-2 rounded-full bg-dark border border-neon-blue flex items-center justify-center">
                  <span className="text-neon-blue font-bold text-base sm:text-lg">2016</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 backdrop-blur-sm bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10">
            <p className="mb-3 sm:mb-4 text-accent/80 text-sm sm:text-base">
              Founded in <span className="text-neon-blue font-semibold">2016</span>, Cool Star has been a leading provider of high-quality restaurant equipment 
              and supplies. What began as a small family business has grown into a trusted name in the 
              food service industry, serving customers across the country.
            </p>
            <p className="text-accent/80 text-sm sm:text-base">
              With over a decade of experience, we understand the unique challenges and requirements 
              of the food service industry. Our commitment to quality, innovation, and customer 
              satisfaction has made us a preferred partner for restaurants, cafes, hotels, and 
              institutional kitchens.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission Statement */}
      <div className="relative overflow-hidden rounded-2xl mb-10 sm:mb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark opacity-70"></div>
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-neon-purple/20 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        </div>
        
        <div className="relative z-10 py-10 sm:py-16 px-4 sm:px-8 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neon-blue/20 border border-neon-blue/50 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6">Our Mission</h3>
          <p className="text-base sm:text-xl text-accent/80 max-w-3xl mx-auto">
            At Cool Star, our mission is to empower food service businesses with reliable, 
            efficient, and innovative equipment solutions. We aim to be a one-stop solution for 
            all your restaurant equipment needs, offering products that enhance productivity, 
            reduce operational costs, and elevate the dining experience for your customers.
          </p>
        </div>
      </div>
      
      {/* Company Values */}
      <div className="mb-10 sm:mb-16">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Our Values</h3>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-neon-purple mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <ValueCard 
            title="Quality Excellence" 
            icon={<QualityIcon />}
            color="from-primary to-neon-blue"
          >
            We source only the highest quality products, ensuring durability and performance that exceeds expectations.
          </ValueCard>
          
          <ValueCard 
            title="Customer Focus" 
            icon={<CustomerIcon />}
            color="from-neon-purple to-neon-pink"
          >
            Your satisfaction is our priority. We work closely with you to understand and meet your specific needs.
          </ValueCard>
          
          <ValueCard 
            title="Innovation" 
            icon={<InnovationIcon />}
            color="from-neon-blue to-neon-green"
          >
            We constantly seek out the latest technologies and solutions to keep your business ahead of the curve.
          </ValueCard>
          
          <ValueCard 
            title="Integrity" 
            icon={<IntegrityIcon />}
            color="from-neon-pink to-primary"
          >
            We conduct business with honesty, transparency, and ethical standards you can trust.
          </ValueCard>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="backdrop-blur-sm bg-white/5 p-4 sm:p-8 rounded-2xl border border-white/10 mb-10">
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">Our Team</h3>
        <p className="text-accent/80 text-sm sm:text-base">
          Our team comprises industry experts with extensive knowledge of restaurant equipment 
          and the food service industry. With their combined expertise, we provide not just 
          products but comprehensive solutions tailored to your specific requirements.
        </p>
        
        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-6 sm:gap-8">
          {[
            { name: 'Rajeev Kashyap', role: 'CEO & Founder', avatar: 'RK' },
            { name: 'Rinku Kashyap', role: 'Product Specialist', avatar: 'RK' },
            { name: 'Ram Rattan Kashyap', role: 'Customer Relations', avatar: 'RK' },
          ].map((member, idx) => (
            <div key={idx} className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary/30 to-neon-blue/30 border border-neon-blue/50 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="text-white text-lg sm:text-xl font-bold">{member.avatar}</span>
              </div>
              <h4 className="text-white font-semibold text-sm sm:text-base">{member.name}</h4>
              <p className="text-accent/60 text-xs sm:text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Value Card Component
const ValueCard = ({ title, icon, color, children }) => (
  <div className="backdrop-blur-sm bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 sm:mb-4`}>
      {icon}
    </div>
    <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors duration-200">
      {title}
    </h4>
    <p className="text-accent/70 text-sm sm:text-base">{children}</p>
  </div>
);

// Icons
const QualityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CustomerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const InnovationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const IntegrityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default About;
