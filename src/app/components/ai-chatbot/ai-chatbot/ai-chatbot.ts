import { Component, inject, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.sevice';
import { environment } from '../../../../environments/environment.prod';


interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chatbot.html',
  styleUrl: './ai-chatbot.scss'
})
export class AiChatbot {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  isOpen = signal(false);
  isLoading = signal(false);
  userInput = '';
  private backendUrl = environment.apiUrl.replace('/api', '');

  messages = signal<Message[]>([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m your HR Assistant. Ask me anything about your employees!\n\nExamples:\n• How many employees do we have?\n• Who are the top earners?\n• List all Engineering employees\n• What is the average salary?',
      timestamp: new Date()
    }
  ]);

  private employeeService = inject(EmployeeService);

  toggleChat(): void {
    this.isOpen.update(v => !v);
  }

 async sendMessage(): Promise<void> {
  
  if (!this.userInput.trim() || this.isLoading()) return;

  const userMessage = this.userInput.trim();
  this.userInput = '';

  this.messages.update(msgs => [...msgs, {
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  }]);

  this.isLoading.set(true);
  this.scrollToBottom();

  this.employeeService.getAll().subscribe(async (employees) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${this.backendUrl}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userMessage,
          employeeData: employees
        })
      });

      const data = await response.json();
      this.messages.update(msgs => [...msgs, {
        role: 'assistant',
        content: data.reply || 'Sorry I could not process that.',
        timestamp: new Date()
      }]);

    } catch (error) {
      this.messages.update(msgs => [...msgs, {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    }

    this.isLoading.set(false);
    this.scrollToBottom();
  });
}

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat(): void {
    this.messages.set([{
      role: 'assistant',
      content: '👋 Hi! I\'m your HR Assistant. Ask me anything about your employees!',
      timestamp: new Date()
    }]);
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
}
