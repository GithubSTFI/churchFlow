import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  userName = 'Valdo';
  newActivities = 25;
  
  // Données pour les cartes statistiques
  statCards = [
    { title: 'Ressources', count: 400, increase: 20, textColor: '#e53935' },
    { title: 'Evenements', count: 350, increase: 20, textColor: '#3f51b5' },
    { title: 'Rendez-vous', count: 120, increase: 20, textColor: '#4caf50' },
    { title: 'Memebres', count: 700, increase: 20, textColor: '#ff9800' }
  ];
  
  // Données pour les nouveaux fidèles
  newMembers = [
    { name: 'Utilisateur1', id: '666-08-00-87', date: '19 mars 2024' },
    { name: 'Utilisateur1', id: '666-08-00-87', date: '19 mars 2024' },
    { name: 'Utilisateur1', id: '666-08-00-87', date: '19 mars 2024' },
    { name: 'Utilisateur1', id: '666-08-00-87', date: '19 mars 2024' }
  ];
  
  // Données pour le graphique (simulées)
  chartData = [65, 100, 65, 50];

  constructor() { }

  ngOnInit(): void {
  }
}
