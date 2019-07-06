import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import {AbtcrudService } from './service/abtcrud'
import { abtcrudModel } from './model/abtcrudModel';

@Component({
    selector:'app-abtCrud',
    templateUrl:'./abtcrud.component.html',
    styleUrls:['./abtcrud.component.css'],
    providers:[AbtcrudService]
})
export class AboutCrudComponent implements OnInit{
    private titleArr=[];
    private datacame=false;
    private paragraphArr=[];
    private listsArr=[];
    private subtitleArr=[];
    private subtitleParaArr=[];
    private initialAbtData;
    private abtForm:FormGroup;
    constructor(private fb:FormBuilder,private abtcrudService:AbtcrudService) { 
    }
    ngOnInit() {
        this.initialData();
      
    }
    initialData() {
        //get all the data
        this.abtcrudService.Aboutjsonretrieve().subscribe(data=>{
            if(data){
            console.log(data);
            this.initialAbtData=data.data;
            console.log(this.initialAbtData.aboutTitle.titleName);
            this.fillinitialData();
            }
            else{
                this.firstTimeFill();
            }
            this.datacame=true;
        })
    }
    fillinitialData(){
        this.titleArr.push(this.createTitleName(this.initialAbtData.aboutTitle.titleName));
        for(let str of this.initialAbtData.aboutTitle.titleParagraph[0].paragraph){
            this.paragraphArr.push(this.createParagraph(str));
        }
        for(let str of this.initialAbtData.aboutTitle.titleParagraph[0].lists){
            this.listsArr.push(this.createList(str));
        }
        
        for(let subObject of this.initialAbtData.aboutSubTitle){
            this.subtitleArr.push(this.createsubTitleName(subObject.subTitleName));
            this.subtitleParaArr.push(this.createsubParagraph(subObject.subTitleParagraphs[0]));
        }
          this.createForm();
    }

    firstTimeFill(){
        this.titleArr.push(this.createTitleName(''));
        this.paragraphArr.push(this.createParagraph(''));
        this.listsArr.push(this.createList(''));
        this.subtitleArr.push(this.createsubTitleName(''));
        this.subtitleParaArr.push(this.createsubParagraph(''));





    }

    createForm(){
        this.abtForm = this.fb.group({
            titleName:this.fb.array(this.titleArr),
            titleParagraph:this.fb.group({
                paragraph:this.fb.array(this.paragraphArr),
                lists:this.fb.array(this.listsArr)
            }),
            aboutSubTitle:this.fb.group({
                subTitleName:this.fb.array(this.subtitleArr),
                subTitleParagraphs:this.fb.array(this.subtitleParaArr)
            })
        })
    }

    addTitleName(){
        this.titleArr.push(this.createTitleName(''));
        this.createForm();
    }
    deleteTitleName(index){
        this.titleArr.splice(index,1);
        this.createForm();
    }
    createTitleName(title:string){
        if(title){
            return this.fb.control(title,[Validators.required]);
        }
        else{
            return this.fb.control('',[Validators.required]);
        }
    }
    addTitlePara(){
        this.paragraphArr.push(this.createParagraph(''));
        this.createForm();
    }
    deleteParagraph(index){
        this.paragraphArr.splice(index,1);
        this.createForm();
    }
    createParagraph(paragraph:string){
        if(paragraph){
            return this.fb.control(paragraph,[Validators.required]);
        }
        else{
            return this.fb.control('',[Validators.required]);
        }
    }
    addsubTitleName(){
        this.subtitleArr.push(this.createTitleName(''));
        this.createForm();
    }
    deletesubTitleName(index){
        this.subtitleArr.splice(index,1);
        this.createForm();
    }
    createsubTitleName(subtitle:string){
        if(subtitle){
            return this.fb.control(subtitle,[Validators.required]);
        }
        else{
            return this.fb.control('',[Validators.required]);
        }
    }
    addTitleList(){
        this.listsArr.push(this.createParagraph(''));
        this.createForm();
    }
    deleteList(index){
        this.listsArr.splice(index,1);
        this.createForm();
    }
    createList(list:string){
        if(list){
            return this.fb.control(list,[Validators.required]);
        }
        else{
            return this.fb.control('',[Validators.required]);
        }
    }
    addsubTitlePara(){
        this.subtitleParaArr.push(this.createParagraph(''));
        this.createForm();
    }
    deletesubParagraph(index){
        this.subtitleParaArr.splice(index,1);
        this.createForm();
    }
    createsubParagraph(subparagraph:string){
        if(subparagraph){
            return this.fb.control(subparagraph,[Validators.required]);
        }
        else{
            return this.fb.control('',[Validators.required]);
        }
    }

    onsubmit(form:NgForm){
        console.log(form);
        this.abtcrudService.uploadForm(form).subscribe(data=>{
            if(data){
                alert('success');
              }
          
            },err=>{
              alert(err);
            })
    }
}