import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Map, tileLayer, marker, Icon, icon, LatLngExpression } from 'leaflet';
import 'leaflet-routing-machine';
import axios from 'axios';

@Component({
  selector: 'app-delivery-order-view',
  templateUrl: './delivery-order-view.component.html',
  styleUrls: ['./delivery-order-view.component.css']
})
export class DeliveryOrderViewComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef | undefined;
  locationData: any[] = [];
  map: Map | undefined;
  customIcon: Icon = icon({
    iconUrl: '../../../assets/img/placeholder.png', // Replace with your pointer icon URL
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllDetails();
  }

  getAllDetails() {
    this.http.get("http://localhost:9000/getDelivery").subscribe((resultData: any) => {
      this.locationData = resultData;
      if (this.mapElement && this.locationData.length > 0 && !this.map) {
        this.initializeMap();
        this.trackUserLocation();
      }
    });
  }

  deleteDelivery(id: number) {
    if (confirm('Are you sure you want to delete this delivery?')) {
      // Perform the deletion using HTTP DELETE method
      this.http.delete(`http://localhost:9000/deleteDelivery/${id}`).subscribe(() => {
        // After successful deletion, update the displayed data
        this.getAllDetails();
      }, (error) => {
        console.error('Error deleting delivery:', error);
        // Handle error scenarios, if needed
      });
    }
  }

  initializeMap() {
    if (this.mapElement && this.mapElement.nativeElement) {
      this.map = new Map(this.mapElement.nativeElement).setView([0, 0], 10);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      this.locationData.forEach(data => {
        this.addMarkerForLocation(data.address);
      });
    }
  }

  async addMarkerForLocation(address: string) {
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: address,
          key: '5b62e253be0f485892ab3b518768e233',
        }
      });

      if (response.data.results.length > 0 && this.map) {
        const coordinates = response.data.results[0].geometry;
        marker([coordinates.lat, coordinates.lng], { icon: this.customIcon })
          .addTo(this.map)
          .bindPopup(address)
          .openPopup();

        this.map.setView([coordinates.lat, coordinates.lng], 15); // Adjust the zoom level (15 in this case)
      } else {
        console.error(`Geocoding failed for address: ${address}`);
        console.error("OpenCage Geocoding API Response:", response.data);
      }
    } catch (error) {
      console.error(`Geocoding error for address: ${address}`, error);
    }
  }

  trackUserLocation() {
    if (navigator.geolocation && this.locationData.length > 0) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userLocation: LatLngExpression = [latitude, longitude];
        const userIcon = icon({
          iconUrl: '../../../assets/img/placeholder.png', // Replace with your bike icon URL
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        marker(userLocation, { icon: userIcon })
          .addTo(this.map as Map)
          .bindPopup('Your current location')
          .openPopup();

        if (this.map) {
          const destinationCoordinates = this.locationData[0].coordinates;
          const bounds = (window as any).L.latLngBounds([userLocation, [destinationCoordinates.lat, destinationCoordinates.lng]]);
          this.map.fitBounds(bounds);
        } else {
          console.error('Map is not initialized.');
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser or no location data available.');
    }
  }
}
