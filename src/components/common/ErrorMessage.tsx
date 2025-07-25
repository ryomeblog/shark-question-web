import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  variant?: 'default' | 'destructive';
}

export function ErrorMessage({ 
  message, 
  onDismiss, 
  variant = 'destructive' 
}: ErrorMessageProps) {
  return (
    <Alert variant={variant} className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-auto p-1 hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}