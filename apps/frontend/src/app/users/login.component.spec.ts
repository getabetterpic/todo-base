import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UsersService } from './users.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usersService;

  beforeEach(async () => {
    usersService = {
      login: jest.fn(() => of({})),
    };
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
