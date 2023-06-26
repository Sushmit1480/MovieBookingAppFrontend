import { TestBed } from '@angular/core/testing';
import { MovieBookingService } from './movie-booking.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('MovieBookingService', () => {
  let service: MovieBookingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieBookingService],
    });
    service = TestBed.inject(MovieBookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login service checking', () => {
    const user = {
      loginId: 123456,
      firstName: 'Sushmit',
      lastName: 'Patil',
      email: 'Sushmit.Patil@gmail.com',
      password: 'Sushmit',
      contactNumber: '9988665544',
    };

    const credentials = {
      email: 'Sushmit.Patil@gmail.com',
      password: 'Sushmit',
    };

    service.login(credentials).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const mockRequest = httpMock.expectOne('http://localhost:8400/login');
    expect(mockRequest.request.method).toEqual('POST');
    mockRequest.flush(user);
  });

  it('Password Reset Service checking', () => {
    const credentials = {
      email: 'Sushmit.Patil@gmail.com',
      password: 'Sushmit',
    };

    const msg = 'Password reset successfully';
    service.forgetPassword(credentials).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const mockRequest = httpMock.expectOne(
      'http://localhost:8400/forgotPassword'
    );
    expect(mockRequest.request.method).toEqual('POST');
    mockRequest.flush(credentials);
  });

  it('register service checking', () => {
    const usera = {
      loginId: 123456,
      firstName: 'Sushmit',
      lastName: 'Patil',
      email: 'Sushmit.Patil@gmail.com',
      password: 'Sushmit',
      contactNumber: '9988665544',
    };

    service.registerUser(usera).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const mockRequest = httpMock.expectOne('http://localhost:8400/register');
    expect(mockRequest.request.method).toEqual('POST');
    mockRequest.flush(usera);
  });

  it('Show all movies service testing', () => {
    const movies = [
      { id: { movieName: 'RRR', theatherName: 'PVR' }, allotedSeats: 200 },
      { id: { movieName: 'Avengers', theatherName: 'PVR' }, allotedSeats: 200 },
    ];

    spyOn(service, 'getAllMovies').and.returnValue(of(movies));

    service.getAllMovies().subscribe((res) => {
      expect(res).toEqual(movies);
    });
  });

  it('add movie service testing', () => {
    const movie = {
      id: { movieName: 'RRR', theatherName: 'PVR' },
      allotedSeats: 200,
    };

    spyOn(service, 'addMovie').and.returnValue(of(movie));

    service.addMovie(movie).subscribe((res) => {
      expect(res).toEqual(movie);
    });
  });

  it('search movie service testing', () => {
    const movie = {
      id: { movieName: 'RRR', theatherName: 'PVR' },
      allotedSeats: 200,
    };

    const query = 'RRR';
    //spyOn(service, 'searchMovie').and.returnValue(of(movie));

    service.searchMovie(query).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const mockRequest = httpMock.expectOne(
      `http://localhost:8400/movies/search/${query}`
    );
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(query);
  });

  it('delete movie service testing', () => {
    const msg = 'Movie Deleted Successfully';
    spyOn(service, 'deleteMovie').and.returnValue(of(msg));
    service.deleteMovie('RRR', 'PVR').subscribe((res) => {
      expect(res).toEqual(msg);
    });
  });

  it('bookticket service testing', () => {
    const msg = 'Ticket booked successfully';
    const ticket = {
      ticketId: 123456,
      movieName: 'RRR',
      theatherName: 'PVR',
      noOfTickets: 2,
      seats: ['A1', 'A2'],
    };

    spyOn(service, 'bookTickets').and.returnValue(of(msg));
    service.bookTickets(ticket).subscribe((res) => {
      expect(res).toEqual(msg);
    });
  });
});
