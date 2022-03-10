export class RequestObject {
  data: DataModel;
  globalInfo: GlobalInfoModel;
  returnStateInfo: ReturnStateInfoModel;
}

export interface ResponseObject {
  data: DataModel;
  globalInfo: GlobalInfoModel;
  returnStateInfo: ReturnStateInfoModel;
}

class DataModel {
  content?: string;
  signature: string;
  dataDescription: DataDescriptionModel;
}

class DataDescriptionModel {
  codeType: number;
  encryptCode: number;
  zipCode: number;
}

class GlobalInfoModel {
  appId: string;
  version: string;
  dataExchangeId: string;
  interfaceCode: string;
  tin: string;
  requestCode: string;
  requestTime: string;
  responseCode: string;
  userName: string;
  deviceMAC: string;
  deviceNo: string;
  taxpayerID: string;
  longitude: string;
  latitude: string;

  responseDateFormat: string;
  responseTimeFormat: string;
  referenceNo: string;
}
class ReturnStateInfoModel {
  returnCode: string;
  returnMessage: string;
}
