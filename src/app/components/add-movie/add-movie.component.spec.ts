import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMovieComponent } from './add-movie.component';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('Add Movie Component', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let service: MovieBookingService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMovieComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AddMovieComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = TestBed.inject(AddMovieComponent);
    service = TestBed.inject(MovieBookingService);
    router = TestBed.inject(Router);
  });

  it('Add Movie Component Create', () => {
    expect(component).toBeTruthy();
  });

  describe('add Movie', () => {
    it('Add movie', () => {
      const movie = {
        id: { movieName: 'RRR', theatherName: 'PVR' },
        allotedSeats: 200,
      };

      component.onSubmit();
      spyOn(service, 'addMovie').and.returnValue(of(movie));
      service.addMovie(movie).subscribe((res) => {
        expect(res).toEqual(movie);
      });
    });
  });
});
