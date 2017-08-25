import { Component, OnInit } from '@angular/core';
import { Encounter } from '../../models/encounter';
import { EncountersService } from '../../services/encounters.service';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersService]
})

export class EncountersComponent implements OnInit {
  public listEncounters: Encounter[] = [];

  constructor(private encountersService: EncountersService) {

  }

  ngOnInit() {

    this.encountersService.getData()
      .subscribe((encounters) => {
        this.listEncounters = encounters.encounters;
      });

  }

  sortList(e) {
    e.preventDefault();
    return;
  }
}
