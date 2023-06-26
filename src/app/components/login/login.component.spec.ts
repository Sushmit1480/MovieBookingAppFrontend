import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: MovieBookingService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = TestBed.inject(LoginComponent);
    service = TestBed.inject(MovieBookingService);
    router = TestBed.inject(Router);
  });

  it('Login component crreated', () => {
    expect(component).toBeTruthy();
  });

  it('alert checking when user not found', () => {
    const msg = 'User not found';

    const credentails = {
      email: 'Sushmit.Patil@gmail.com',
      password: 'Sushmit',
    };

    spyOn(service, 'login').and.returnValue(of(msg));
    spyOn(window, 'alert');
    spyOn(component, 'reloadWindow');

    component.onSubmit();
    service.login(credentails).subscribe((res) => {
      expect(res).toEqual(msg);
    });

    expect(window.alert).toHaveBeenCalledWith('User Not Found :(');
    expect(component.reloadWindow).toHaveBeenCalled();
  });
});
