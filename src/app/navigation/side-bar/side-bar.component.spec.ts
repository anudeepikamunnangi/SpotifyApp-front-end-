// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SideBarComponent } from './side-bar.component';

// describe('SideBarComponent', () => {
//   let component: SideBarComponent;
//   let fixture: ComponentFixture<SideBarComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [SideBarComponent]
//     });
//     fixture = TestBed.createComponent(SideBarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarComponent } from './side-bar.component';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarComponent],
    });
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize username from localStorage', () => {
    // Arrange
    const mockUsername = 'testuser';
    spyOn(localStorage, 'getItem').and.returnValue(mockUsername);

    // Act
    component.ngOnInit();

    // Assert
    expect(component.username).toEqual(mockUsername);
  });

  // Add more test cases as needed
});