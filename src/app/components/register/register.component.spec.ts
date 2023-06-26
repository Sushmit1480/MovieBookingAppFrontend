import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('Register User Component', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: MovieBookingService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [RegisterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = TestBed.inject(RegisterComponent);
    service = TestBed.inject(MovieBookingService);
    router = TestBed.inject(Router);
  });

  it('Register User Component create', () => {
    expect(component).toBeTruthy();
  });

  it('Register User', () => {
    const user = {
      firstName: 'Sushmit',
      lastname: 'Patil',
      email: 'Sushmit.Patil@gmail.com',
      password: 'Sushmit',
      contactNumber: '9988776655',
    };

    component.onSubmit();
    spyOn(service, 'registerUser').and.returnValue(of(user));

    service.registerUser(user).subscribe((res) => {
      expect(res).toEqual(user);
    });
  });
});
