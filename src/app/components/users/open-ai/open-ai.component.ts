import { Component } from '@angular/core';
import { OpenAiService } from 'src/app/services/open-ai/open-ai.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-open-ai',
  templateUrl: './open-ai.component.html',
  styleUrls: ['./open-ai.component.css']
})
export class OpenAiComponent {
  chatForm!: FormGroup;
  chatMessages: { role: string, content: string }[] = [];
  private subscribe: Subscription = new Subscription()
  constructor(
    private _fb: FormBuilder,
    private _openAiApiService: OpenAiService
  ) { }

  ngOnInit(): void {
    this.chatForm = this._fb.group({
      userMessage: ['', Validators.required]
    });
  }

  get userMessage() {
    return this.chatForm.get('userMessage');
  }

  sendMessage() {
    const userMessage = this.userMessage?.value;
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.subscribe.add(this._openAiApiService.sendMessage(userMessage)
      .subscribe({
        next: (res: { reply: string }) => {
          const assistantReply = res.reply;
          this.chatMessages.push({ role: 'assistant', content: assistantReply });
        }, complete: () => {
          this.chatForm.reset();
        }
      }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
