import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { SavingGoal } from '@/types/savings';

interface SavingGoalCardProps {
  goal: SavingGoal;
  onUpdateAmount: (goalId: string, amount: number, type: 'add' | 'subtract') => void;
  onDelete: (goalId: string) => void;
}

export function SavingGoalCard({ goal, onUpdateAmount, onDelete }: SavingGoalCardProps) {
  const [inputAmount, setInputAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const progressPercentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remainingAmount = Math.max(goal.targetAmount - goal.currentAmount, 0);

  const handleAddMoney = () => {
    const amount = parseFloat(inputAmount);
    if (amount > 0) {
      onUpdateAmount(goal.id, amount, 'add');
      setInputAmount('');
      setIsEditing(false);
    }
  };

  const handleSubtractMoney = () => {
    const amount = parseFloat(inputAmount);
    if (amount > 0) {
      onUpdateAmount(goal.id, amount, 'subtract');
      setInputAmount('');
      setIsEditing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-card shadow-card border-border/50 hover:shadow-glow transition-all duration-300 animate-scale-in">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{goal.emoji}</span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{goal.title}</h3>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(goal.currentAmount)} de {formatCurrency(goal.targetAmount)}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(goal.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progreso</span>
            <span className="text-primary font-medium">{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Faltan {formatCurrency(remainingAmount)} para tu meta
          </p>
        </div>

        {!isEditing ? (
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir dinero
            </Button>
          </div>
        ) : (
          <div className="space-y-3 animate-slide-up">
            <Input
              type="number"
              placeholder="Cantidad en €"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="text-center text-lg font-medium"
              step="0.01"
              min="0"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAddMoney}
                disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                className="flex-1 bg-gradient-success hover:shadow-glow"
                size="lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Añadir
              </Button>
              <Button
                onClick={handleSubtractMoney}
                disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                variant="destructive"
                className="flex-1"
                size="lg"
              >
                <Minus className="h-4 w-4 mr-2" />
                Restar
              </Button>
            </div>
            <Button
              onClick={() => {
                setIsEditing(false);
                setInputAmount('');
              }}
              variant="ghost"
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}