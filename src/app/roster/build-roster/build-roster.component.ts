import { Component, EventEmitter, ElementRef, ViewChild, OnInit ,Input, Output,ChangeDetectorRef, ChangeDetectionStrategy,AfterContentChecked , Inject} from '@angular/core';
import { UnleashService } from '../../unleash.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { ExcelService } from '../excel.service';
import {AuthService } from '../../../auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router, ActivatedRoute } from '@angular/router';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';
import readXlsxFile from 'read-excel-file';
import {MatTableDataSource,  MatPaginator } from '@angular/material';
import { User } from '../User';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-build-roster',
  templateUrl: './build-roster.component.html',
  styleUrls: ['./build-roster.component.css']
})
export class BuildRosterComponent implements OnInit {
  @Input() topicId: any;
  @Output() loader = new EventEmitter();
  @Output() reviewDetails = new EventEmitter();
  @ViewChild('stepper', { static: true }) private myStepper: MatStepper;
  data: any = [{
    'Student First Name': '',
    'Student Last Name': '',
    'Mobile Number': '',
    'Email ID': ''
  }];
  buildType: any;
  studentsList: any;
  buildRosterPage : any;
  afterSelectClass = true;
  googlePage: boolean;
  linkCopied = false;
  classroom: any;
  googleClassRoom: boolean;
  sendlink: boolean;
  linkToSend = "";
  fileName = '';
  fileToUpload = '';
  loading = false;
  className: boolean;
  invitationallow = false;
  getReviewDetails = false;
  availClass: any;
  selectedClassName: any;
  beforeSelectClass: boolean;
  letsGetStartedFlow = false;
  fileUpload = false;
  excelfileType='';
  excelType =false;
  excelfill = false;
  fileEmpty ='';
  tableForm: FormGroup;
  public uploader: FileUploader = new FileUploader({
  });
  submitted = false;
  errorData = [];
  rowData = [];
  userList: User[];
  selectedRow: Number;
  editedRows: Boolean[];
  editedData: User[];
  updatedData =[];
  excelRowData=[];
  tablepush=[];
  finalArray=[];
  loggedIn = false;
  viewErrorButton = false;
  nextButton = false;
  buildExcel = false;
  userListMatTabDataSource = new MatTableDataSource<User>(this.userList);
  @ViewChild('testForm' , { static: false }) testForm: NgForm;
  @ViewChild('paginator',{ static: false }) paginator: MatPaginator;
  @ViewChild("fileuploadnew", { static: false }) fileuploadnew : ElementRef;
  @ViewChild("closeModel", { static: false }) closeModel : ElementRef;
 public columnList :string[] = [ 'firstName', 'lastName', 'phoneNo', 'emailId'];
  userDetails: any;
  constructor(
    private excelService: ExcelService,
    public unleashService: UnleashService,
    private auth: AuthService,
    private toast: ToastrService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    // private location: Location,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.topicId = params.topicId;
    //  });
    let details = JSON.parse(localStorage.getItem('newUserLoggedinDetails'));
    this.userDetails = details.loggedInType;
    this.editedData = [];
    this.loggedIn = true;
    this.letsGetStartedFlow = true;
    this.unleashService.postLogin(true);
    this.unleashService.getStartedFlow(true);
    this.unleashService.changeTheme('light');
    let className = localStorage.getItem('className');
    if(className === 'true') {
      this.buildRoster('googleclassroom');
    }
    else {
      this.buildRosterPage = true;
    }
  }

  selectClass() {
    this.beforeSelectClass = false;
    this.afterSelectClass = true;
  }

  classNameSelected(item) {
    this.loading = true;
    this.loader.emit(this.loading);
    this.selectedClassName = item;
    this.auth.getStudentList(this.selectedClassName.id).subscribe(
      data => {
        if (data.students) {
        const students = data.students;
        if(students.length <= environment.MAX_STUDENTS) {
          const obj = {};
          for (let i = 0; i < students.length; i++) {
              if (!obj[students[i].profile.emailAddress]) {
                obj[students[i].profile.emailAddress] = {
                  firstName : students[i].profile.name.givenName,
                  lastName : students[i].profile.name.familyName,
                  emailId : students[i].profile.emailAddress
                };
              }
            }
          this.loading = false;
          this.loader.emit(this.loading);
          this.studentsList = Object.keys(obj).map(i => obj[i]);
           } else {
            this.loading = false;
            this.loader.emit(this.loading);
            this.toast.error('Students more than ' + environment.MAX_STUDENTS , 'error !'); 
         }
        } else {
          this.loading = false;
          this.loader.emit(this.loading);
          this.toast.error('No students', 'error !');
        }
      },
      error => {
        this.toast.error(error.error.message, 'error !');
      }
    );
  }

