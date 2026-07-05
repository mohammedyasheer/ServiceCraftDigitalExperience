import { LightningElement, api } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Case.Id'
import STATUS_FIELD from '@salesforce/schema/Case.Status'
import IS_ESCALATED from '@salesforce/schema/Case.IsEscalated'
import ToastContainer from 'lightning/toastContainer';
import Toast from 'lightning/toast';

export default class ScDisplayCase extends LightningElement {
    @api cases

      connectedCallback() {
        const toastContainer = ToastContainer.instance();
        toastContainer.maxToasts = 5;
        toastContainer.toastPosition = 'top-center';
    }

    async handleClick(event) {
        console.log('clicked')
        let action  = event.target.name
        const caseRec = event.target.value
        console.log(action)

            if(action == 'escalate'){
                this.handleEscalate(caseRec)
            }
    }

     handleReopen(caseRec) {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = caseRec.Id;
        fields[STATUS_FIELD.fieldApiName] = 'New';
        this.updateCaseStatus(fields);
    }

    handleEscalate(caseRec) {
        console.log('handleescalted method triggered')
        const fields= {}
        fields[ID_FIELD.fieldApiName] = caseRec.Id
        fields[STATUS_FIELD.fieldApiName] = 'Escalated'
        fields[IS_ESCALATED.fieldApiName] = true
        this.updateCaseStatus(fields)
    }

    updateCaseStatus(fields) {
          //this.raiseEvent(true, false);
        const recordInput = {
            fields: fields
        };
        updateRecord(recordInput).then(() => {
            Toast.show({
                label: 'Case Updated',
                message: 'Case Updated Successfully!',
                variant: 'success',
                mode: 'dismissible'
            }, this);
            this.raiseEvent(false, true);
        }).catch(error => {
            Toast.show({
                label: 'Error',
                message: 'Error Occurred',
                variant: 'error',
                mode: 'dismissible'
            }, this);
            this.raiseEvent(false, false);
        });

    }

    rasieEvent(spinner, refreshCases) {
        const details ={
            spinner: spinner,
            refreshCases: refreshCases
        }
        const customEvent = new customEvent('sccaseevent', {details})
        this.dispatchEvent(customEvent);
    }
}