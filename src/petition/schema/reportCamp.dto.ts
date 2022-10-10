export enum ReportEnum {
  Deceptive = 'Deceptive and fraudulent',
  Breaches = 'Breaches human rights',
  Guilty = 'Guilty of hate speech',
  Obscene = 'Obscene image',
  Harmful = 'Harmful to children',
  Incites = 'Incites violence, sucide or harm',
  Encourages = 'Encourages racism',
  Impersonation = 'Impersonation'
}

export class reportDTO {
  petitonSlug: string;
  reportType: ReportEnum;
  reportCampMessage: string;
}

export interface IreportDTO {
  petitonSlug: string;
  reportType: ReportEnum;
  reportCampMessage: string;
}