  copyLink(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.linkCopied = true;
    this.invitationallow = true;
  }
  buildRoster(type) {
    this.buildType = type;
    if (type === 'googlesheet') {
      this.buildRosterPage = false;
      this.googlePage = true;
      this.googleClassRoom = false;
      this.sendlink = false;
      const data = this.unleashService.getGradeDetails();
      this.classroom = data;
    }
    if (type === 'googleclassroom') {
      let token = JSON.parse(localStorage.getItem('googleUser'));
      if(token) {
      }
      else {
        localStorage.setItem('className', 'true');
        localStorage.setItem('rosterVia', 'Google');
      }
      this.loading = true;
      this.loader.emit(this.loading);
      this.buildRosterPage = false;
      this.googleClassRoom = false;
      this.googlePage = false;
      this.sendlink = false;
      localStorage.setItem('rosterVia', 'Google');
      this.auth.getGoogleClass().subscribe(
        data => {
            if (data.courses) {
              let result = data.courses;
              this.availClass = result.filter(classes => {
                return classes.teacherFolder;
              });
              this.loading = false;
              this.loader.emit(this.loading);
              this.className = true;
            } else {
              this.buildRosterPage = true;
              this.loading = false;
              this.loader.emit(this.loading);
              this.toast.error('No Courses created yet', 'error !');
            }
          },
        error => {
          this.buildRosterPage = true;
          this.loading = false;
          this.loader.emit(this.loading);
          this.toast.error(error.error.message, 'error !');
        }
      );
    }

    if (type === 'InvitationLink') {
      localStorage.setItem('rosterVia', 'invitationLink');
      this.sendlink = true;
      this.googleClassRoom = false;
      this.googlePage = false;
      this.buildRosterPage = false;
    }


    const rosterBuildType = {
      googleClassroom : this.googleClassRoom,
      excelSheet: this.googlePage,
      sendLink: this.sendlink
    };
  }

  generateLink() {
    this.linkToSend =  this.document.location.origin + '/' + this.topicId;
  }

  sendRoster(type) {
    let rosterObj = {};
    if (type === 'google') {
      const createdvia = localStorage.getItem('rosterVia');
      rosterObj = {
        classroomName : this.selectedClassName.name,
        createdVia: createdvia,
        topicDetails : {
          topicId : this.topicId,
          activityId : '123'
        },
        students : this.studentsList
      };
      this.unleashService.postRoster(rosterObj, this.topicId).subscribe(
        data => {
          if(data['is_success'] === true) {
            this.getReviewDetails = true;
            this.reviewDetails.emit(this.getReviewDetails);
          }
          else {
            this.toast.error(data['message'], "error !");
          }
        },
        error => {
          this.toast.error(error['error'].message, "error !");
        }
      );
    } else if (type === 'invitationLink') {
      this.getReviewDetails = true;
      this.reviewDetails.emit(this.getReviewDetails);
    }
  }
  rowClick(rowId) { //Excel Table Row Click function
    this.selectedRow = rowId;
  }

