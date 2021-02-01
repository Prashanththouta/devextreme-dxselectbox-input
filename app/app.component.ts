import { NgModule, Component, enableProdMode, ViewChild, QueryList, ViewChildren } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { DxSelectBoxComponent } from "devextreme-angular";
import { Observable, Subject, Subscription } from "rxjs";
import { timer } from "rxjs/observable/timer";
import { startWith, switchMap } from "rxjs/operators";
import { Service, Employee, State, City } from "./app.service";

@Component({
  selector: "my-app",
  templateUrl: "app.component.html",
  providers: [Service]
})
export class AppComponent {
  private reset$ = new Subject();
  timer$: Observable<any>;
  subscription: Subscription;
  boxes : string[] = ["box1", "box2"];

  @ViewChildren(DxSelectBoxComponent) selectBoxInstance: QueryList<DxSelectBoxComponent>;

  Products = [
    { Name: "Name 01", Id: "Id 01" },
    { Name: "Name 02", Id: "Id 02" },
    { Name: "Name 03", Id: "Id 03" },
    { Name: "Name 04", Id: "Id 04" },
    { Name: "Name 05", Id: "Id 05" },
    { Name: "Name 06", Id: "Id 06" },
    { Name: "Name 07", Id: "Id 07" },
    { Name: "Name 08", Id: "Id 08" },
  ];

  constructor(private service: Service) {
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(0, 1000))
    );
  }

  InputValueChange(e, name) {
    this.resetTimer();
    let valueSendToServer = false;
    this.subscription = this.timer$.subscribe(time => {
      if (time > 1 && !valueSendToServer) {
        this.resetTimer();
        this.selectBoxInstance.toArray().forEach(
          (instance) => {
            if(instance.name === name) {
              // this.getProducts(instance.text);
              this.Products.splice(0,1);
            }
          }
        )
        valueSendToServer = true;
      }
    });
  }

  resetTimer(): void {
    this.reset$.next(void 0);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ValeChanged(e, box) {
    if(e) {
      if(box === 'box1') {
        this.box1_value = e.value;
      } else {
        this.box2_value = e.value;
      }
    }
  }

  box1_value = null;
  box2_value = null;
  GetValue(box) {
    if(box === 'box1') {
      return this.box1_value;
    } else {
      return this.box2_value;
    }
  }  
}
