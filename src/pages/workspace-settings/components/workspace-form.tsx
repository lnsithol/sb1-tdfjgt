import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTeam } from '@/context/team-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';

const workspaceSchema = z.object({
  name: z.string().min(2, 'Workspace name must be at least 2 characters'),
  slug: z.string().min(2, 'Workspace URL must be at least 2 characters'),
});

type WorkspaceForm = z.infer<typeof workspaceSchema>;

export function WorkspaceForm() {
  const { currentWorkspace, updateWorkspace } = useTeam();

  const form = useForm<WorkspaceForm>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: currentWorkspace.name,
      slug: currentWorkspace.slug,
    },
  });

  const onSubmit = (data: WorkspaceForm) => {
    updateWorkspace(currentWorkspace.id, data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Workspace Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your workspace information and preferences.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={`https://avatar.vercel.sh/${currentWorkspace.slug}.png`}
          />
          <AvatarFallback>
            {currentWorkspace.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              Change Logo
            </Button>
            <Button variant="outline" size="sm">Remove</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Recommended: Square JPG, PNG, or GIF, at least 1000x1000px.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your workspace's visible name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace URL</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">
                      app.company.com/
                    </span>
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  This is your workspace's URL slug.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
}