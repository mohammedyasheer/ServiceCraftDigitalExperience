import { LightningElement } from 'lwc';
import CaseCreateModel from 'c/scCreateCasemodel'
import getMyCases from '@salesforce/apex/SCCaseController.getMyCases'

export default class ScCaseMainScreen extends LightningElement {
    cases =[];
    showSpinner = false

    connectedCallback() {
       this.getCases()
    }
    
    getCases() {
        this.showSpinner = true
         getMyCases()
        .then(result => {
            console.log(result)
            if(result){
                this.cases = result
            }
        })
        .catch(error => {
            console.log(error)
        }) 
    }

    async handleClick(){
        let action  = event.target.name
        if(action == "newcase") {
            const casemodelresult = await CaseCreateModel.open({
                size: 'medium'
            })
        }
    }

    handleEvent(event) {
        let spinner = event.detail.spinner
        let refreshCases = event.detail.refreshCases

        this.showSpinner = spinner
        if(refreshCases) {
            this.getCases()
        }


    }
}