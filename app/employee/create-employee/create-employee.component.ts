import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service'; 


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  isShown: boolean = false;
  isBtnVisibility: boolean = true;
  employeeForm: FormGroup;
  BonblocForm: FormGroup;
  MclaneForm: FormGroup;
  show: boolean = false;
  isBonbloc:boolean
  isMclane:boolean
  BonblocType:FormArray;
  MclaneType:FormArray;
  Mclanearray:any=[];
  bonblocarray:any=[];
  MclaneList:any;
  getBonblocList:any;
  skillsList: any = [{id:1, Name: "Blockchain"},{id:2, Name: "Oracle"},{id:3, Name: "Mainframe/Manhattan"}]
  statusList: any =[{id:1, Name: "Open"},{id:2, Name: "In Progress"},{id:3, Name: "Completed"},{id:4, Name: "Closed"}]
  constructor(private formBuilder: FormBuilder, private router: Router,private readonly service: ServiceService) { 
    // Serv
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      Name: ["", Validators.required],
      EmployeeId: ["", Validators.required],
      Date: ["", Validators.required],
    });
    this.BonblocForm = this.formBuilder.group({
      BonblocType: this.formBuilder.array([this.BonblocItem()])
    })
    this.MclaneForm = this.formBuilder.group({
       MclaneType:this.formBuilder.array([this.MclaneItem()]),
    })
  }

  get f() { return this.employeeForm.controls; }

  // get prjcttype() {
  //   return this.employeeForm.get('prjcttype');
  // }
  
  getBonblocControls() {
    return ( this.BonblocForm.get('BonblocType') as FormArray).controls;
  }
  getMclaneControls(){
    return ( this.MclaneForm.get('MclaneType') as FormArray).controls;
  }
  
  deleteRows(index: number) {
    if(this.MclaneType.length ==1) {
      alert("Can't delete the row when there is only one row")
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');
        return false;
    } else {
      console.log(index)
      this.MclaneType.removeAt(index);
      alert('Row deleted successfully')
      // this.toastr.warning('Row deleted successfully', 'Delete row');
        // return true;
    }
}
  deleteRow(index: number) {
    if(this.BonblocType.length ==1) {
      alert("Can't delete the row when there is only one row")
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');
        return false;
    } else {
      console.log(index)
      this.BonblocType.removeAt(index);
      alert('Row deleted successfully')
      // this.toastr.warning('Row deleted successfully', 'Delete row');
        // return true;
    }
}
// getting Bonbloc Details
getBonbloc(id): void {
  this.service.getBonblocDtl(id).subscribe((res) => {
    this.getBonblocList = res.data;
    console.log(this.getBonblocList)
  });
}


