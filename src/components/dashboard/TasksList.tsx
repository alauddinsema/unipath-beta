
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const { toast } = useToast();

  const addTask = () => {
    if (!newTask.trim()) {
      toast({
        title: "Task Required",
        description: "Please enter a task description",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority: newPriority
    };

    setTasks([...tasks, task]);
    setNewTask('');
    toast({
      title: "Task Added",
      description: "New task has been added successfully",
    });
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task Removed",
      description: "Task has been removed successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Add new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <select
              className="bg-background border rounded px-2"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as 'high' | 'medium' | 'low')}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Button onClick={addTask} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No tasks yet. Add your first task above!</p>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id}
                className={cn(
                  "flex items-center space-x-2 p-2 rounded hover:bg-accent transition-colors",
                  task.completed && "text-muted-foreground"
                )}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="focus:outline-none"
                >
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <span className={cn(task.completed && "line-through")}>{task.title}</span>
                <span className={cn(
                  "ml-auto text-xs px-2 py-1 rounded-full",
                  task.priority === "high" && "bg-destructive/20 text-destructive",
                  task.priority === "medium" && "bg-yellow-500/20 text-yellow-700",
                  task.priority === "low" && "bg-primary/20 text-primary"
                )}>
                  {task.priority}
                </span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="focus:outline-none hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
