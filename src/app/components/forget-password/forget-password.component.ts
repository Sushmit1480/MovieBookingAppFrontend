import { Component, OnInit } from '@angular/core';
import { MovieBookingService } from 'src/app/services/movie-booking.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private service: MovieBookingService) {}
  isfailure = false;
  loginClass = {
    email: null as string | null,
    password: '',
  };

  confirmPassword: any;

  ngOnInit(): void {}

  onSubmit() {
    if (this.confirmPassword === this.loginClass.password) {
      this.service.forgetPassword(this.loginClass).subscribe((response) => {
        alert('Password Reset Successfully');
      });
    } else {
      alert('Password Does not match');
    }
    window.location.reload();
  }
}
