import { SearchItemDirect, SearchItemPublic } from "./types";

export const ES_INDEX_PUBLIC = "licitatii-publice";
export const ES_INDEX_DIRECT = "achizitii-directe";

export type Fields = Record<string, (string | number)[]>;

export const RESULTS_PER_PAGE = 20;

export function transformItem(index: string, fields: Fields, highlight: Fields) {
  switch (index) {
    case ES_INDEX_DIRECT:
      return {
        date: fields["item.publicationDate"]?.[0],
        name: fields["item.directAcquisitionName"]?.[0],
        code: fields["item.uniqueIdentificationCode"]?.[0],
        cpvCode: highlight?.["item.cpvCode"]?.[0] ?? fields["item.cpvCode"]?.[0],
        cpvCodeId: fields["publicDirectAcquisition.cpvCode.id"]?.[0],
        value: fields["item.closingValue"]?.[0] || 0,
        supplierId: fields["publicDirectAcquisition.supplierId"]?.[0],
        supplierName: fields["item.supplier"]?.[0],
        localitySupplier: fields["supplier.city"]?.[0],
        contractingAuthorityId: fields["publicDirectAcquisition.contractingAuthorityID"]?.[0],
        contractingAuthorityName: fields["item.contractingAuthority"]?.[0],
        localityAuthority: fields["authority.city"]?.[0],
        state: fields["item.sysDirectAcquisitionState.text"]?.[0],
        stateId: fields["item.sysDirectAcquisitionState.id"]?.[0],
        type: fields["publicDirectAcquisition.sysAcquisitionContractType.text"]?.[0],
        typeId: fields["publicDirectAcquisition.sysAcquisitionContractType.id"]?.[0],
      } as SearchItemDirect;
    case ES_INDEX_PUBLIC:
      return {
        date: fields["item.noticeStateDate"]?.[0],
        name: fields["item.contractTitle"]?.[0],
        code: fields["item.noticeNo"]?.[0],
        cpvCode: highlight?.["item.cpvCodeAndName"]?.[0] ?? fields["item.cpvCodeAndName"]?.[0],
        cpvCodeId: fields["item.cpvCode"]?.[0],
        value: fields["noticeContracts.items.contractValue"]?.[0] || 0,
        supplierId: fields["noticeContracts.items.winner.entityId"]?.[0],
        supplierName: fields["noticeContracts.items.winner.name"]?.[0],
        supplierFiscalNumber: fields["noticeContracts.items.winner.fiscalNumber"]?.[0],
        localitySupplier: fields["noticeContracts.items.winner.address.city"]?.[0],
        contractingAuthorityId: fields["publicNotice.entityId"]?.[0],
        contractingAuthorityName: fields["item.contractingAuthorityNameAndFN"]?.[0],
        localityAuthority:
          fields["publicNotice.caNoticeEdit_New.section1_New.section1_1.caAddress.city"]?.[0],
        state: fields["item.sysProcedureState.text"]?.[0],
        stateId: fields["item.sysProcedureState.id"]?.[0],
        type: fields["item.sysAcquisitionContractType.text"]?.[0],
        typeId: fields["item.sysAcquisitionContractType.id"]?.[0],
        procedureType: fields["item.sysProcedureType.text"]?.[0],
        procedureTypeId: fields["item.sysProcedureType.id"]?.[0],
        assigmentType: fields["item.sysContractAssigmentType.text"]?.[0],
        assigmentTypeId: fields["item.sysContractAssigmentType.id"]?.[0],
      } as SearchItemPublic;
    default:
      return undefined;
  }
}

export const fieldsAchizitii = [
  "item.directAcquisitionId",
  "item.directAcquisitionName",
  "item.sysDirectAcquisitionState.text",
  "item.sysDirectAcquisitionState.id",
  "item.uniqueIdentificationCode",
  "item.cpvCode",
  "item.publicationDate",
  "item.closingValue",
  "item.supplier",
  "item.contractingAuthority",
  "publicDirectAcquisition.cpvCode.*",
  "publicDirectAcquisition.supplierId",
  "publicDirectAcquisition.contractingAuthorityID",
  "publicDirectAcquisition.sysAcquisitionContractType.*",
  "publicDirectAcquisition.sysAcquisitionContractTypeID",
  "authority.city",
  "supplier.city",
] as const;

export const filedsLicitatii = [
  "item.caNoticeId",
  "item.noticeNo",
  "item.contractingAuthorityNameAndFN",
  "item.contractTitle",
  "item.sysAcquisitionContractType.*",
  "item.sysProcedureType.*",
  "item.sysContractAssigmentType.*",
  "item.sysNoticeState.*",
  "item.sysProcedureState.*",
  "item.cpvCodeAndName",
  "item.noticeStateDate",
  "publicNotice.entityId",
  "publicNotice.caNoticeEdit_New.section1_New.section1_1.caAddress.city",
  "noticeContracts.items.winner.name",
  "noticeContracts.items.winner.fiscalNumber",
  "noticeContracts.items.winner.fiscalNumberInt",
  "noticeContracts.items.winner.entityId",
  "noticeContracts.items.winner.address.city",
  "noticeContracts.items.contractValue",
] as const;
