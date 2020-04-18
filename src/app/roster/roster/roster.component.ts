import { Component, OnInit, EventEmitter, ElementRef, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ExcelService } from '../excel.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { UnleashService } from '../../unleash.service';
import { MatStepper } from '@angular/material/stepper';
import { Router, ActivatedRoute } from '@angular/router';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';
import { AuthService } from '../../../auth/auth.service';
import readXlsxFile from 'read-excel-file';
import {MatTableDataSource,  MatPaginator } from '@angular/material';
import { User } from '../User';
import {ToastrService} from 'ngx-toastr';


declare var require: any;
@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})

export class RosterComponent implements OnInit  {
   
  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  // @Output() topic_id: EventEmitter<number> = new EventEmitter();
  topicId:any;
  loggedIn = false;
  letsGetStartedFlow = false;
  getReviewdetails = false;

  fileUpload = false;
  tableForm: FormGroup;
  public uploader: FileUploader = new FileUploader({
  });
  selectedItem;
  firstFormGroup: any;
  slecteGoogleClass = false;
  secondFormGroup: any;
  now = false;
  futureDate = false;
  future = false;
  dont_know = false;
  send_link = false;
  linkCopied = false;
  buildType: any;
  link_text = 'https://unleash.app/hgywf';
  buildRosterPage = true;
  googlePage = false;
  beforeSelectClass = true;
  timeSelected: any;
  afterSelectClass = false;
  availClass: any;
  className = false;
  options: any;
  classroom: any;
  fileToUpload = '';
  loading:any;
  googleClassRoom = false;
  sendlink = false;
  displayPic: any;
  selectedClassName: any = '';
  allDetails: any;
  time: any;
  day: any;
  month: any;
  fileName = '';
  submitted = false;
  errorData = [];
  rowData = [];
  userList: User[];
  selectedRow: Number;
  editedRows: Boolean[];
  editedData: User[];
  updatedData =[];
  excelRowData=[];
  emailError=[];
  phoneError=[];
  required=[];
  tablepush=[];
 
  viewErrorButton = false;
  nextButton = false;
  userListMatTabDataSource = new MatTableDataSource<User>(this.userList);
  @ViewChild('testForm' , { static: false }) testForm: NgForm;
  @ViewChild('paginator',{ static: false }) paginator: MatPaginator;
  @ViewChild("fileuploadnew", { static: false }) fileuploadnew : ElementRef;
  @ViewChild("closeModel", { static: false }) closeModel : ElementRef;
 private columnList :string[] = [ 'firstName', 'lastName', 'phoneNo', 'emailId'];

  nowGoogleClass = false;
  nowGoogleSheet = false;
  nowSendLInk = false;
  futureGoogleClass = false;
  futureGoogleSheet = false;
  futureSendLink = false;
  dknowGoogleClass = false;
  dknowGoogleSheet = false;
  dknowSendLink = false;


  activity = [{
    type: 'multiselect',
    showSelectedOptions: false,
    select: {
      min: 2,
      max: 3,
      dataOptions: [{
        id: 1,
        text: 'Good at Art',
        image: 'pencil',
        clicked: false
      },
      {
        id: 2,
        text: 'Belonging to a social group',
        image: 'music',
        clicked: false
      },
      {
        id: 3,
        text: 'Being creative',
        image: 'pencil',
        clicked: false
      },
      {
        id: 4,
        text: 'Listening to music',
        image: 'music',
        clicked: false
      },
      {
        id: 5,
        text: 'Being independent',
        image: 'pencil',
        clicked: false
      },
      {
        id: 6,
        text: 'Playing music',
        image: 'music',
        clicked: false
      },
      {
        id: 7,
        text: 'Living in the moment',
        image: 'clock-o',
        clicked: false
      },
      {
        id: 8,
        text: 'Following politics or government',
        image: 'pencil',
        clicked: false
      }
      ],
    },
    question: 'What are your personal values?',
    label1: 'What\'s most important to you?',
    label2: '',
    label3: 'Remember, there are no right or wrong answers to any of these questions.'
  },
  {
    type: 'text',
    showSelectedOptions: true,
    question: '',
    label1: 'Think about times when these values were very important to you. Describe why these values are important to you.',
    label2: 'Focus on your thoughts and feelings and dont worry about spelling and how its written.',
    textArea: 'yes',
  },
  {
    type: 'yesno',
    showSelectedOptions: true,
    question: 'The Things I Value',
    questionsList: [{
      id: 0,
      question: 'In general, I try to live up to these things.',
      ans: null
    },
    {
      id: 1,
      question: 'These things are an important part of who I am.',
      ans: null
    },
    {
      id: 2,
      question: 'I care about these things.',
      ans: null
    }
    ],
    options: ['Yes', 'No']
  },
  {
    type: 'hardcode',
  }
  ];

  selectedTime: '00:00 AM';
  availClassRooms: any = [{
    gmail: 'kaeyama@gmail.com',
  },
  {
    gmail: 'kaeyaclass@gmail.com'
  },
  {
    gmail: 'thisiskaeya@gmail.com'
  }
  ];
  // tslint:disable-next-line: indent
  data: any = [{
    'Student First Name': '',
    'Student Last Name': '',
    'Mobile Number': '',
    'Email ID': ''
  }];


