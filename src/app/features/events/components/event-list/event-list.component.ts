import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventsService, EventStats } from '../../../../core/services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  // Données pour les cartes statistiques
  eventStats: EventStats[] = [];

  // Critères de filtrage
  filterCriteria = [
    { id: 'all', label: 'Tout', active: true },
    { id: 'Administratives', label: 'Administratifs', active: false },
    { id: 'Culturels', label: 'Culturels', active: false },
    { id: 'Communautaires', label: 'Communautaires', active: false },
    { id: 'Liturgiques', label: 'Liturgiques', active: false }
  ];

  // Données pour le tableau d'événements
  events: Event[] = [];
  filteredEvents: Event[] = [];

  // Pagination
  currentPage = 1;
  totalPages = 5;
  loading = false;
  itemsPerPage = 5; // Nombre d'éléments par page

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    
    // Charger les statistiques
    this.eventsService.getEventStats().subscribe({
      next: (stats) => {
        this.eventStats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
        this.loading = false;
      }
    });

    // Charger les événements
    this.eventsService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.filteredEvents = events; // Initialiser les événements filtrés
        this.updatePagination();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements:', error);
        this.loading = false;
      }
    });
  }

  // Méthode pour changer le critère actif et filtrer les événements
  setActiveCriteria(criteriaId: string): void {
    this.loading = true;
    
    // Mettre à jour l'état actif des critères
    this.filterCriteria.forEach(criteria => {
      criteria.active = criteria.id === criteriaId;
    });

    // Filtrer les événements
    if (criteriaId === 'all') {
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events.filter(event => event.type === criteriaId);
    }

    // Réinitialiser la pagination
    this.currentPage = 1;
    this.updatePagination();
    this.loading = false;
  }

  // Méthode pour obtenir les événements de la page courante
  getCurrentPageEvents(): Event[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEvents.slice(startIndex, endIndex);
  }

  // Mettre à jour la pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  // Méthodes de pagination
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Méthode pour générer la séquence de pages pour la pagination
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Méthode pour ajouter un nouvel événement
  addEvent(): void {
    console.log('Ajouter un événement');
  }
} 