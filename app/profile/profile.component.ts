import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProfileService } from './../services/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './app/profile/profile.html',
  styleUrls: [ './app/profile/profile.css' ]
})

export class ProfileComponent {

  profile : any;
  days: number[];

  constructor(private route: ActivatedRoute,
		private router: Router,
		private profileService : ProfileService ){}
    

  ngOnInit() {
    this.days = [];
    for(var i=1; i<365; i++) {
      this.days.push(i);
    }
    
    this.route.params.forEach((params: Params) => {
      // 'profile/:user_id'
			if(params['user_id'] !== undefined) {
        // TODO: handle invalid user_id
				this.profile = this.profileService.getProfile(params['user_id']);
			} else {
				this.profile = {};
			}
		});
  }

  isInHeatmap(dayNum: number) : boolean {
    return this.profile.heatmap[dayNum];
  }

  setHeatSquareStyle(dayNum: number) {
    if(this.isInHeatmap(dayNum))
      return "blue";
    else
      return "#dbdbdb";
  }

}
