import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { BookTicketsComponent } from './book-tickets.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('Ticket Booking Component', () => {
  let component: BookTicketsComponent;
  let fixture: ComponentFixture<BookTicketsComponent>;
  let service: MovieBookingService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookTicketsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [BookTicketsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = TestBed.inject(BookTicketsComponent);
    service = TestBed.inject(MovieBookingService);
    router = TestBed.inject(Router);
  });

  it('book Ticket Component Created', () => {
    expect(component).toBeTruthy();
  });

  it('Ticket Booking', () => {
    const msg = 'Ticket Booked Successfully';
    const ticket = {
      ticketId: 123456,
      movieName: 'RRR',
      theatherName: 'PVR',
      noOfTickets: 2,
      seats: ['A1', 'A2'],
    };

    component.onSubmit();

    spyOn(service, 'bookTickets').and.returnValue(of(msg));

    service.bookTickets(ticket).subscribe((res) => {
      expect(res).toEqual(msg);
    });
  });

  it('should call alert when ticket Unavailable', () => {
    const msg = 'Tickets Unavailable';
    const ticket = {
      ticketId: 123456,
      movieName: 'RRR',
      theatherName: 'PVR',
      noOfTickets: 2,
      seats: ['A1', 'A2'],
    };
    spyOn(service, 'bookTickets').and.returnValue(of(msg));

    spyOn(window, 'alert');
    component.onSubmit();
    service.bookTickets(ticket).subscribe((res) => {
      expect(res).toEqual(msg);
    });
    expect(window.alert).toHaveBeenCalledWith('Tickets are Unavilable');
  });

  it('should call alert when booked successfully', () => {
    const msg = 'Tickets Booked Successfully';
    const ticket = {
      ticketId: 123456,
      movieName: 'RRR',
      theatherName: 'PVR',
      noOfTickets: 2,
      seats: ['A1', 'A2'],
    };
    spyOn(service, 'bookTickets').and.returnValue(of(msg));

    spyOn(window, 'alert');
    component.onSubmit();
    service.bookTickets(ticket).subscribe((res) => {
      expect(res).toEqual(msg);
    });
    expect(window.alert).toHaveBeenCalledWith('Tickets Booked Successfully');
  });
});
