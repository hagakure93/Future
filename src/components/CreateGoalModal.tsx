import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Target } from 'lucide-react';

interface CreateGoalModalProps {
  onCreateGoal: (title: string, targetAmount: number, emoji: string) => void;
}

const EMOJI_OPTIONS = [
  '🏠', '🚗', '✈️', '🎓', '💍', '🏖️', '📱', '💻', 
  '🎯', '💰', '🎉', '🎁', '🌟', '🔥', '💎', '🚀',
  '🏆', '🎪', '🎨', '🎭', '🎲', '🎸', '🎺', '⚽'
];

export function CreateGoalModal({ onCreateGoal }: CreateGoalModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎯');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && targetAmount && parseFloat(targetAmount) > 0) {
      onCreateGoal(title.trim(), parseFloat(targetAmount), selectedEmoji);
      setTitle('');
      setTargetAmount('');
      setSelectedEmoji('🎯');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-hero hover:shadow-glow transition-all duration-300" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Nueva Meta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Target className="h-6 w-6 text-primary" />
            Crear Nueva Meta de Ahorro
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="emoji">Selecciona un emoji</Label>
            <div className="grid grid-cols-8 gap-2 p-3 bg-muted/20 rounded-lg">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`text-2xl p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                    selectedEmoji === emoji 
                      ? 'bg-primary/20 ring-2 ring-primary scale-110' 
                      : 'hover:bg-muted/40'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Nombre de la meta</Label>
            <Input
              id="title"
              placeholder="ej. Casa nueva, Vacaciones..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Cantidad objetivo (€)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="20000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="text-lg"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            Crear Meta
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}