import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const notifications = [
  {
    id: 'all',
    label: 'All new messages',
    description: 'Get notified when you receive a new message.',
  },
  {
    id: 'mentions',
    label: 'Mentions',
    description: 'Get notified when someone mentions you.',
  },
  {
    id: 'updates',
    label: 'Product updates',
    description: 'Get notified about new features and updates.',
  },
];

export function NotificationsForm() {
  const form = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {notifications.map((notification) => (
            <FormField
              key={notification.id}
              control={form.control}
              name={`notifications.${notification.id}`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{notification.label}</FormLabel>
                    <FormDescription>{notification.description}</FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Save preferences</Button>
        </form>
      </Form>
    </div>
  );
}