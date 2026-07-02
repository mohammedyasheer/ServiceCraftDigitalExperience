import { LightningElement } from 'lwc';
import CaseCreateModel from 'c/scCreateCasemodel'

export default class ScCaseMainScreen extends LightningElement {

    async handleClick(){
        let action  = event.target.name
        if(action == "newcase") {
            const casemodelresult = await CaseCreateModel.open({
                size: 'medium'
            })
        }
    }
}