  uploadExcel(files) {  // Upload the Excel File
    this.fileToUpload = files.target.files[0];
    const file = files.target.files[0];
    if(file.type  == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      this.excelType =false;
    const fileuploadnew =  this.fileuploadnew.nativeElement.value;
      const schema = {
        'Student First Name': {
          prop: 'firstName',
          type: String,
          required: true,
          parse(value){
            const fName = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/;
            const fname =  fName.test(String(value).toLowerCase());
            if (!fname) {
              throw new Error('Enter only characters')
            }
            return value;
          }
        },
        'Student Last Name': {
          prop: 'lastName',
          type: String,
          required: true,
          parse(value){
            const lName = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/;
            const lname =  lName.test(String(value).toLowerCase());
            if (!lname) {
              throw new Error('Enter only characters')
            }
            return value;
          }
         },
        'Mobile Number': {
           prop: 'phoneNo',
           type: Number,
           required: true,
           parse(value) {
            const mobile = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
           // const mobile = /^([1]{0,1}|0)?[0-9]\d{9}$/;
            //  const mobile =/^(\+([1]))?([0-9][0-9]{9})$/;
            // const mobile =/^(\+(\d{1}))?([0-9][0-9]{9})$/; //match with country code "+anynumber"
             const number = mobile.test((value))
            if (!number) {
              throw new Error('Invalid Phone Number')
            }
            return value;
          }
          },
          'Email ID': {
             prop: 'emailId',
            type: String, 
            required: true,
            parse(value) {
              const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
              const email =  re.test(String(value).toLowerCase());
              if (!email) {
                throw new Error('Invalid Email-ID')
              }
              return value;
            }
            }
      }
      const results = []
       readXlsxFile(this.fileToUpload, {
         schema,
         transformData(data) {  // read the excel sheet from row 1
           for (let i = 1; i < data.length; i++) {
            const result = data[i]
            if (result) {
             results.push(result)
            }
          }
          return results;
          
            return  data.filter(row => row.filter(column => column !== null).length > 0)
         }  
      }).then(({ rows, errors }) => {
        this.fileuploadnew.nativeElement.value="";
          if(rows.length == 0 && errors.length == 0 ){
            setTimeout(() => {
              this.nextButton = false;
              this.excelfill = true;
              this.viewErrorButton = false;
              this.excelType = false;
              this.fileEmpty = 'Please fill the Excel file';
            }, 100);
        }
        this.tablepush = [...rows];
          let errorList=[];
          this.userList = errors;
          let lang_Arr;
      
          for(let i=0;i<errors.length;i++){
            if(!errorList.includes(errors[i].row) && !errorList.includes(lang_Arr)){
               lang_Arr = errors.map(function(o){
                var obj = {};
                obj[o.column] = o.value;
                obj['row'] = o.row; 
                return obj;
                
              })
              const replacements = {'Student First Name' : 'firstName', 'Student Last Name': 'lastName', 'Email ID': 'emailId', 'Mobile Number':'phoneNo'};
              lang_Arr = this.replaceKeyInObjectArray(lang_Arr , replacements);
            
                for (let i = 0 ; i < this.tablepush.length; i++) {
                for (let j = 0; j < lang_Arr.length; j++) {
                  if (i === lang_Arr[j].row - 1) {
                        this.tablepush[i] = Object.assign(this.tablepush[i] , lang_Arr[j]);
                  }
               }
              }
            }
          }
        
          this.finalArray = [];
          for(let k=0;k<this.tablepush.length;k++){
            if((this.tablepush[k].phoneNo == null && this.tablepush[k].emailId == null )  || (this.tablepush[k].firstName == null || this.tablepush[k].lastName==null)){
              this.tablepush[k]['isShow'] = true;
              this.viewErrorButton = true;
              this.nextButton =false;
            }
            else if((this.tablepush[k].phoneNo != null && this.tablepush[k].emailId != null)|| (this.tablepush[k].firstName != null || this.tablepush[k].lastName !=null)){
             // const mobile =/^([1]{0,1}|0)?[0-9]\d{9}$/;
             const mobile = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
               const number = mobile.test((this.tablepush[k].phoneNo))
               if(!number){
                this.tablepush[k]['isShow'] = true;
               this.viewErrorButton = true;
               this.nextButton =false;
              }
              else{
                this.excelfill = false;
               this.viewErrorButton = false;
               this.nextButton = true;
              }
               const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
               const email =  re.test(String(this.tablepush[k].emailId).toLowerCase());
               if(!email){
                this.tablepush[k]['isShow'] = true;
               this.viewErrorButton = true;
               this.nextButton = false;
               }
               else{
                this.excelfill = false;
                this.viewErrorButton = false;
                this.nextButton = true;
               }
               const fName = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/;
               const fname =  fName.test(String(this.tablepush[k].firstName).toLowerCase());
               if (!fname) {
                 this.tablepush[k]['isShow'] = true;
                 this.viewErrorButton = true;
                 this.nextButton = false;
               }
               else{
                this.excelfill = false;
                this.tablepush[k]['isShow'] = false;
                this.viewErrorButton = false;
                this.nextButton = true;
               }
               const lName = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/;
               const lname =  lName.test(String(this.tablepush[k].lastName).toLowerCase());
               if (!lname) {
                 this.tablepush[k]['isShow'] = true;
                this.viewErrorButton = true;
                this.nextButton =false;
               }
               else{
                this.excelfill = false;
                this.tablepush[k]['isShow'] = false;
                this.viewErrorButton = false;
                this.nextButton = true;
               }
            }
            else if((this.tablepush[k].phoneNo != null && this.tablepush[k].emailId == null)|| (this.tablepush[k].firstName != null || this.tablepush[k].lastName==null)){
             // const mobile =/^([1]{0,1}|0)?[0-9]\d{9}$/;
              const mobile = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
              const number = mobile.test((this.tablepush[k].phoneNo))  
              if(!number){
               this.tablepush[k]['isShow'] = true;
               this.viewErrorButton = true;
               this.nextButton =false;
              }
              else{
                this.excelfill = false;
                this.viewErrorButton = false;
                this.nextButton = true;

              }
              const fName = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/;
              const fname =  fName.test(String(this.tablepush[k].firstName).toLowerCase());
              if (!fname) {
                this.tablepush[k]['isShow'] = true;
               this.viewErrorButton = true;
               this.nextButton = false;
              }
              else{
                this.excelfill = false;
                this.tablepush[k]['isShow'] = false;
                this.viewErrorButton = false;
                this.nextButton = true;
               }
            }
            else if((this.tablepush[k].phoneNo == null && this.tablepush[k].emailId != null)|| (this.tablepush[k].firstName == null || this.tablepush[k].lastName != null)){
                const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
                const email =  re.test(String(this.tablepush[k].emailId).toLowerCase());
                if(!email){
                  this.tablepush[k]['isShow'] = true;
                  this.viewErrorButton = true;
                  this.nextButton = false;
                  }
                  else{
                    this.viewErrorButton = false;
                    this.nextButton = true;
                    this.excelfill = false;
                }
                const lName = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/;
                const lname =  lName.test(String(this.tablepush[k].lastName).toLowerCase());
                if (!lname) {
                  this.tablepush[k]['isShow'] = true;
                  this.viewErrorButton = true;
                  this.nextButton = false;
                }
                else{
                  this.viewErrorButton = false;
                  this.nextButton = true;
                  this.tablepush[k]['isShow'] = false;
                  this.excelfill = false;
                }
            }
            else{
              this.tablepush[k]['isShow'] = false;
              this.viewErrorButton = false;
              this.nextButton = true;
              this.excelfill = false;
              
            }
             this.finalArray.push(this.tablepush[k]);
          }
          this.userListMatTabDataSource.data = this.finalArray.filter((data) => data.isShow === true);
      }
      )
     }
    else{
      this.excelType = true;
      this.excelfileType = 'Please uplod the .xlsx file';
      this.nextButton = false;
      this.excelfill = false;
      this.viewErrorButton = false;
    }
  }

