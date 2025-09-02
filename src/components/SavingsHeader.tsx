import { SavingGoal } from '@/types/savings';

interface SavingsHeaderProps {
  goals: SavingGoal[];
}

export function SavingsHeader({ goals }: SavingsHeaderProps) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="text-center mb-8 animate-slide-up">
      <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
        Mis Ahorros
      </h1>
      <p className="text-muted-foreground mb-6">
        Gestiona tus metas de ahorro de forma sencilla
      </p>
      
      {goals.length > 0 && (
        <div className="bg-gradient-card border border-border/50 rounded-2xl p-6 shadow-card max-w-md mx-auto">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total ahorrado</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(totalSaved)}</p>
            </div>
            
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(overallProgress, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {goals.length} meta{goals.length !== 1 ? 's' : ''}
              </span>
              <span className="text-primary font-medium">
                {overallProgress.toFixed(1)}% completado
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}