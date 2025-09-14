import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="hidden lg:block space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-primary font-semibold">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Blue Carbon Registry</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight">
              Protecting Our
              <span className="gradient-primary bg-clip-text text-transparent"> Blue Planet</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join the world's first blockchain-based blue carbon MRV system. 
              Track, verify, and trade mangrove restoration credits with AI-powered validation.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 py-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">2.5M+</div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-secondary">15,000</div>
              <div className="text-sm text-muted-foreground">Hectares Restored</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-accent">500+</div>
              <div className="text-sm text-muted-foreground">Communities</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <span className="text-success">✓</span>
              </div>
              <span className="text-foreground">AI-powered fraud detection</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <span className="text-success">✓</span>
              </div>
              <span className="text-foreground">Satellite NDVI monitoring</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <span className="text-success">✓</span>
              </div>
              <span className="text-foreground">Blockchain transparency</span>
            </div>
          </div>
        </div>
        
        {/* Auth Form */}
        <div className="flex justify-center">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}