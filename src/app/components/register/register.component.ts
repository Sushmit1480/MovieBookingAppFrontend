import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user = {
    // "loginId":null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: null,
  };

  confirmPassword: any;

  constructor(private service: MovieBookingService, private route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.confirmPassword === this.user.password) {
      this.service.registerUser(this.user).subscribe((response) => {
        this.route.navigate([`/login`]);
      });
    } else {
      alert('Password Does not match');
    }
  }
}
