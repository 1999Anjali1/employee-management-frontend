import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './components/pages/toast/toast';
import { AiChatbot } from "./components/ai-chatbot/ai-chatbot/ai-chatbot";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, AiChatbot],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'frontend';
}
