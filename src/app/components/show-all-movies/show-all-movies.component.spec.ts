import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { ShowAllMoviesComponent } from './show-all-movies.component';
import { of } from 'rxjs';

describe('Show All Movies', () => {
  let component: ShowAllMoviesComponent;
  let fixture: ComponentFixture<ShowAllMoviesComponent>;
  let service: MovieBookingService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAllMoviesComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [ShowAllMoviesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = TestBed.inject(ShowAllMoviesComponent);
    service = TestBed.inject(MovieBookingService);
    router = TestBed.inject(Router);
  });

  it('Show all movies component created', () => {
    expect(component).toBeTruthy();
  });

  it('Show all movies', () => {
    const movies = [
      { id: { movieName: 'RRR', theatherName: 'PVR' }, allotedSeats: 200 },
      { id: { movieName: 'Avengers', theatherName: 'PVR' }, allotedSeats: 200 },
    ];

    component.getMovieList();
    spyOn(service, 'getAllMovies').and.returnValue(of(movies));
    service.getAllMovies().subscribe((data) => {
      expect(data).toEqual(movies);
    });
  });

  it('Delete Movie', () => {
    const msg = 'Movie Deleted Successfully';

    component.onDelete('RRR', 'PVR');
    spyOn(service, 'deleteMovie').and.returnValue(of(msg));
    service.deleteMovie('RRR', 'PVR').subscribe((res) => {
      expect(res).toEqual(msg);
    });
  });

  it('should navigate to the bookTicket page with the correct parameters', () => {
    const movieName = 'The Lion King';
    const theaterName = 'Cinema City';

    spyOn(router, 'navigate'); // Spy on the navigate method

    // Call the bookTicket function
    component.bookTicket(movieName, theaterName);

    // Verify that the navigate method is called with the correct parameters
    expect(router.navigate).toHaveBeenCalledWith([
      'bookTicket',
      movieName,
      theaterName,
    ]);
  });

  it('should call deleteMovie method and reload the window', () => {
    const movieName = 'The Lion King';
    const theaterName = 'Cinema City';
    const msg = 'Movie Deleted Successfully';

    spyOn(service, 'deleteMovie').and.returnValue(of(msg));
    spyOn(component, 'reloadWindow');

    // Call the onDelete function
    component.onDelete(movieName, theaterName);

    // Verify that the deleteMovie method is called with the correct parameters
    expect(service.deleteMovie).toHaveBeenCalledWith(movieName, theaterName);

    // Verify that the window.location.reload method is called
    expect(component.reloadWindow).toHaveBeenCalled();
  });
});
