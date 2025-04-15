
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface TwoFactorAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string, method: '2fa' | 'email' | 'sms') => Promise<boolean>;
}

const TwoFactorAuth = ({ isOpen, onClose, onVerify }: TwoFactorAuthProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState<'2fa' | 'email' | 'sms'>('2fa');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const success = await onVerify(code, method);
      
      if (success) {
        toast({
          title: "Verification Successful",
          description: "You have been successfully verified",
          variant: "default",
        });
        onClose();
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = () => {
    toast({
      title: "Code Resent",
      description: `A new verification code has been sent via ${method === 'email' ? 'email' : 'SMS'}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            Two-Factor Authentication
          </DialogTitle>
          <DialogDescription>
            Please enter the verification code to continue
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={method} onValueChange={(value) => setMethod(value as any)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="2fa">Authenticator</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="2fa">
            <p className="text-sm text-center mb-4">
              Enter the 6-digit code from your authenticator app
            </p>
          </TabsContent>
          
          <TabsContent value="email">
            <p className="text-sm text-center mb-4">
              Enter the 6-digit code sent to your email address
            </p>
          </TabsContent>
          
          <TabsContent value="sms">
            <p className="text-sm text-center mb-4">
              Enter the 6-digit code sent to your phone
            </p>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center py-4">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && (
          <div className="flex items-center text-destructive text-sm mt-2">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
          {method !== '2fa' && (
            <Button variant="outline" type="button" onClick={resendCode} disabled={isLoading}>
              Resend Code
            </Button>
          )}
          <Button type="button" onClick={handleVerify} disabled={isLoading || code.length !== 6}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorAuth;
