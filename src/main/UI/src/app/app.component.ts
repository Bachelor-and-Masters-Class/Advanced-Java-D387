import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  private baseURL: string = 'http://localhost:8080';

  private getUrl: string = this.baseURL + '/room/reservation/v1/';
  private postUrl: string = this.baseURL + '/room/reservation/v1';
  public submitted!: boolean;
  roomsearch!: FormGroup;
  rooms!: Room[];
  request!: ReserveRoomRequest;
  currentCheckInVal!: string;
  currentCheckOutVal!: string;

  announcePresentation$!: Observable<string>;

  // NEW: Welcome messages from backend
  welcomeMessageEn: string = '';
  welcomeMessageFr: string = '';

  ngOnInit() {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });

    const roomsearchValueChanges$ = this.roomsearch.valueChanges;
    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });

    // C3B - Conference Announcement
    this.announcePresentation$ = this.httpClient.get(this.baseURL + '/presentation', { responseType: 'text' });

    // NEW: Load welcome messages
    this.loadWelcomeMessages();
  }

  loadWelcomeMessages() {
    this.httpClient.get<{ welcomeMessage: string }>(this.baseURL + '/welcome?lang=en')
      .subscribe(data => {
        console.log("EN:", data); // This will show exactly what the API returns
        this.welcomeMessageEn = data.welcomeMessage; // Extract just the string
      });

    this.httpClient.get<{ welcomeMessage: string }>(this.baseURL + '/welcome?lang=fr')
      .subscribe(data => {
        console.log("FR:", data); // This will show exactly what the API returns
        this.welcomeMessageFr = data.welcomeMessage; // Extract just the string
      });
  }

  onSubmit({ value, valid }: { value: Roomsearch, valid: boolean }) {
    this.getAll().subscribe(
      rooms => {
        this.rooms = <Room[]>Object.values(rooms)[0];
        this.rooms.forEach(room => {
          room.priceCAD = room.price;
          room.priceEUR = room.price;
        });
      }
    );
  }

  reserveRoom(value: string) {
    this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);
    this.createReservation(this.request);
  }

  createReservation(body: ReserveRoomRequest) {
    const options = {
      headers: new HttpHeaders().append('key', 'value'),
    }

    this.httpClient.post(this.postUrl, body, options)
      .subscribe(res => console.log(res));
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin=' + this.currentCheckInVal + '&checkout=' + this.currentCheckOutVal, { responseType: 'json' });
  }
}

export interface Roomsearch {
  checkin: string;
  checkout: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  price: string;
  links: string;
  priceCAD?: string;
  priceEUR?: string;
}

export class ReserveRoomRequest {
  constructor(public roomId: string, public checkin: string, public checkout: string) {}
}

/*
var ROOMS: Room[]=[
  {
  "id": "13932123",
  "roomNumber" : "409",
  "price" :"20",
  "links" : ""
},
{
  "id": "139324444",
  "roomNumber" : "509",
  "price" :"30",
  "links" : ""
},
{
  "id": "139324888",
  "roomNumber" : "609",
  "price" :"40",
  "links" : ""
}
] */
