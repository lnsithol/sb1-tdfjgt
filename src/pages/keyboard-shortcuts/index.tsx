import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const shortcuts = {
  General: [
    { keys: ['⌘', 'K'], description: 'Open command palette' },
    { keys: ['⌘', '/'], description: 'Show keyboard shortcuts' },
    { keys: ['⌘', 'P'], description: 'Open profile settings' },
  ],
  Navigation: [
    { keys: ['⌘', '1'], description: 'Go to Dashboard' },
    { keys: ['⌘', '2'], description: 'Go to Team' },
    { keys: ['⌘', '3'], description: 'Go to Projects' },
    { keys: ['⌘', '4'], description: 'Go to Calendar' },
  ],
  Actions: [
    { keys: ['⌘', 'S'], description: 'Save changes' },
    { keys: ['⌘', '⌫'], description: 'Delete item' },
    { keys: ['⌘', 'N'], description: 'Create new item' },
  ],
};

function ShortcutKey({ children }: { children: string }) {
  return (
    <kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-2.5 font-mono text-sm font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

export function KeyboardShortcuts() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Keyboard Shortcuts</h2>
        <p className="text-muted-foreground">
          Master the keyboard shortcuts to boost your productivity.
        </p>
      </div>

      <div className="grid gap-6">
        {Object.entries(shortcuts).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>
                Essential {category.toLowerCase()} keyboard shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((shortcut, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-2">
                      {shortcut.keys.map((key, keyIndex) => (
                        <ShortcutKey key={keyIndex}>{key}</ShortcutKey>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}