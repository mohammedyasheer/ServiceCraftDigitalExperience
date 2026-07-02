import { LightningElement, wire, api } from 'lwc';
import LightningModal from 'lightning/modal'
import { getObjectInfo } from 'lightning/uiObjectInfoApi'
import createCase from '@salesforce/apex/SCCaseController.createCase'
import Toast from 'lightning/toast';
import ToastContainer from 'lightning/toastContainer'

export default class ScCreateCasemodel extends LightningModal {
    @api objApiName = 'Case'
    @api recordTypeName = 'Support'
    recordTypeId
    showSpinner = true


    connectedCallback() {
        const toast = ToastContainer.instance();
        toast.maxToasts = 5;
        toast.toastPosition = 'top-center';

        
    }
    
        @wire(getObjectInfo, {objectApiName: '$objApiName'})
    objInfo({data, error}){
        this.showSpinner = false
        if(data) {
            const recordTypes = data.recordTypeInfos
            const recordTypeInfo = Object.values(recordTypes).find(rt => rt.name === this.recordTypeName)
            if(recordTypeInfo){
                this.recordTypeId = recordTypeInfo.recordTypeId
                console.log(this.recordTypeId)
            }
        }   
        else if(error) {
            console.log('Error', error)
        }
    }



    handleSubmit(event) {
        event.preventDefault()
        const fields = event.detail.fields
        createCase({caseRecord: fields})
        .then(result => {
            if(result){
                Toast.show({
                    label: 'Case created',
                    message: 'Case Id '+ result,
                    variant: 'success',
                    mode: 'dismissible'
                }, this)
                this.close('okay')
                console.log(result)
            }else{
                Toast.show({
                    label: 'Erro',
                    message: result,
                    variant: 'error',
                    mode: 'dismissible'
                })
            }
        }).catch(error => {
            console.log(error);
            Toast.show({
                label: 'Error in creation',
                message: 'Error in case creation',
                varient: 'error',
                mode: 'dismissible'
            })
        })
    }
}