import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.page.html',
})
export class AgentPage implements OnInit {
  agents: any[] = [];

  constructor(private agentService: AgentService, private alertController: AlertController) {}

  ngOnInit() {
    this.loadAgents();
  }

  loadAgents() {
    this.agentService.getAllAgents().subscribe(data => {
      this.agents = data;
    });
  }

  async addAgent() {
    const alert = await this.alertController.create({
      header: 'Add Agent',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Agent Name *' },
        { name: 'phone', type: 'text', placeholder: 'Phone Number' },
        { name: 'fee', type: 'number', placeholder: 'Referral Fee per Client (Rs.)' },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            if (!data.name || !data.name.trim()) return false;
            const agent = {
              Name: data.name.trim(),
              PhoneNumber: data.phone || '',
              ReferralFeePerClient: parseFloat(data.fee) || 0
            };
            this.agentService.addAgent(agent).subscribe(() => this.loadAgents());
          }
        }
      ]
    });
    await alert.present();
  }

  async editAgent(agent: any) {
    const alert = await this.alertController.create({
      header: 'Edit Agent',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Agent Name *', value: agent.Name },
        { name: 'phone', type: 'text', placeholder: 'Phone Number', value: agent.PhoneNumber },
        { name: 'fee', type: 'number', placeholder: 'Referral Fee per Client (Rs.)', value: agent.ReferralFeePerClient },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            if (!data.name || !data.name.trim()) return false;
            const updated = {
              Id: agent.Id,
              Name: data.name.trim(),
              PhoneNumber: data.phone || '',
              ReferralFeePerClient: parseFloat(data.fee) || 0
            };
            this.agentService.updateAgent(agent.Id, updated).subscribe(() => this.loadAgents());
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteAgent(agent: any) {
    const confirm = await this.alertController.create({
      header: 'Delete Agent',
      message: `Delete "${agent.Name}"? This cannot be undone.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.agentService.deleteAgent(agent.Id).subscribe(() => this.loadAgents());
          }
        }
      ]
    });
    await confirm.present();
  }
}
