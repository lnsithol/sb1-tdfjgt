import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Download, RefreshCw } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'sonner';

export function BackupCodes() {
  const [showCodes, setShowCodes] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);

  const generateCodes = useMutation({
    mutationFn: async () => {
      const response = await api.post<{ codes: string[] }>('/auth/backup-codes');
      return response.data;
    },
    onSuccess: (data) => {
      setCodes(data.codes);
      setShowCodes(true);
      toast.success('New backup codes generated');
    },
  });

  const downloadCodes = () => {
    const text = codes.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Backup Codes</h3>
        <p className="text-sm text-muted-foreground">
          Generate backup codes to access your account if you lose your
          authenticator device.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recovery Codes</CardTitle>
          <CardDescription>
            Save these codes in a secure place. Each code can only be used once.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => generateCodes.mutate()}
            disabled={generateCodes.isPending}
          >
            {generateCodes.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate New Codes
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showCodes} onOpenChange={setShowCodes}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Backup Codes</DialogTitle>
            <DialogDescription>
              Store these codes in a secure password manager. They can be used to
              regain access to your account if you lose your authenticator device.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 font-mono text-sm">
            {codes.map((code, index) => (
              <div
                key={index}
                className="p-2 bg-muted rounded-md text-center"
              >
                {code}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCodes(false)}>
              Close
            </Button>
            <Button onClick={downloadCodes}>
              <Download className="mr-2 h-4 w-4" />
              Download Codes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}