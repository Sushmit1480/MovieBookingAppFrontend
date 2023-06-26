import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }

  moviename = "";
  email = null;
  //loginId = null;

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('user') || '{}').email;
    //this.loginId = JSON.parse(localStorage.getItem('user')|| '{}').loginId;
  }

  onSearch(){
    if(this.moviename != null && this.moviename.length!=0){
      this.route.navigate([`movies/search/${this.moviename}`]).then(() =>{
        window.location.reload();
      });
    }
  }

  onLogout(){
    localStorage.clear();
    this.route.navigate([`/`]).then(() => {
      window.location.reload();
    })
  }

}