// getting Maclane Data
getMclane(id):void{
  this.service.getMclaneDtl(id).subscribe((res) => {
    this.MclaneList = res.data;
  });
}


  showModal(){
    this.show = !this.show;
  }
  
  public onSave() {
    this.closebutton.nativeElement.click();
  }
  BonblocItem(): FormGroup {
    return this.formBuilder.group({
      prjctCode: ["", Validators.required],
      prjctName: ["", Validators.required],
      prjctTask: ["", Validators.required],
      prjctHrs: ["", Validators.required],
      prjctDesc: ["", Validators.required]
    });
  }
  addBonblocItem(): void {
    // (<FormArray>this.employeeForm.get('BonblocType')).push(this.BonblocItem());
     this.BonblocType = this.BonblocForm.get('BonblocType') as FormArray;
    this.BonblocType.push(this.BonblocItem());
  }


  MclaneItem(): FormGroup {
    return this.formBuilder.group({
      Key: ["", Validators.required],
      Skill: ["", Validators.required],
      Status: ["", Validators.required],
      DueDate: ["", [Validators.required]],
      Time: ["", Validators.required],
      Comment: ["", Validators.required]
    });
  }
  AddMclaneItem(): void {
    console.log("hello world")
    // (<FormArray>this.employeeForm.get('MclaneType')).push(this.MclaneItem());
    this.MclaneType = this.MclaneForm.get('MclaneType') as FormArray;
    this.MclaneType.push(this.MclaneItem());
  }
  
   onSubmit() {
     for(var i=0;i<this.MclaneForm.value.MclaneType.length;i++){
       if(this.MclaneForm.value.MclaneType.length=='1'){
         if(this.MclaneForm.value.MclaneType[i].Comment=='' && this.MclaneForm.value.MclaneType[i].DueDate==''&&this.MclaneForm.value.MclaneType[i].Key==''&&this.MclaneForm.value.MclaneType[i].Skill==''&&this.MclaneForm.value.MclaneType[i].Status==''&&this.MclaneForm.value.MclaneType[i].Time==''){
          this.Mclanearray=[];    
           }else{
             this.Mclanearray.push({
              "key":this.MclaneForm.value.MclaneType[i].Key,
              "Skill":this.MclaneForm.value.MclaneType[i].Skill,
              "Status":this.MclaneForm.value.MclaneType[i].Status,
              "DueDate":this.MclaneForm.value.MclaneType[i].DueDate,
              "Time":this.MclaneForm.value.MclaneType[i].Time,
              "Comment":this.MclaneForm.value.MclaneType[i].Comment
             })
           }
            // if()
       }else{
        this.Mclanearray.push({
          "key":this.MclaneForm.value.MclaneType[i].Key,
          "Skill":this.MclaneForm.value.MclaneType[i].Skill,
          "Status":this.MclaneForm.value.MclaneType[i].Status,
          "DueDate":this.MclaneForm.value.MclaneType[i].DueDate,
          "Time":this.MclaneForm.value.MclaneType[i].Time,
          "Comment":this.MclaneForm.value.MclaneType[i].Comment
         })
       }
     }
     for(var i=0;i<this.BonblocForm.value.BonblocType.length;i++){
      if(this.BonblocForm.value.BonblocType.length=='1'){
        if(this.BonblocForm.value.BonblocType[i].prjctCode=='' && this.BonblocForm.value.BonblocType[i].prjctName==''&&this.BonblocForm.value.BonblocType[i].prjctTask==''&&this.BonblocForm.value.BonblocType[i].prjctHrs==''&&this.BonblocForm.value.BonblocType[i].prjctDesc==''){
         this.bonblocarray=[];    
          }else{
            this.bonblocarray.push({
         "prjctCode":this.BonblocForm.value.BonblocType[i].prjctCode,
         "prjctName":this.BonblocForm.value.BonblocType[i].prjctName,
         "prjctTask":this.BonblocForm.value.BonblocType[i].prjctTask,
         "prjctHrs":this.BonblocForm.value.BonblocType[i].prjctHrs,
         "prjctDesc":this.BonblocForm.value.BonblocType[i].prjctDesc,
            })
          }
           
      }else{
       this.bonblocarray.push({
         "prjctCode":this.BonblocForm.value.BonblocType[i].prjctCode,
         "prjctName":this.BonblocForm.value.BonblocType[i].prjctName,
         "prjctTask":this.BonblocForm.value.BonblocType[i].prjctTask,
         "prjctHrs":this.BonblocForm.value.BonblocType[i].prjctHrs,
         "prjctDesc":this.BonblocForm.value.BonblocType[i].prjctDesc,
        })
      }
    }

     const data ={
       Name: this.employeeForm.value.Name,
       EmployeeId: this.employeeForm.value.EmployeeId,
       Date: this.employeeForm.value.Date,
       BonblocType: this.bonblocarray,
       MclaneType:  this.Mclanearray
     }
     console.log(data);
     this.service.addCreateEmployee(data).subscribe((res) => {
      if (res.status == 200) {

       
        this.getBonbloc(data.EmployeeId);
        this.getMclane(data.EmployeeId)
        alert("successfully submited");
        this.employeeForm.reset();
        this.Mclanearray=[];
        this.bonblocarray=[];
        this.MclaneForm.reset();
        this.BonblocForm.reset();

       this.isBonbloc=true;
       this.isMclane=true;


        // this.toastr.success("Submitted Successfully");
      }
        });
    // }
     
  }

}
