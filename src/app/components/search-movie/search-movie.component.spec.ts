import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchMovieComponent } from './search-movie.component';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('Search Movie Component Testing', () => {
  let component: SearchMovieComponent;
  let fixture: ComponentFixture<SearchMovieComponent>;
  let service: MovieBookingService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMovieComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [SearchMovieComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = TestBed.inject(SearchMovieComponent);
    service = TestBed.inject(MovieBookingService);
    router = TestBed.inject(Router);
  });

  it('coponent should created', () => {
    expect(component).toBeTruthy();
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
