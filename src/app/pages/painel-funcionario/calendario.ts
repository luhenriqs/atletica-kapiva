import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.css']
})
export class Calendario implements OnChanges {
  @Input() eventos: any[] = [];

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
    },
    events: []
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['eventos']) {
      this.calendarOptions.events = this.eventos.map(e => ({
        title: e.titulo,   // ← sem e.hora (não existe!)
        date: e.data
      }));
    }
  }
}
