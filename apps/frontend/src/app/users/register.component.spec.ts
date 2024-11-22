import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UsersService } from './users.service';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usersService;

  beforeEach(async () => {
    usersService = {
      register: jest.fn(() => of({})),
    };
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