  title = 'ng-calendar-demo';
  today = new Date();
  timeNow = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); // January is 0!
  yyyy = this.today.getFullYear();
  date = this.yyyy + '/' + this.mm + '/' + this.dd;
  selectedDate = new Date(this.date);
  startAt = new Date(this.date);
  // minDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
  minDate = this.today;
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
  year: any;
  DayAndDate: string;

  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;
  tipicId: any;
  reviewDetails: boolean;
  studentsList: any;


  // tslint:disable-next-line: variable-name
  constructor( private unleashService: UnleashService,
              private _formBuilder: FormBuilder,
              fb: FormBuilder,
              private excelService: ExcelService,
              private router: Router,
              private el: ElementRef,
              private toast: ToastrService,private route: ActivatedRoute,
              private auth: AuthService,private elementRef:ElementRef, private formBuilder: FormBuilder
  ) {

    this.loading = true;
    this.classroom = {
      name: '',
      grade: ''
    };
    this.options = fb.group({
      name: ['', [Validators.required]],
      grade: ['', [Validators.required]],
    });
  }

  stepClicker(type) {
  }

  copyText() {
    this.linkCopied = true;
  }


  onSelect(event, type) {
    if (type === 'change') {
      if (event.value) {
        event = event.value;
      }
      const dateString = event.toDateString();
      const dateValue = dateString.split(' ');
      this.month = dateValue[1] + ' ' + dateValue[2];
      this.day = dateValue[0];
      this.allDetails.day = this.day;
      this.allDetails.month = this.month;
    } else if (type === 'first') {
      this.selectedDate = event;
      const dateString = event.toDateString();
      const dateValue = dateString.split(' ');
      this.year = dateValue[3];
      // let month = dateValue[1];
      // let day = dateValue[2];
      // this.currentDate = month
      this.DayAndDate = dateValue[1] + ' ' + dateValue[2] + ', ' + dateValue[3];
      this.month = dateValue[1] + ' ' + dateValue[2];
      this.day = dateValue[0];
    }
  }

  postDateTime() {
    const obj = {
      date: this.DayAndDate,
      month: this.month,
      time: this.selectedTime,
      day: this.day,
      year: this.year
    };
    this.unleashService.postdate(obj);
  }


  selectTime(time) {
  }

  navigateToPage(page) {
    // let key = 'details';
    const details = this.allDetails;
    // let array = [];
    // array.push(details);
    localStorage.setItem('details', JSON.stringify(details));
    page = '/' + page;
    this.router.navigate([page]);
  }

  myDateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday anda Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  clicked(type) {
    if (type === 'future') {
      this.futureDate = true;
    } else {
      this.futureDate = false;
    }
    if (type === 'now') {
      this.postDateTime();
    }
    this.unleashService.postScheduling(type);
  }

  getTime(time) {
    this.selectedItem = time;
    this.selectedTime = time;
  }


  buildRosterSend(type, stepper: MatStepper) {
    this.buildType = type;
    // stepper.next();
  }


  sendId() {
    this.route.params.subscribe(params => {
      this.topicId = params.topicId;
     });
  }

  getRoster(event) {
    this.studentsList = event;
  }

  handleLoading(event) {
    if(event === true) {
      this.loading = true;
    } 
    else {
      this.loading = false;
    }
  }

  getDetails(event) {
    this.unleashService.reviewDetailsStatus(event);
  }

  ngOnInit() {
    this.unleashService.getProfileDetails().subscribe(
      response => {
        if(response['is_success'] === true) {
          const data = response.result.userDetails.topics;
          const roster = data.filter(ros => {
              return ros._id === this.topicId;
          });
          if (roster[0].roster) {
            this.getDetails(true);
            this.stepper.selectedIndex = 2;
          }
          if (roster[0].topicDate && roster[0].roster === '') {
            this.stepper.selectedIndex = 1;
          }
        }
        else if(response['is_success'] === false) {
          this.toast.error(response['message'], "error !");
        }
      }, error => {
        this.toast.error(error.error.message, "error !");
      }
    );
    this.sendId();
    this.loggedIn = true;
    let className = localStorage.getItem('className');
    if(className === 'true') {
      this.stepper.selectedIndex = 1;
    }
    this.letsGetStartedFlow = true;
    this.unleashService.postLogin(true);
    this.unleashService.getStartedFlow(true);
    this.unleashService.changeTheme('light');
    this.onSelect(this.today, 'first');
    this.DayAndDate = this.date;
    this.selectedTime = '00:00 AM';

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.editedRows = [];
    this.editedData = [];
    
    setTimeout(() => {
      this.userListMatTabDataSource.paginator = this.paginator;
    }, 1000);
    } //end of ngOninit


  sendReminder(){
    this.submitted = true;
  }

  ngOnDestroy() {
    this.unleashService.postLogin(false);
    this.unleashService.getStartedFlow(false);
  }

}
