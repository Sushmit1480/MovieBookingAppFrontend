import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetPasswordComponent } from './forget-password.component';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('Forget Password Componet', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;
  let service: MovieBookingService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetPasswordComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [ForgetPasswordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = TestBed.inject(ForgetPasswordComponent);
    service = TestBed.inject(MovieBookingService);
    router = TestBed.inject(Router);
  });

  it('Forget Password Component Created', () => {
    expect(component).toBeTruthy();
  });

  it('Password change method', () => {
    const msg = 'Password reset Successfully';
    const credentials = {
      email: 'Sushmit.Patil@gmail.com',
      password: 'Sushmit123',
    };

    //component.onSubmit();
    spyOn(service, 'forgetPassword').and.returnValue(of(msg));
    service.forgetPassword(credentials).subscribe((res) => {
      expect(res).toEqual(msg);
    });
  });
});
