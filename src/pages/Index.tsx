import { useState, useEffect } from 'react';
import { SavingGoal } from '@/types/savings';
import { SavingsHeader } from '@/components/SavingsHeader';
import { CreateGoalModal } from '@/components/CreateGoalModal';
import { SavingGoalCard } from '@/components/SavingGoalCard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const { toast } = useToast();

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('savingGoals');
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals).map((goal: any) => ({
          ...goal,
          createdAt: new Date(goal.createdAt),
          updatedAt: new Date(goal.updatedAt)
        }));
        setGoals(parsedGoals);
      } catch (error) {
        console.error('Error loading goals:', error);
      }
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('savingGoals', JSON.stringify(goals));
  }, [goals]);

  const handleCreateGoal = (title: string, targetAmount: number, emoji: string) => {
    const newGoal: SavingGoal = {
      id: crypto.randomUUID(),
      title,
      targetAmount,
      currentAmount: 0,
      emoji,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setGoals(prev => [...prev, newGoal]);
    toast({
      title: "¡Meta creada!",
      description: `Tu meta "${title}" ha sido creada exitosamente.`,
    });
  };

  const handleUpdateAmount = (goalId: string, amount: number, type: 'add' | 'subtract') => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newAmount = type === 'add' 
          ? goal.currentAmount + amount 
          : Math.max(0, goal.currentAmount - amount);
        
        return {
          ...goal,
          currentAmount: newAmount,
          updatedAt: new Date()
        };
      }
      return goal;
    }));

    const action = type === 'add' ? 'añadido' : 'retirado';
    toast({
      title: `¡Dinero ${action}!`,
      description: `Se han ${action} ${amount.toFixed(2)}€ a tu meta.`,
    });
  };

  const handleDeleteGoal = (goalId: string) => {
    const goalToDelete = goals.find(g => g.id === goalId);
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
    
    if (goalToDelete) {
      toast({
        title: "Meta eliminada",
        description: `La meta "${goalToDelete.title}" ha sido eliminada.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SavingsHeader goals={goals} />
        
        <div className="flex justify-center mb-8">
          <CreateGoalModal onCreateGoal={handleCreateGoal} />
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-16 animate-scale-in">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              ¡Comienza tu primer objetivo!
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Crea tu primera meta de ahorro y comienza a hacer realidad tus sueños. 
              Cada gran logro comienza con un pequeño paso.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {goals.map((goal) => (
              <SavingGoalCard
                key={goal.id}
                goal={goal}
                onUpdateAmount={handleUpdateAmount}
                onDelete={handleDeleteGoal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