  replaceKeyInObjectArray(arr, replaceArra) {
    const replaceKeyInObjectArray  = arr.map(o =>
      Object.keys(o).map((key) => ({ [replaceArra[key] || key] : o[key] })
    ).reduce((a, b) => Object.assign({}, a, b)));
    return replaceKeyInObjectArray;
  }

  edited(user) { //Excel table row edit function
    user.edited = true;
    this.editedData.push(user);
  }

  save():any{ // Excel table Submit button
    this.tablepush = this.userListMatTabDataSource.data;
    for (let i = 0; i < this.finalArray.length;i++){
       delete this.finalArray[i]['isShow'];
    };
    this.closeModel.nativeElement.click();
    this.viewErrorButton = false;
    this.nextButton =true;
  }

  exportAsXLSX(): void { // Download the Excel Sample file
    var Heading = [
      ["Please enter your students information.  We will send them the activities through either email or text, so you only need to enter their email or mobile number.  (Mobile Number or Email ID)"],
      ["Student First Name", "Student Last Name", "Mobile Number", "Email ID"]
    ];
    var Data = [
      {sname:"", slname:'', mobile :'', email:''},
    ];
    var ws = XLSX.utils.aoa_to_sheet(Heading);
    XLSX.utils.sheet_add_json(ws, Data, {
     header:["sname", "slname" , "mobile", "email"], 
      skipHeader:true,
      origin:-1
     });
    
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS", );
  //  let bold = ws.add_format({'bold': 'True'})
    var wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'}, );
    FileSaver.saveAs(new Blob([wbout],{type:"application/octet-stream"}), "Unleash_Sheet.xlsx");
    //  this.excelService.exportAsExcelFile(this.data, 'Unleash Google Sheet');
  }

  onFileSelected(event: EventEmitter<File[]>) {
    this.fileName = event[0].name;
  }

  // ngOnDestroy() {
  //   this.unleashService.postLogin(false);
  //   this.unleashService.getStartedFlow(false);
  // }

  getAllDetails() {
       const studentExcelData = [];
       this.finalArray.map((elem) => {
         studentExcelData.push(elem);
       })
       const excelPayload = {
          "createdVia": "Excel",
          "topicDetails": {
              "topicId": this.topicId,
              "activityId": "123"
          },
          students : studentExcelData
       }
       this.loading = true;
       this.unleashService.postRoster(excelPayload, this.topicId).subscribe(response =>{
          this.loading = false;
           this.getReviewDetails = true;
          this.reviewDetails.emit(this.getReviewDetails);
          if(response.is_success == true){   
          this.toast.success(response.message, 'success !');
        }
       }, err=>{
          this.loading = false;
          this.toast.error(err.error.message, 'error !');
       })
  }
}
