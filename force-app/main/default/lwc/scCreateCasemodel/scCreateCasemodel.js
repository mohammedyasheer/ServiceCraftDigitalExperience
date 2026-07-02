import { LightningElement, wire, api } from 'lwc';
import LightningModal from 'lightning/modal'
import { getObjectInfo } from 'lightning/uiObjectInfoApi'

export default class ScCreateCasemodel extends LightningModal {
    @api objApiName = 'Case'
    @api recordTypeName = 'Support'
    recordTypeId


    @wire(getObjectInfo, {objectApiName: '$objApiName'})
    objInfo({data, error}){
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
}